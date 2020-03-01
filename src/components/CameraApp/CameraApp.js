'use strict';

import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StatusBar, TouchableOpacity, ImageBackground, StyleSheet} from 'react-native';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from "react-native-safe-area-context"
import {colors, sizes} from "../../constants/styles"
import CloseButton from "./components/CloseButton";
import * as MediaLibrary from 'expo-media-library';
import StyledText from "../StyledText/StyledText";
import FlashButton from "./components/FlashButton";
import ImgLibraryButton from "./components/ImgLibraryButton";
import ShootPictureButton from "./components/ShootPictureButton";
import FlipCameraButton from "./components/FlipCameraButton";
import {CAMERA_TYPES,CAMERA_FLASH_MODES} from "./constants"
import {
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';



const CameraApp = ({route}) => {
    const navigation = useNavigation();
    const outfitOption = route.params.outfitOption;

    // will hold reference to actual camera component
    const camera = useRef(null);

    const parentNavbar = useRef(null);

    const [hasPermission, setPermission] = useState(null);
    const [cameraTypeIdx, setCameraTypeIdx] = useState(0);
    const [cameraFlashModeIdx, setCameraFlashModeIdx] =  useState(0);

    const [pictureTaken, setPictureTaken] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [isLibraryImg, setIsLibraryImg] = useState(false);

    useEffect(() => {

        // hides the navbar
        parentNavbar.current = navigation.dangerouslyGetParent();
        parentNavbar.current.setOptions({
            tabBarVisible: false
        });


        // set the status bar at the top to white
        StatusBar.setBarStyle('light-content', true);

        // sets the permissions
        const getPermissions = async () => {
            let camera_permissions = await Permissions.askAsync(Permissions.CAMERA);
            let cameraRoll_permissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            setPermission(
                {
                    camera: camera_permissions.status === 'granted',
                    camera_roll: cameraRoll_permissions.status === 'granted'
                });

            //  let pickerResult = await ImagePicker.launchCameraAsync();
            let uri = await MediaLibrary.getAssetsAsync({first: 1});
            setImgPreview(uri.assets[0].uri);


        };
        getPermissions();


        return () => {
            parentNavbar.current.setOptions({tabBarVisible: true});
            StatusBar.setBarStyle('default', true)
        }
    }, []);

    /**
     * Check if permissions have been granted
     */
    useEffect(() => {
        if (hasPermission === null) {
            return;
        }

        if (!(hasPermission.camera) && !(hasPermission.camera_roll)) {
            alert("Permission to access camera and camera roll is required!");
        } else if ((hasPermission.camera) && !(hasPermission.camera_roll)) {
            alert("Permission to access camera roll is required!");
        } else if (!(hasPermission.camera) && hasPermission.camera_roll) {
            alert("Permission to access camera is required!");
        } else {
            // all good!
        }
    }, [hasPermission]);

    if (hasPermission === null) {
        return <View/>;
    }

    /*
    Called when close
     */
    const handleClose = ({uri,base64}) => {
        try {
            navigation.navigate('PostPage', {
                outfitOption,
                uri,
                base64
            })
        } finally {

            // unhide navbar
            if (parentNavbar.current !== null) {
                parentNavbar.current.setOptions({tabBarVisible: true});
            }

            // set the status bar at the top back to default
            StatusBar.setBarStyle('default', true);
        }
    };


    const imgPickedCallback = (photoData)=>{
         setPictureTaken(photoData);
         setIsLibraryImg(true);
    };


    const cameraFlipCallBack = ()=>{
        setCameraTypeIdx((cameraTypeIdx+1)%2);
    };

    const cameraFlashModeCallBack = ()=>{
        setCameraFlashModeIdx((cameraFlashModeIdx+1)%2);
    };

    const shootPictureCallBack = ({photoData})=>{
        setPictureTaken(photoData);
    };

    const usePhotoCallBack =()=>{
        handleClose(pictureTaken);
    };

    const retakePhotoCallBack = ()=>{
        setPictureTaken(null);
        setIsLibraryImg(false);
    };


    return (

        <SafeAreaView style={{flex: 1, borderRadius: 20, backgroundColor: colors.general.black, overflow: 'hidden'}}>


                <View style={{height: '97%', width: '100%'}}>

                    {pictureTaken !==null?
                        <ImageBackground source={{uri:pictureTaken.uri}} style={styles.preview}>
                            <CloseButton closeCallBack={handleClose}/>
                        </ImageBackground>
                        :
                    <Camera
                        ratio={'4:3'}
                        autoFocus={Camera.Constants.AutoFocus.on}
                        zoom={0}
                        flashMode={CAMERA_FLASH_MODES[cameraFlashModeIdx]}
                        type={CAMERA_TYPES[cameraTypeIdx]}
                        style={styles.preview}
                        ref={camera}
                    >


                        <FlashButton cameraFlashModeIdx={cameraFlashModeIdx} cameraFlashModeCallBack={cameraFlashModeCallBack}/>
                        <CloseButton closeCallBack={handleClose} style={styles.closeButton}/>


                        <View style={{
                            flex: 1,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                            width: '100%',
                            height: 100,
                            alignItems: 'center'
                        }}>

                            <ImgLibraryButton imgPreview={imgPreview} imgPickedCallback={imgPickedCallback} outfitOption={outfitOption}/>
                            <ShootPictureButton camera={camera} shootPictureCallBack={shootPictureCallBack}/>
                            <FlipCameraButton cameraFlipCallBack={cameraFlipCallBack}/>

                        </View>
                    </Camera>}
                </View>


            {pictureTaken && <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row', width: '100%'}}>
                <TouchableOpacity onPress={usePhotoCallBack}>
                    <StyledText size={sizes.small.fontSize} style={{
                        color: colors.primary.light,
                        alignSelf: 'flex-end',
                        height: '100%',
                        marginLeft: sizes.mini.fontSize
                    }}>Use Photo</StyledText>
                </TouchableOpacity>

                <TouchableOpacity onPress={retakePhotoCallBack}>
                    <StyledText size={sizes.small.fontSize} style={{
                        color: colors.primary.light,
                        alignSelf: 'flex-start',
                        height: '100%',
                        marginRight: sizes.mini.fontSize
                    }}>{isLibraryImg? 'Cancel': 'Retake'}</StyledText>
                </TouchableOpacity>
            </View>}




        </SafeAreaView>
    )
};

const styles =  StyleSheet.create({
    preview: {
        height: '100%',
        width: '100%',
        borderRadius:20,
        overflow:'hidden',
        flexDirection: 'row'
    }
});


CameraApp.defaultProps = {};

CameraApp.propTypes = {};


export default CameraApp;