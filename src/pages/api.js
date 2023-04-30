// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { View, Image, Text, Button, Animated, Easing, StyleSheet, Slider  } from 'react-native';


// export default function SendData({ 
//     image, 
//     topPad,
//     bottomPad,
//     leftPad,
//     rightPad,
//     tableDetThresh,
//     tableStructThresh
// }){
//     function call()
//     {
//         values={
//             name: 'bilal'
//         }
//         axios.post(`http://localhost:8000/docs?table_detection_threshold=${tableDetThresh}&table_structure_recognition_threshold=${tableStructThresh}&padding_top=${topPad}&padding_left=${leftPad}&padding_right=${rightPad}&padding_bottom=${bottomPad}`, values).then(function(response){
//             console.log(response)
//         })
//     }

//     return(
//        <>
//         {call()}
//        </> 
//     );

// }

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
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    setIsLoading(true);

    const token = authToken;
    const formData = new FormData();
    console.log(image);
  
    formData.append('file', {
      uri: image,
      name: 'test.jpg',
      type: 'image/jpeg'
    });

    try {
      const response = await axios.post(
        'http://192.168.18.145:8000/extract?table_detection_threshold=0.6&table_structure_recognition_threshold=0.8&padding_top=20&padding_left=20&padding_right=20&padding_bottom=20',
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