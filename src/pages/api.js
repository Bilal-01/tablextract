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
    // console.log( token );
    const formData = new FormData();
    formData.append('name', 'bilal');
    formData.append('image', file);
    formData.append('table_detection_threshold', tableDetThresh);
    formData.append('table_structure_recognition_threshold', tableStructThresh);
    formData.append('padding_top', topPad);
    formData.append('padding_left', leftPad);
    formData.append('padding_right', rightPad);
    formData.append('padding_bottom', bottomPad);

    try {
      const response = await axios.post(
        'http://localhost:8000/docs',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Upload success', response.data);
    } catch (error) {
      console.log('Upload error', error);
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