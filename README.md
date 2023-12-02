# Tablextract

A cross-platform mobile app developed in React Native, to scan any invoice and convert it into a csv file! No more manual data entries required. Just one click and your entire invoice is converted into a proper structured csv file!

## Tech Stack
### Frontend
The frontend has been developed on React Native, to ensure that the app works seamlessly on all mobile platforms. We used Expo Go to test and build the website.

### Database
Firebase was used for this project as it is a very fast, reliable and secure hosting and database service developed and maintained by Google. 

### Backend
Backend was developed and deployed in Python using FastAPI. The asynchronous nature of Fast API provides a quick and reliable response time.

### Dataset
The dataset collected was an invoice dataset containing a range of different invoices, including printed and handwritten. We processed the images and normalized the coordinates. The final bounding boxes were converted into a Yolo v8 compaitable format.

### ML Models
#### 1. Yolo v8 Fine-tuned
We fine-tuned the state-of-the-art Yolov8 model for object detection. We fine-tuned it on our preprocessed dataset to detect and capture the invoice table from the entire picture. We acheived an accuracy of 90% after fine tuning.

### 2 Detection Transformer Model
After obtaining the bounding boxes, we cropped the image and passed the cropped image to Detection Transformer Model, provided by HuggingFace opensource models. The Detection Transformer model was optimized and tuned to match our requirements and input format. 

The Detection transformer model scans the cropped table and converts it an appropriate Pandas Dataframe. The Dataframe is then converted into a array of csv files stored on the server.

The server sends the URL of all the generated csv files to the client, which downloads the file on the Mobile storage.


