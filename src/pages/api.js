import React, { useState } from 'react';
import { Linking,View, Text, Image, Button } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

export default function SendData({ 
  image, 
  topPad,
  bottomPad,
  leftPad,
  rightPad,
  tableDetThresh,
  tableStructThresh,
  authToken
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    setIsLoading(true);

    const token = authToken;
    const formData = new FormData();

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

      // const fileName = 'extractedTable.csv';
      // const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // await FileSystem.writeAsStringAsync(fileUri, response.data, { encoding: FileSystem.EncodingType.UTF8 });

      // console.log('File downloaded successfully');
            const fileName = 'extractedTable.csv';
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;

        const supported = await Linking.canOpenURL(fileUri);
        if (supported) {
          await Linking.openURL(fileUri);
        } else {
          console.log(`Don't know how to open URI: ${fileUri}`);
        }
            // console.log('File path:', fileUri);
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
