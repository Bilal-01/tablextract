from utils.auth import firebase_auth
from fastapi.staticfiles import StaticFiles
from services.tableextraction import image_to_csv
from fastapi import FastAPI, HTTPException, UploadFile, status, Depends
from fastapi.middleware.cors import CORSMiddleware
import os
import firebase_admin

# Use the service account keys(Got from firebase) to create a credentials.Certificate to connect to firebase
# Add your service account keys json file to the Backend folder to make it work, didn't add the file to the repo for obvious reasons
cred = firebase_admin.credentials.Certificate(
    'table_service_account_keys.json')
# Use those credentials to initialize the firebase_admin app which will verify the JWT
firebase_admin.initialize_app(cred)

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Background Task
def remove_file(path: str):
    os.remove(path)

@app.post("/extract", dependencies=[Depends(firebase_auth)])
async def extract_csv(file: UploadFile,
                      table_detection_threshold: float = 0.6,
                      table_structure_recognition_threshold: float = 0.8,
                      padding_top: int = 20,
                      padding_left: int = 20,
                      padding_right: int = 20,
                      padding_bottom: int = 20):
    if not (0.0 <= table_detection_threshold <= 1.0
            and 0.1 <= table_structure_recognition_threshold <= 1.0):
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=
            "Table_detection_threshold must be a float in the range 0 to 1.0 inclusive. Table_structure_recognition_threshold must be a float in the range 0.1 to 1.0 inclusive"
        )
    if not (0 <= padding_top <= 200 and 0 <= padding_left <= 200
            and 0 <= padding_right <= 200 and 0 <= padding_bottom <= 200):
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=
            "padding_top, padding_left, padding_right, and padding_bottom must be integers in the range of 0 to 200 inclusive"
        )
    if 'image' not in file.content_type:
        return HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                             detail="The uploaded file is not an image.")

    try:
        image = await file.read()
        result = await image_to_csv(image, table_detection_threshold,
                                    table_structure_recognition_threshold,
                                    padding_top, padding_left, padding_bottom,
                                    padding_right)
        #Result is the the no. of tables detected
        if result == 0:
            return HTTPException(status_code=status.HTTP_204_NO_CONTENT,
                                 detail="No table was detected in the image.")
        else:
            file_list = [f'static/ExtractedTable{i}.csv' for i in range(result)]
            return file_list 
    except Exception as err:
        raise HTTPException(status_code=500,
                            detail=f"Internal Server Error. {err}")
