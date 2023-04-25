import React, { useState, useEffect } from 'react';
import { View, Text, Button, Animated, Easing, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function UploadFile( { navigation } ){
    const [loading, setLoading] = useState(false);
    const [showDownloadButton, setShowDownloadButton] = useState(false);
    const [translateAnim] = useState(new Animated.ValueXY({ x: 0, y: 0 }));

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

    const handleUpload = () => {
        setLoading(true);

        // TODO: Implement document upload logic here

        setTimeout(() => {
        setLoading(false);
        setShowDownloadButton(true);
        }, 5000);
    };

    const handleDownload = () => {
        // TODO: Implement download logic here
    };

    return (
        <View style={{ color:'white',backgroundColor:'black',flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={{ transform: translateAnim.getTranslateTransform() }}>
            <Icon name="search" size={50} color="#BACDDB" />
        </Animated.View>
        <Text style={{ marginTop: 20,color:'white'}}>
            {loading ? 'Extracting table and converting to CSV' : ''}
        </Text>
        {showDownloadButton ? (
            <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
            <Text style={styles.downloadText}>Download CSV</Text>
          </TouchableOpacity>          
        ) : (
            <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
            <Text style={styles.uploadText}>Upload Image</Text>
            <Text>File Format: jpeg, jpg, and png </Text>
             </TouchableOpacity>
            // <Button   style={styles.uploadBtn} title="Upload Document" onPress={handleUpload} />
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

    },
    uploadBtn:
    {
      borderRadius:5,
      height:50,
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
      fontWeight:'bold'
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
      }
})