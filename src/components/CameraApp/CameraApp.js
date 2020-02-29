'use strict';

import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from "prop-types";
import styles from "./CameraAppStyles";
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {SafeAreaView} from "react-native-safe-area-context"
import {colors, sizes} from "../../constants/styles"
import CloseButton from "./components/CloseButton";
import {screens} from "../../Navigation/constants";
import * as MediaLibrary from 'expo-media-library';
import StyledText from "../StyledText/StyledText";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import FlashButton from "./components/FlashButton";
import ImgLibaryButton from "./components/ImgLibaryButton";
import ShootPictureButton from "./components/ShootPictureButton";
import FlipCameraButton from "./components/FlipCameraButton";
import {CAMERA_TYPES,CAMERA_FLASH_MODES} from "./constants"



const CameraApp = () => {
    const navigation = useNavigation();

    // will hold reference to actual camera component
    const camera = useRef(null);
    const parentNavbar = useRef(null);
    const camera_roll = useRef(null);
    const [hasPermission, setPermission] = useState(null);
    const [cameraTypeIdx, setCameraTypeIdx] = useState(0);
    const [cameraFlashModeIdx, setCameraFlashModeIdx] =  useState(0);

    const [isPictureTaken, setIsPictureTaken] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [previewLoaded, setPreviewLoaded] = useState(false);
    /**
     * Get permissions.
     * Hide the tabBar
     */
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
            console.log(uri)
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
    const handleClose = ({uri}) => {
        try {
            navigation.navigate('PostPage', {
                roomID: "c",
                roomData: "d",
                uri
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


    const imgPickedCallback = ({uri})=>{
        handleClose({uri})
    };


    const cameraFlipCallBack = ()=>{
        setCameraTypeIdx((cameraTypeIdx+1)%2);
    };

    const cameraFlashModeCallBack = ()=>{
        setCameraFlashModeIdx((cameraFlashModeIdx+1)%2);
    };

    return (

        <SafeAreaView style={{flex: 1, borderRadius: 20, backgroundColor: colors.general.black, overflow: 'hidden'}}>


                <View style={{height: '97%', width: '100%'}}>

                    <Camera
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

                            <ImgLibaryButton imgPreview={imgPreview} imgPickedCallback={imgPickedCallback}/>
                            <ShootPictureButton camera={camera.current}/>
                            <FlipCameraButton cameraFlipCallBack={cameraFlipCallBack}/>


                        </View>
                    </Camera>
                </View>


            <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row', width: '100%'}}>
                <StyledText size={sizes.small.fontSize} style={{
                    color: colors.primary.light,
                    alignSelf: 'flex-end',
                    height: '100%',
                    marginLeft: sizes.mini.fontSize
                }}>Use Photo</StyledText>
                <StyledText size={sizes.small.fontSize} style={{
                    color: colors.primary.light,
                    alignSelf: 'flex-start',
                    height: '100%',
                    marginRight: sizes.mini.fontSize
                }}>Retake</StyledText>

            </View>

        </SafeAreaView>
    )
};

CameraApp.defaultProps = {};

CameraApp.propTypes = {};


export default CameraApp;