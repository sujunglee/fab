import React, {useEffect, useState} from "react"
import {View, StyleSheet} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {useNavigation} from "@react-navigation/native"
import PostButton from "../../components/Post/PostButton";
import {colors, normalize, sizes} from "../../constants/styles";
import StyledText from "../../components/StyledText/StyledText";
import PostPhoto from "./PostPhoto";

// The actual post page
const PostPage = ({route}) => {

    const [outfitA, setOutfitA] = useState({uri:undefined, outfitOption:'A'});
    const [outfitB, setOutfitB] = useState({uri:undefined, outfitOption:'B'});
    const navigation = useNavigation();


    useEffect(() => {
        // Set the tabbar to visible just in case - we remove this for the camera
        navigation.setOptions({
            tabBarVisible: true
        });

        // get data for the options
        // use the `uri' to display data
        // use the `base64' to send data
        if (route.params !== undefined) {
            if (route.params.outfitOption === 'A') {
                setOutfitA({uri: route.params.uri, outfitOption:'A'});
            }
            if (route.params.outfitOption === 'B') {
                setOutfitB({uri: route.params.uri,outfitOption:'B'});
            }
        }

    }, [route]);

    /**
     * Called when picture is closed
     */
    const onPictureCloseCallback = (outfit) =>{
        if (outfit.outfitOption==='A'){
            setOutfitA({uri:undefined, outfitOption:'A'})
        }

        if (outfit.outfitOption==='B'){
            setOutfitB({uri:undefined, outfitOption:'B'})
        }

    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.title_container}>
                <StyledText> What Cardigan should I wear for a big presentation today?</StyledText>
            </View>

            <View style={styles.photos_container}>
                <PostPhoto outfit={outfitA} onCloseCallback={onPictureCloseCallback}/>

                <PostPhoto outfit={outfitB} onCloseCallback={onPictureCloseCallback}/>
            </View>


            <PostButton title={'Poopdi scoop woop'} outfitA={outfitA} outfitB={outfitB}/>
        </SafeAreaView>
    )
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },

    photos_container: {
        flexDirection: 'row',
        width: '100%',
        height: '40%',
        justifyContent: 'space-around',
        marginBottom: normalize(100)
    },

    title_container: {
        borderColor: colors.general.black,
        borderWidth: 1,
        height: '15%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    }

});

export default PostPage;
