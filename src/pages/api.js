import React, { useState } from 'react';
import { StyleSheet,TouchableOpacity,View, Text, Image, Button } from 'react-native';
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

  const handleDownload = async () => {
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
      <Text>Download an image:</Text>
      <Image source={{ uri: image.uri }} />
      {/* <Button title="Download CSV" style={styles} onPress={handleDownload} disabled={isLoading} /> */}
      <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
  <Text style={styles.downloadText}>Download CSV</Text>
</TouchableOpacity>
    </View>
  );
};
const colors = {
    primary: '#F3E8FF',
    secondary: '#CE5959',
    base: '#BACDDB',
    gray: '#808080',
    base_f: '#454545',
    text: '#253e53'
};

const styles = StyleSheet.create({
  downloadBtn:
  {
    borderRadius:5,
    height:50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:5,
    backgroundColor:colors.text,
  },
  downloadText:{
    fontSize:18,
    color : colors.secondary,
    fontWeight:'bold'
  },
})