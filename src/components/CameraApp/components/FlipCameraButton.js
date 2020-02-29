import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {colors, sizes} from "../../../constants/styles";

const FlipCameraButton = ({cameraFlipCallBack}) => {
    return (
        <TouchableOpacity onPress={cameraFlipCallBack}>
            <Ionicons
                name="md-reverse-camera"
                color={colors.general.white}
                size={45}
                style={{marginRight: sizes.mini.fontSize}}
            />
        </TouchableOpacity>)
};

export default FlipCameraButton;