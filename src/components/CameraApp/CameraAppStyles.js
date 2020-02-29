import { StyleSheet, Dimensions } from 'react-native';
import {sizes} from "../../constants/styles";

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles =  StyleSheet.create({
    preview: {
        height: '100%',
        width: '100%',
        borderRadius:20,
        overflow:'hidden',
        flexDirection: 'row'
    },
    closeButton:{
        position: 'absolute',
        top: sizes.mini.fontSize,
        right:sizes.mini.fontSize
    },
    flashButton:{
        top: sizes.mini.fontSize,
        left:sizes.mini.fontSize,
        position: 'absolute',
    },
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
    imgLibraryButton:{
        width: 50,
        height: 50,
        borderWidth:.1,
    },
    flipCamera:{
position: "absolute", bottom: 0, right: 0
    }


});

export default styles;