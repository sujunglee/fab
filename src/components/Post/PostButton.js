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

    const [outfitUrls, setOutfitUrls] = useState({'A':null, 'B':null});
    const [urlsLoaded, setUrlsLoaded] = useState(false);
    const currInstant = moment().toISOString();
    const deviceId = Constants.deviceId;

    const uploadCallback = ({outfit,url}) =>{
        if (outfit==='A'){
            setOutfitUrls({...outfitUrls,'A':url})
        }
        if (outfit==='B'){
            setOutfitUrls({...outfitUrls,'B':url})
        }
    };

    useEffect(()=>{
        if ((outfitUrls.A!==null && outfitUrls.B!==null) && (urlsLoaded===false)){
            setUrlsLoaded(true);
        }
    },[outfitUrls.A, outfitUrls.B]);


    const handlePress = async () => {
        if (!_isExist(outfitA) && !_isExist(outfitB)) {
            alert("Please select a picture.");
        } else if (_isExist(outfitA) && !_isExist(outfitB)) {
            alert("Please select a picture for option B.");
        } else if (!_isExist(outfitA) && _isExist(outfitB)) {
            alert("Please select a picture for option A.");
        } else {

            // Upload the images to firebase storage and capture the urls
             await uploadImage({uri: outfitA.uri, uploadCallback, outfit: 'A'});
             await uploadImage({uri: outfitB.uri, uploadCallback, outfit: 'B'});

            //let optionB_uri = await uploadImage(outfitB);

            // upload data to Db
           // createRoom({userId: deviceId, time_created: currInstant, title, optionA_uri, optionB_uri})
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


export default PostButton;