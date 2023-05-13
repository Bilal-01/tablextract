# Import required libraries
from PIL import Image
import io
import string
from collections import Counter 
from itertools import tee, count
import pytesseract
from pytesseract import Output
import pandas as pd
import cv2
import numpy as np
from transformers import TableTransformerForObjectDetection
from transformers import DetrFeatureExtractor
import torch
import asyncio
from ultralytics import YOLO

# Set the path for Tesseract OCR command-line tool
pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'

# Load pre-trained model for table structure recognition
tableStructureModel = TableTransformerForObjectDetection.from_pretrained("microsoft/table-transformer-structure-recognition")

# Define helper functions to convert between PIL and OpenCV image formats
def PIL_to_cv(pil_img):
    return cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR) 

def cv_to_PIL(cv_img):
    return Image.fromarray(cv2.cvtColor(cv_img, cv2.COLOR_BGR2RGB))

# Define an asynchronous function to perform OCR using Tesseract OCR engine
async def pytess(cell_pil_img):
    return ' '.join(pytesseract.image_to_data(cell_pil_img, output_type=Output.DICT, config='-c tessedit_char_blacklist=œ˜â€œï¬â™Ã©œ¢!|”?«“¥ --psm 6 preserve_interword_spaces')['text']).strip()

# Define a function to add unique suffixes to repeated elements in a list
def uniquify(seq, suffs = count(1)):
    not_unique = [k for k,v in Counter(seq).items() if v>1] 

    suff_gens = dict(zip(not_unique, tee(suffs, len(not_unique))))  
    for idx,s in enumerate(seq):
        try:
            suffix = str(next(suff_gens[s]))
        except KeyError:
            continue
        else:
            seq[idx] += suffix

    return seq

def detect_and_crop_tables(image, THRESHOLD_PROBA):
    model = YOLO('services/YOLO_model/best.pt')
    results = model(image)
    cropped_img_list = []
    for box in results[0].boxes:
        if box.conf > THRESHOLD_PROBA:
            cropped_img = image.crop(*box.xyxy.numpy())
            cropped_img_list.append(cropped_img)
    return cropped_img_list
    
def table_struct_recog(image, THRESHOLD_PROBA):

    feature_extractor = DetrFeatureExtractor(do_resize=True, size=1000, max_size=1000)
    encoding = feature_extractor(image, return_tensors="pt")
    
    with torch.no_grad():
        outputs = tableStructureModel(**encoding)

    probas = outputs.logits.softmax(-1)[0, :, :-1]
    keep = probas.max(-1).values > THRESHOLD_PROBA

    target_sizes = torch.tensor(image.size[::-1]).unsqueeze(0)
    postprocessed_outputs = feature_extractor.post_process(outputs, target_sizes)
    bboxes_scaled = postprocessed_outputs[0]['boxes'][keep]

    return (tableStructureModel, probas[keep], bboxes_scaled)

class TableExtractionPipeline():

    def add_padding(self, pil_img, top, right, bottom, left, color=(255,255,255)):
        width, height = pil_img.size
        new_width = width + right + left
        new_height = height + top + bottom
        result = Image.new(pil_img.mode, (new_width, new_height), color)
        result.paste(pil_img, (left, top))
        return result

    def generate_structure(self, model, prob, boxes):
        rows = {}
        cols = {}
        idx = 0

        for p, (xmin, ymin, xmax, ymax) in zip(prob, boxes.tolist()): 
            cl = p.argmax()
            class_text = model.config.id2label[cl.item()]
            if (class_text == 'table row')  or (class_text =='table projected row header') or (class_text == 'table column'):
                pass
            if class_text == 'table row':
                rows['table row.'+str(idx)] = (xmin, ymin, xmax, ymax)
            if class_text == 'table column':
                cols['table column.'+str(idx)] = (xmin, ymin, xmax, ymax)
            idx += 1
        return rows, cols

    def sort_table_featuresv2(self, rows:dict, cols:dict):
        rows_ = {table_feature : (xmin, ymin, xmax, ymax) for table_feature, (xmin, ymin, xmax, ymax) in sorted(rows.items(), key=lambda tup: tup[1][1])}
        cols_ = {table_feature : (xmin, ymin, xmax, ymax) for table_feature, (xmin, ymin, xmax, ymax) in sorted(cols.items(), key=lambda tup: tup[1][0])}

        return rows_, cols_

    def individual_table_featuresv2(self, pil_img, rows:dict, cols:dict):

        for k, v in rows.items():
            xmin, ymin, xmax, ymax = v
            cropped_img = pil_img.crop((xmin, ymin, xmax, ymax))
            rows[k] = xmin, ymin, xmax, ymax, cropped_img

        for k, v in cols.items():
            xmin, ymin, xmax, ymax = v
            cropped_img = pil_img.crop((xmin, ymin, xmax, ymax))
            cols[k] = xmin, ymin, xmax, ymax, cropped_img

        return rows, cols


    def object_to_cellsv2(self, master_row:dict, cols:dict, padd_left):
        cells_img = {}
        row_idx = 0
        new_cols = {}
        new_master_row = {}
        new_cols = cols
        new_master_row = master_row
        for k_row, v_row in new_master_row.items():
            
            row_img = v_row[4]
            xmax, ymax = row_img.size
            xa, ya, xb, yb = 0, 0, 0, ymax
            row_img_list = []
            for idx, kv in enumerate(new_cols.items()):
                v_col = kv[1]
                xmin_col=v_col[0]
                xmax_col=v_col[2]
                xmin_col, xmax_col = xmin_col - padd_left - 10, xmax_col - padd_left
                xa = xmin_col
                xb = xmax_col
                if idx == 0:
                    xa = 0
                if idx == len(new_cols)-1:
                    xb = xmax
                xa, ya, xb, yb = xa, ya, xb, yb

                row_img_cropped = row_img.crop((xa, ya, xb, yb))
                row_img_list.append(row_img_cropped)

            cells_img[k_row+'.'+str(row_idx)] = row_img_list
            row_idx += 1

        return cells_img, len(new_cols), len(new_master_row)-1

    def clean_dataframe(self, df):
        for col in df.columns:
            df[col]=df[col].str.replace("'", '', regex=True)
            df[col]=df[col].str.replace('"', '', regex=True)
            df[col]=df[col].str.replace('\]', '', regex=True)
            df[col]=df[col].str.replace('\[', '', regex=True)
            df[col]=df[col].str.replace('\{', '', regex=True)
            df[col]=df[col].str.replace('\}', '', regex=True)
        return df

    def create_dataframe(self, i, cells_pytess_result:list, max_cols:int, max_rows:int):
        headers = cells_pytess_result[:max_cols]
        new_headers = uniquify(headers, (f' {x!s}' for x in string.ascii_lowercase))
        counter = 0

        cells_list = cells_pytess_result[max_cols:]
        df = pd.DataFrame("", index=range(0, max_rows), columns=new_headers)

        cell_idx = 0
        for nrows in range(max_rows):
            for ncols in range(max_cols):
                df.iat[nrows, ncols] = str(cells_list[cell_idx])
                cell_idx += 1

        for x, col in zip(string.ascii_lowercase, new_headers):
            if f' {x!s}' == col:
                counter += 1

        df = self.clean_dataframe(df)
        df.to_csv(f'static/ExtractedTable{i}.csv', index=False)


    async def start_process(self, image, TD_THRESHOLD, TSR_THRESHOLD, padd_top, padd_left, padd_bottom, padd_right):
        image = Image.open(io.BytesIO(image)).convert("RGB")
        cropped_img_list = detect_and_crop_tables(image=image, THRESHOLD_PROBA=TD_THRESHOLD)

        if len(cropped_img_list) == 0:
            # No table found in the image
            return 0

        for i, unpadded_table in enumerate(cropped_img_list):
            
            table = self.add_padding(unpadded_table, padd_top, padd_right, padd_bottom, padd_left)

            model, probas, bboxes_scaled = table_struct_recog(table, THRESHOLD_PROBA=TSR_THRESHOLD)
            rows, cols = self.generate_structure(model, probas, bboxes_scaled)

            rows, cols = self.sort_table_featuresv2(rows, cols)
            master_row, cols = self.individual_table_featuresv2(table, rows, cols)

            cells_img, max_cols, max_rows = self.object_to_cellsv2(master_row, cols, padd_left)

            sequential_cell_img_list = []
            for k, img_list in cells_img.items():
                for img in img_list:
                    sequential_cell_img_list.append(pytess(img))

            cells_pytess_result = await asyncio.gather(*sequential_cell_img_list)
            
            self.create_dataframe(i, cells_pytess_result, max_cols, max_rows)
        return len(cropped_img_list)

async def image_to_csv(image, table_detection_threshold, table_structure_recognition_threshold, padding_top, padding_left, padding_bottom, padding_right):
    te = TableExtractionPipeline()
    return await te.start_process(image, table_detection_threshold, table_structure_recognition_threshold, padding_top, padding_left, padding_bottom, padding_right)
    