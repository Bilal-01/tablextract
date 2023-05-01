import React, { useState, useEffect } from 'react';
import { StyleSheet,View, Text, Image, Animated, Easing, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
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
  authToken,
  handleDone,
  }){
    
    tableDetThresh = parseFloat(tableDetThresh);
    tableStructThresh = parseFloat(tableStructThresh);
    const [isLoading, setIsLoading] = useState(false);
    const [translateAnim] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
    if (isLoading) {
    startAnimation();
    } else {
    resetAnimation();
    }
  }, [isLoading]);

  const startAnimation = () => {
      Animated.loop(
      Animated.sequence([
          Animated.timing(translateAnim, {
          toValue: { x: -50, y: -50 },
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
          }),
          Animated.timing(translateAnim, {
          toValue: { x: 0, y: -100 },
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
          }),
          Animated.timing(translateAnim, {
          toValue: { x: 50, y: -50 },
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
          }),
          Animated.timing(translateAnim, {
          toValue: { x: 0, y: 0 },
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
          }),
      ])
      ).start();
  };

  const resetAnimation = () => {
      Animated.timing(translateAnim).stop();
      translateAnim.setValue({ x: 0, y: 0 });
  };



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
      setIsDone(true);
      // handleDone(true)
    })
    .catch(err => console.log(err));
  };

 
  return (
    <View style={{ ...styles.container, color:'white',backgroundColor:'black',display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      { isDone ? 
        <Text style={styles.successText}>Your CSV file has been downloaded! Go check the Downloads folder</Text>
      :
      <>
        <View style={styles.animator}>
          <Animated.View style={{ marginTop: 0, transform: translateAnim.getTranslateTransform() }}>
              <Icon name="search" size={35} color="#BACDDB" />
          </Animated.View>
          <Text style={{ textAlign:'center',fontSize:11,marginTop: 12,color:'white'}}>
              {isLoading ? 'Extracting table and converting to CSV' : ''}
          </Text>
        </View> 
        <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
            <Text style={styles.downloadText}>Download CSV</Text>
        </TouchableOpacity>
      </>
      }
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
  container: {
    position: "relative",
    height: '40%',
  },

  successText: {
    fontSize: 16, 
    color: colors.primary,
    width: 300,
    textAlign: 'center'
  },

  downloadBtn:
  {
    borderRadius:5,
    height:100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:5,
    backgroundColor:colors.text,
  },
  downloadText:{
    fontSize:18,
    color : colors.secondary,
    fontWeight:'bold'
  },
  animator:
    {
      marginTop:20,
      height:'100%',
      width:'50%',
      padding:30,
      flex: 1, 
      alignItems: 'center'
    },
})