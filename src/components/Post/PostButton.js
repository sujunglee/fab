import moment from "moment";
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import StyledText from "../StyledText/StyledText";
import Constants from 'expo-constants';
import createRoom from "../../db/createRoom";
import {colors, sizes, normalize} from "../../constants/styles";
import React, {useState, useEffect} from "react"
import uploadImage from "../../db/uploadImg";
import { ActivityIndicator } from 'react-native-paper';

/**
 * Checks if a parameter (or key) exists
 * @param key
 */
const _uriExist = ({uri}) => {
    return (uri !== null && uri !== undefined)
};


const PostButton = ({title, outfitA, outfitB, postFinishedCallback}) => {

    const [outfitA_url, setOutfitA_url] = useState(null);
    const [outfitB_url, setOutfitB_url] = useState(null);
    const [urlsLoaded, setUrlsLoaded] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const deviceId = Constants.installationId;

    // ToDo: Navigate to the results room after room is created.
    useEffect(() => {
        if ((outfitA_url !== null && outfitB_url !== null) && (!urlsLoaded)) {
            setUrlsLoaded(true);

            // upload data to Db
            const currInstant = moment().toISOString();
            createRoom({userId: deviceId, time_created: currInstant, title, outfitA_url, outfitB_url})
                .then(() => {
                    // Navigate to the results room
                    console.log('NAVIGATE TO RESULT ROOM!!!!!!!!');

                    // reset state variables
                    setOutfitA_url(null);
                    setOutfitB_url(null);
                    setUrlsLoaded(null);
                    setIsPressed(false);
                    postFinishedCallback();
                })
        }
    }, [outfitA_url, outfitB_url]);

    const uploadCallback_A = ({url}) => {
        setOutfitA_url(url)
    };

    const uploadCallback_B = ({url}) => {
        setOutfitB_url(url)
    };

    const handlePress = async () => {
        if (!_uriExist(outfitA) && !_uriExist(outfitB)) {
            alert("Please take a photo");
        } else if (_uriExist(outfitA) && !_uriExist(outfitB)) {
            alert("Please take a photo for option B");
        } else if (!_uriExist(outfitA) && _uriExist(outfitB)) {
            alert("Please take a photo for option A");
        } else {
            setIsPressed(true);
            // Upload the images to firebase storage and capture the urls
            uploadImage({uri: outfitA.uri, uploadCallback: uploadCallback_A});
            uploadImage({uri: outfitB.uri, uploadCallback: uploadCallback_B});
        }
    };

    return (
        isPressed ?
            <View style={styles.container}>
                 <ActivityIndicator animating={true} color={colors.general.white} />
            </View>
            :
            <TouchableOpacity onPress={handlePress}>

                <View style={styles.container}>
                    <StyledText size={sizes.xlarge.fontSize} style={styles.text}> POST </StyledText>
                </View>
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: normalize(40),
        width: normalize(140),
        backgroundColor: colors.primary.main,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        color: colors.general.white
    }
});


PostButton.defaultProps = {
    title: "Scoopdi woop poop"
};

export default PostButton;
