import React from 'react';
import {TouchableOpacity,StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {colors, sizes} from "../../../constants/styles";

const FlipCameraButton = ({cameraFlipCallBack}) => {
    return (
        <TouchableOpacity onPress={cameraFlipCallBack}>
            <Ionicons
                name="md-reverse-camera"
                color={colors.general.white}
                size={45}
                style={styles.icon}
            />
        </TouchableOpacity>)
};

const styles =  StyleSheet.create({
   icon:{
        marginRight: sizes.mini.fontSize,
        shadowOpacity: .2,
        shadowRadius: 1,
       shadowColor:'#000000',
        textShadowOffset:{width: 5,height: 2},
        textShadowRadius: 10,
        shadowOffset: {
            width: 2.5,            // Same rules apply from above
            height: 2,           // Can't both be 0
        }
    }
});

export default FlipCameraButton;