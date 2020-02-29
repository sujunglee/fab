// src/camera.page.js file
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { Ionicons } from '@expo/vector-icons';
import {sizes} from "../../../constants/styles";

const CloseButton =({closeCallBack, style})=>{

    return (
        <TouchableOpacity
            onPress={closeCallBack}
            style={styles.container}>
            <Ionicons name="md-close" size={32} color="white" />
        </TouchableOpacity>

    );
};

const styles =  StyleSheet.create({
    container:{
        top: sizes.mini.fontSize,
        right:sizes.mini.fontSize,
        position: 'absolute',
        width:50,
        height:50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});



CloseButton.defaultProps = {
    style: {}
};

CloseButton.propTypes = {
    closeCallBack: PropTypes.func.isRequired,
    style:PropTypes.object
};

export default CloseButton;