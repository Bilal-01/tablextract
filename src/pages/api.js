import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Image, Text, Button, Animated, Easing, StyleSheet, Slider  } from 'react-native';


export default function SendData({ 
    image, 
    topPad,
    bottomPad,
    leftPad,
    rightPad,
    tableDetThresh,
    tableStructThresh
}){
    function call()
    {
        values={
            name: 'bilal'
        }
        axios.post(`http://localhost:8000/docs?table_detection_threshold=${tableDetThresh}&table_structure_recognition_threshold=${tableStructThresh}&padding_top=${topPad}&padding_left=${leftPad}&padding_right=${rightPad}&padding_bottom=${bottomPad}`, values).then(function(response){
            console.log(response)
        })
    }

    return(
       <>
        {call()}
       </> 
    );

}