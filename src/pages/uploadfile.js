import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, Animated, Easing, StyleSheet, Slider  } from 'react-native';
import { LogoutButton } from '../components/organisms/logout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { auth } from '../../firebaseConfig';
import CustomSlider from '../components/organisms/slider';
import SendData from './api';

export default function Main( { navigation, route } ){
    let token  = route.params.authToken
    const [loading, setLoading] = useState(false);
    const [showDownloadButton, setShowDownloadButton] = useState(false);
    const [translateAnim] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
    const [image, setImage] = useState(null);
    const [topValue, setTopValue] = useState(20);
    const [bottomValue, setBottomValue] = useState(20);
    const [leftValue, setLeftValue] = useState(20);
    const [rightValue, setRightValue] = useState(20);
    const [tableDetectionThresh, setTableDetectionThresh] = useState(0.6);
    const [tableStructureThresh, setTableStructureThresh] = useState(0.8);
    const [isDone, setIsDone] = useState(false);
  
    const handleValueChangeTop = (newValue) => {
      setTopValue(Math.round(newValue));
    };
  
    const handleValueChangeBottom = (newValue) => {
      setBottomValue(Math.round(newValue));
    };
  
    const handleValueChangeLeft = (newValue) => {
      setLeftValue(Math.round(newValue));
    };
  
    const handleValueChangeRight = (newValue) => {
      setRightValue(Math.round(newValue));
    };

    const handleValueChangeDetectionThresh = (newValue) => {
      setTableDetectionThresh(newValue)
    }
    const handleValueChangeStructureThresh = (newValue) => {
      setTableStructureThresh(newValue)
    }


    

    const handleUpload = async () => {
        setLoading(true);

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            if(image){
                console.log("image set")
            }
        }

        setLoading(false);
        setShowDownloadButton(true);
        // setTimeout(() => {
        // }, 5000);
    };

    const handleDownload = async () => {
      
    };

    const handleLogout = async () => {
      try {
        await auth.signOut();
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    };

    const handleNavigateBack = () => {
      setShowDownloadButton(false);
      setImage(null);
    }

    const handleDone = () => {
      setIsDone(true);
    }



    return (
        <View style={{ ...styles.container, color:'white',backgroundColor:'black',flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          <View style={styles.logoutBtn}>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

          {showDownloadButton ? (
            <>
              {/* <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
                  <Text style={styles.downloadText}>Download CSV</Text>
              </TouchableOpacity> */}
              <View style={styles.backBtnContainer}>
                <TouchableOpacity style={styles.backBtn} onPress={handleNavigateBack}>
                  <Text style={styles.backBtnText}>
                    Back
                  </Text>
                </TouchableOpacity>
              </View>
              <SendData 
                image = {image}
                topPad = {topValue}
                bottomPad={bottomValue}
                leftPad={leftValue}
                rightPad={rightValue}
                tableDetThresh={tableDetectionThresh}
                tableStructThresh={tableStructureThresh}
                authToken={token}
              />          
            </>
          ) : (
              <>
                <View style={styles.sliderContainer}>
                  <View style={styles.singleRow}>
                    <CustomSlider 
                      value = {tableDetectionThresh}
                      onValueChange={handleValueChangeDetectionThresh}
                      step={0.01}
                      min = {0.1}
                      max = {1}
                      title="Table Detection Threshold"
                    />
                  </View>
                  <View style={styles.singleRow}>
                    <CustomSlider 
                      value = {tableStructureThresh}
                      onValueChange={handleValueChangeStructureThresh}
                      step={0.01}
                      min = {0.1}
                      max = {1}
                      title="Table Structure Threshold"
                    />
                  </View>
                  <View style={styles.row}>
                    <CustomSlider 
                      value = {topValue}
                      onValueChange = {handleValueChangeTop}
                      title="Top Padding"
                    />
                    <CustomSlider 
                      value = {bottomValue}
                      onValueChange = {handleValueChangeBottom}
                      title="Bottom Padding"
                    />
                  </View>
                  <View style={styles.row}>
                    <CustomSlider 
                      value = {leftValue}
                      onValueChange = {handleValueChangeLeft}
                      title="Left Padding"
                    />
                    <CustomSlider 
                      value = {rightValue}
                      onValueChange = {handleValueChangeRight}
                      title="Right Padding"
                    />
                  </View>
                </View>
                <View style={{...styles.uploadContainer}}>
                  <View  style={styles.upload}>
                    <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
                        <Text style={styles.uploadText}>Upload Image</Text>
                    </TouchableOpacity>
                    <Text style={{color:'white', fontSize: 11,textAlign:'center',marginTop:5}} >File Format: jpeg, jpg, and png </Text>
                  </View>
                </View>
              </>
            )}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Contact Us</Text>
                <Text style={styles.footerText}>tablextract.app@gmail.com</Text>
            </View>
        </View>
    );
}

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
    },

    backBtnContainer: {
      width: '100%',
      height: '30%',
      display: 'flex',
      alignItems: 'center'
    },

    backBtn: {
      borderRadius:5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems:"center",
      justifyContent:"center",
      marginTop:10,
      marginBottom:3,
      backgroundColor:colors.secondary,
      width: '100%',
      // position: 'absolute',
      // top: 0,
      // left: 0,
    },
    
    backBtnText: {
      fontSize:12,
      color : colors.text,
      fontWeight:'bold',
    },

    uploadContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
      flexDirection:'row',
      width:'100%',
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

    upload:
    {
      padding:20,
      height:'100%',
      width:'50%',
    
    },
    uploadBtn:
    {
      borderRadius:5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems:"center",
      justifyContent:"center",
      marginTop:10,
      marginBottom:3,
      backgroundColor:colors.secondary,
    },
    uploadText:{
      fontSize:16,
      color : colors.text,
      fontWeight:'bold',
    },

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
    footer: {
        backgroundColor: colors.base_f,
        padding: 10,
        alignItems: 'center',
        marginTop: 5,
        width:'100%',
        bottom:0,
        position: 'absolute',
        bottom: 0,
        width: '100%',
      },
    
      footerText: {
        fontSize: 14,
        lineHeight: 18,
        textAlign: 'center',
        marginBottom: 5,
        color: colors.gray,
      },

      logoutBtn: {
        borderRadius:5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        backgroundColor:colors.secondary,
        position: "absolute",
        top: 0,
        right: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.secondary,
      },
      logoutText:{
        fontSize:16,
        color : colors.text,
        fontWeight:'bold',
      },

      sliderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      },
      slider: {
        flex: 1,
        height: 40,
        color: 'white',
      },
      singleRow: {
        flexDirection: 'row',
      }
})