import React, {useState, useEffect, useRef} from 'react';
import { TouchableOpacity,  StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {sizes} from "../../../constants/styles";
import {CAMERA_FLASH_MODES}  from "../constants"
import {Camera} from "expo-camera";


const FlashButton = ({cameraFlashModeIdx,cameraFlashModeCallBack})=>{
    console.log(cameraFlashModeIdx)
    console.log("heyyy")
    return(
        <TouchableOpacity
            onPress={cameraFlashModeCallBack}
            style={styles.container}
        >
            <Ionicons
            name={(CAMERA_FLASH_MODES[cameraFlashModeIdx] === Camera.Constants.FlashMode.on) ? "md-flash" : 'md-flash-off'}
            color="white"
            size={30}
            style={styles.flashButton}
            />
        </TouchableOpacity>
    )
};

const styles =  StyleSheet.create({
    container:{
        top: sizes.mini.fontSize,
        left:sizes.mini.fontSize,
        position: 'absolute',
        width:50,
        height:50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flashButton:{
    }
});

export default FlashButton;