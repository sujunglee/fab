import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback} from 'react-native';

const ShootPictureButton = ({camera, shootPictureCallBack}) =>{



    const handleShortCapture = async () => {
        const photoData = await camera.current.takePictureAsync({base64:true});
        shootPictureCallBack({photoData:photoData});
    };


    return (
        <TouchableWithoutFeedback
            onPress={handleShortCapture}>
            <View style={[styles.captureBtn,  styles.captureBtnActive]}>
                <View style={styles.captureBtnInternal}/>
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