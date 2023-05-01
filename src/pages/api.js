import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export default function SendData({ 
    image, 
    topPad,
    bottomPad,
    leftPad,
    rightPad,
    tableDetThresh,
    tableStructThresh,
    authToken
}){

  tableDetThresh = parseFloat(tableDetThresh);
  tableStructThresh = parseFloat(tableStructThresh);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    setIsLoading(true);

    const token = authToken;
    const formData = new FormData();
    console.log(token)
  
    formData.append('file', {
      uri: image,
      name: 'test.jpg',
      type: 'image/jpeg'
    });

    try {
      const response = await axios.post(
        `http://192.168.18.145:8000/extract?table_detection_threshold=${tableDetThresh}&table_structure_recognition_threshold=${tableStructThresh}&padding_top=${topPad}&padding_left=${leftPad}&padding_right=${rightPad}&padding_bottom=${bottomPad}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/x-zip-compressed',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // const url = `http://192.168.18.145:8000/extract?table_detection_threshold=${tableDetThresh}&table_structure_recognition_threshold=${tableStructThresh}&padding_top=${topPad}&padding_left=${leftPad}&padding_right=${rightPad}&padding_bottom=${bottomPad}`;
      const filename = "tables.zip";
      const fileUri = `${FileSystem.documentDirectory}${filename}`;
      const url = new Blob([response.data],{type:'application/x-zip-compressed'});
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        FileSystem.documentDirectory + filename,
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          console.log(`Download progress: ${progress * 100}%`);
        }
      );
      try {
        const { uri } = await downloadResumable.downloadAsync();
        console.log(`Download complete: ${uri}`);
      } catch (e) {
        console.error(`Error downloading file: ${e}`);
      }
      // console.log(response);

      // await FileSystem.writeAsStringAsync(fileUri, response.data, {
      //   encoding: FileSystem.EncodingType.Base64
      // });

      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        try{
          const asset = await MediaLibrary.createAssetAsync(fileUri);
          await MediaLibrary.createAlbumAsync("Downloads", asset, false);
        } catch(error){
          console.log(error)
        }
      }

      // const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status != 'granted') {
        try {
          const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
          const album = await MediaLibrary.getAlbumAsync('Downloads');
          if (album == null) {
            await MediaLibrary.createAlbumAsync('Downloads', asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          }
        } catch (e) {
          handleError(e);
        }
      }


      console.log('File downloaded successfully');


    } catch (error) {
      console.log('Upload error', JSON.stringify(error?.response?.data));
      console.log(formData)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text>Upload an image:</Text>
      <Image source={{ uri: image.uri }} />
      <Button title="Upload" onPress={handleUpload} disabled={isLoading} />
    </View>
  );
};