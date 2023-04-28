import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, Animated, Easing, StyleSheet, Slider  } from 'react-native';
import { LogoutButton } from '../components/organisms/logout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { auth } from '../../firebaseConfig';

export default function UploadFile( { navigation } ){
    const [loading, setLoading] = useState(false);
    const [showDownloadButton, setShowDownloadButton] = useState(false);
    const [translateAnim] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
    const [image, setImage] = useState('');
    const [topValue, setTopValue] = useState(0);
    const [bottomValue, setBottomValue] = useState(0);
    const [leftValue, setLeftValue] = useState(0);
    const [rightValue, setRightValue] = useState(0);
  
    const handleValueChange1 = (newValue) => {
      setTopValue(Math.round(newValue));
    };
  
    const handleValueChange2 = (newValue) => {
      setBottomValue(Math.round(newValue));
    };
  
    const handleValueChange3 = (newValue) => {
      setLeftValue(Math.round(newValue));
    };
  
    const handleValueChange4 = (newValue) => {
      setRightValue(Math.round(newValue));
    };


    useEffect(() => {
        if (loading) {
        startAnimation();
        } else {
        resetAnimation();
        }
    }, [loading]);

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

        setTimeout(() => {
          setLoading(false);
          setShowDownloadButton(true);
        }, 5000);
    };

    const handleDownload = async () => {
        // const callback = downloadProgress => {
        //     const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite
        //     this.setState({
        //       downloadProgress: progress,
        //     })
        //   }
          
        //   const downloadResumable = FileSystem.createDownloadResumable(
        //     'http://techslides.com/demos/sample-videos/small.mp4',
        //     FileSystem.documentDirectory + 'small.mp4',
        //     {},
        //     callback
        //   )
          
        //   try {
        //     const { uri } = await downloadResumable.downloadAsync()
        //     console.log('Finished downloading to ', uri)
        //   } catch (e) {
        //     console.error(e)
        //   }
          
        //   try {
        //     await downloadResumable.pauseAsync()
        //     console.log('Paused download operation, saving for future retrieval')
        //     AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()))
        //   } catch (e) {
        //     console.error(e)
        //   }
          
        //   try {
        //     const { uri } = await downloadResumable.resumeAsync()
        //     console.log('Finished downloading to ', uri)
        //   } catch (e) {
        //     console.error(e)
        //   }
          
        //   try {
        //     const { uri } = await downloadResumable.resumeAsync()
        //     console.log('Finished downloading to ', uri)
        //   } catch (e) {
        //     console.error(e)
        //   }
    };

    const handleLogout = async () => {
        try {
          await auth.signOut();
          navigation.navigate('Home');
        } catch (error) {
          console.log(error);
        }
      };


    return (
        <View style={{ ...styles.container, color:'white',backgroundColor:'black',flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <View style={styles.logoutBtn}>
                <TouchableOpacity onPress={handleLogout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>

            {showDownloadButton ? (
            <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
                <Text style={styles.downloadText}>Download CSV</Text>
            </TouchableOpacity>          
            ) : (
                <>
                    {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }}  />}
                    <Animated.View style={{ marginTop: 100, transform: translateAnim.getTranslateTransform() }}>
                        <Icon name="search" size={50} color="#BACDDB" />
                    </Animated.View>
                    <Text style={{ marginTop: 20,color:'white'}}>
                        {loading ? 'Extracting table and converting to CSV' : ''}
                    </Text>
                    <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
                        <Text style={styles.uploadText}>Upload Image</Text>
                    </TouchableOpacity>
                    <Text style={{color:'white'}} >File Format: jpeg, jpg, and png </Text>

                    <View style={styles.sliderContainer}>
                        
                        <View style={styles.row}>
                            <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={200}
                            step={1}
                            value={topValue}
                            onValueChange={handleValueChange1}
                            maximumTrackTintColor={colors.primary}
                            minimumTrackTintColor={colors.secondary}
                            thumbTintColor={colors.secondary}
                            />
                            <Text style={{color: 'white'}}>
                              {leftValue}
                            </Text>
                            <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={200}
                            step={1}
                            value={bottomValue}
                            onValueChange={handleValueChange2}
                            maximumTrackTintColor={colors.primary}
                            minimumTrackTintColor={colors.secondary}
                            thumbTintColor={colors.secondary}
                            />
                        </View>
                        <View style={styles.row}>
                            <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={200}
                            step={1}
                            value={leftValue}
                            onValueChange={handleValueChange3}
                            maximumTrackTintColor={colors.primary}
                            minimumTrackTintColor={colors.secondary}
                            thumbTintColor={colors.secondary}
                            />
                            <Text styles={{color: 'white', fontSize: 10}}>{leftValue}</Text>
                            <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={200}
                            step={1}
                            value={rightValue}
                            onValueChange={handleValueChange4}
                            maximumTrackTintColor={colors.primary}
                            minimumTrackTintColor={colors.secondary}
                            thumbTintColor={colors.secondary}
                            />
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

    uploadBtn:
    {
      borderRadius:5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems:"center",
      justifyContent:"center",
      marginTop:10,
      marginBottom:5,
      backgroundColor:colors.secondary,

    },
    uploadText:{
      fontSize:18,
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:5,
        backgroundColor:colors.secondary,
        position: "absolute",
        top: 0,
        right: 10,
        padding: 10,
      },

      sliderContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 50,
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
})