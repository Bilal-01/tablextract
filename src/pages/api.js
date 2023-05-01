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

    const url = `http://192.168.18.145:8000/extract?table_detection_threshold=${tableDetThresh}&table_structure_recognition_threshold=${tableStructThresh}&padding_top=${topPad}&padding_left=${leftPad}&padding_right=${rightPad}&padding_bottom=${bottomPad}`;

    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (res) => {
      console.log(res.data)

      for (let url of res.data) {
        url = 'http://192.168.18.145:8000/' + url;
        console.log(url);
        const fileUri = `${FileSystem.documentDirectory}${url.split('/').pop()}`;
        const downloadedFile = await FileSystem.downloadAsync(url, fileUri);
    
        if (downloadedFile.status === 200) {
          console.log('File downloaded successfully:', downloadedFile.uri);
        } else {
          console.error('Error downloading file:', downloadedFile);
        }
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
          try{
            var assetFilePath = `${fileUri}`;
            console.log(assetFilePath);
            const asset = await MediaLibrary.createAssetAsync(fileUri);
            await MediaLibrary.createAlbumAsync("Downloads", asset, false);
          } catch(error){
            console.log(error)
          }
        }
      }
      setIsLoading(false);
    })
    .catch(err => console.log(err));
  };

  return (
    <View>
      <Text>Upload an image:</Text>
      <Image source={{ uri: image.uri }} />
      <Button title="Upload" onPress={handleUpload} disabled={isLoading} />
    </View>
  );
};