import moment from "moment";
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import StyledText from "../StyledText/StyledText";
import Constants from 'expo-constants';
import createRoom from "../../db/createRoom";
import {colors, sizes, normalize} from "../../constants/styles";
import React, { useState, useEffect } from "react"
import uploadImage from "../../db/uploadImg";
/**
 * Checks if a parameter (or key) exists
 * @param key
 */
const _isExist = (key) =>{
    return (key!==null && key!==undefined)
};


const PostButton = ({title,outfitA,outfitB})=>{

    const [outfitA_url, setOutfitA_url] = useState(null);
    const [outfitB_url, setOutfitB_url] = useState(null);
    const [urlsLoaded, setUrlsLoaded] = useState(false);
    const deviceId = Constants.deviceId;


    useEffect(()=>{
        if ((outfitA_url!==null && outfitB_url!==null) && (!urlsLoaded)){
            setUrlsLoaded(true);
            console.log('Uploading new values to Db')
            // upload data to Db
            const currInstant = moment().toISOString();
            createRoom({userId: deviceId, time_created: currInstant, title,outfitA_url, outfitB_url})
        }
    },[outfitA_url, outfitB_url]);

    const uploadCallback_A = ({url}) =>{
        setOutfitA_url(url)
    };

    const uploadCallback_B = ({url}) =>{
        setOutfitB_url(url)
    };

    const handlePress = async () => {
        if (!_isExist(outfitA) && !_isExist(outfitB)) {
            alert("Please select a picture.");
        } else if (_isExist(outfitA) && !_isExist(outfitB)) {
            alert("Please select a picture for option B.");
        } else if (!_isExist(outfitA) && _isExist(outfitB)) {
            alert("Please select a picture for option A.");
        } else {
              // Upload the images to firebase storage and capture the urls
              uploadImage({uri: outfitA.uri, uploadCallback:uploadCallback_A});
              uploadImage({uri: outfitB.uri, uploadCallback:uploadCallback_B});
        }
    };

    return(
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                <StyledText size={sizes.xlarge.fontSize} style={styles.text}> POST </StyledText>
            </View>

        </TouchableOpacity>
    );
};

const styles =  StyleSheet.create({
    container: {
        height: normalize(40),
        width: normalize(140),
        backgroundColor: colors.primary.main,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:5
    },
    text:{
        color: colors.general.white
    }
});


PostButton.defaultProps = {
    title: "Scoopdi woop poop"
};

export default PostButton;