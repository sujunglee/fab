// src/camera.page.js file
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { Ionicons } from '@expo/vector-icons';
import {sizes} from "../../../constants/styles";

const isObjectNull = obj =>{
    return Object.entries(obj).length === 0 && obj.constructor === Object
};

const CloseButton =({style, closeCallBack})=>{
    return (
        <TouchableOpacity
            onPress={closeCallBack}
            style={isObjectNull(style)? styles.container: style}>
            <Ionicons name="md-close" size={32} color="white" style={styles.icon}/>
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
    },
    icon:{
        shadowOpacity: .5,
        shadowRadius: 2,
       shadowColor:'#000000',
        textShadowOffset:{width: 5,height: 2},
        textShadowRadius: 10,
        shadowOffset: {
            width: 1,            // Same rules apply from above
            height: 0,           // Can't both be 0
        }
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