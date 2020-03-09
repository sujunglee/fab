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
            <View style={[styles.captureBtn,  styles.captureBtnActive, styles.icon]}>
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


export default ShootPictureButton;