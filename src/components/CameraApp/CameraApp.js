// src/camera.page.js file
import React, {useState, useEffect, useRef} from 'react';
import { View, Text } from 'react-native';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from "prop-types";
import styles from "./CameraAppStyles";
import { useNavigation } from '@react-navigation/native';

const CameraApp =()=>{
    const navigation = useNavigation();

    // will hold reference to actual camera component
    const camera = useRef(null);
    const camera_roll =  useRef(null);
    const [hasPermission, setPermission] = useState(null);

    /**
     * Get permissions.
     * Hide the tabBar
     */
    useEffect(()=>{

        // hides the navbar
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: false
        });

        // Gets the permissions
        const getPermissions = async () =>{
            let camera_permissions = await Permissions.askAsync(Permissions.CAMERA);
            let cameraRoll_permissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            setPermission(
                {
                    camera: camera_permissions.status === 'granted',
                    camera_roll: cameraRoll_permissions.status ==='granted'
                })

        };


        getPermissions();

        return ()=>{parent.setOptions({tabBarVisible: true});}
    },[]);

    /**
     * Check if permissions have been granted
     */
    useEffect(()=>{
        if (hasPermission===null){
            return;
        }

        if (!(hasPermission.camera) && !(hasPermission.camera_roll)) {
            alert("Permission to access camera and camera roll is required!");
        }else if ((hasPermission.camera) && !(hasPermission.camera_roll)){
            alert("Permission to access camera roll is required!");
        }else if (!(hasPermission.camera) && hasPermission.camera_roll){
            alert("Permission to access camera is required!");
        }else{
            // all good!
        }
    },[hasPermission]);

    if (hasPermission === null) {
        return <View />;
    }


    return(
            <View>
                <Camera
                    style={styles.preview}
                    ref={camera}
                />
            </View>
    )
};

CameraApp.defaultProps = {};

CameraApp.propTypes = {};


export default CameraApp;