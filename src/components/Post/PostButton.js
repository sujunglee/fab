import moment from "moment";
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import StyledText from "../StyledText/StyledText";
import Constants from 'expo-constants';
import createRoom from "../../db/createRoom";
import {colors, sizes, normalize} from "../../constants/styles";
import React, {useState, useEffect} from "react"
import uploadImage from "../../db/uploadImg";
import { ActivityIndicator } from 'react-native-paper';
import { screens } from "../../Navigation/constants"
import { useNavigation } from "@react-navigation/native"
import getRoomData from "../../db/getRoomData";


/**
 * Checks if a parameter (or key) exists
 * @param key
 */
const _uriExist = ({uri}) => {
    return (uri !== null && uri !== undefined)
};


const PostButton = ({title, outfitA, outfitB, postFinishedCallback}) => {
    const defaultTitle='Which one should I choose?';

    const navigation = useNavigation();

    const [outfitA_url, setOutfitA_url] = useState(null);
    const [outfitB_url, setOutfitB_url] = useState(null);
    const [urlsLoaded, setUrlsLoaded] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [roomID, setRoomID] = useState("");
    const [postData, setPostData] = useState({});

    const deviceId = Constants.installationId;

    useEffect(() => {
        if ((outfitA_url !== null && outfitB_url !== null) && (!urlsLoaded)) {
            setUrlsLoaded(true);

            // upload data to Db
            const currInstant = moment().toISOString();

            createRoom({userId: deviceId, time_created: currInstant, title:(title===''?defaultTitle:title), outfitA_url, outfitB_url})
                .then((result) => {

                    // reset state variables
                    setRoomID(result)
                    setOutfitA_url(null);
                    setOutfitB_url(null);
                    setUrlsLoaded(null);
                    setIsPressed(false);
                    postFinishedCallback();

                    // Navigate to the results room
                    navigation.navigate(screens.RESULTS, {
                        roomID: roomID,
                        roomData: postData});
                })

        }

        const getPostData = async () => {
          const data = await getRoomData({ roomID })
          const createdAt = moment(data.timeCreated).format("dddd h:hh A")
          setPostData({
            ...data,
            createdAt: createdAt
          })

        }

        if (roomID !== "") {
          getPostData()
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
            uploadImage({outfit:outfitA, uploadCallback: uploadCallback_A});
            uploadImage({outfit:outfitB, uploadCallback: uploadCallback_B});
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
