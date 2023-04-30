import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import axios from 'axios';

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
    console.log(token);
  
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Upload success', response?.data);
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