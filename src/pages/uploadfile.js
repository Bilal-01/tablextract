import React, { useState, useEffect } from 'react';
import { View, Text, Button, Animated, Easing, StyleSheet } from 'react-native';
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View style={{ transform: translateAnim.getTranslateTransform() }}>
            <Icon name="search" size={50} color="#0000ff" />
        </Animated.View>
        <Text style={{ marginTop: 20 }}>
            {loading ? 'Extracting table and converting to CSV' : ''}
        </Text>
        {showDownloadButton ? (
            <Button title="Download CSV" onPress={handleDownload} />
        ) : (
            <Button title="Upload Document" onPress={handleUpload} />
        )}
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

    }
})