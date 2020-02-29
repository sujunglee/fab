import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';
import {colors, sizes} from "../../../constants/styles";

const ShootPictureButton = ({camera, shootPictureCallBack}) =>{



    const handleShortCapture = async () => {
        const photoData = await camera.takePictureAsync();
        shootPictureCallBack({photoData:photoData});
    };


    return (
        <TouchableWithoutFeedback
            onPress={handleShortCapture}>
            <View style={[styles.captureBtn, false && styles.captureBtnActive]}>
                {false && <View style={styles.captureBtnInternal}/>}
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles =  StyleSheet.create({
    captureBtn: {
        width: 80,
        height: 80,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "white",
        borderColor: "black",
    }
});


export default ShootPictureButton;