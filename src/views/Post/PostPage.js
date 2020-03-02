import React, {useEffect, useState} from "react"
import {View, Button, StyleSheet, Image} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {CameraApp} from "../../components/CameraApp";
import {useNavigation} from "@react-navigation/native"
import PostButton from "../../components/Post/PostButton";
import {colors, normalize, sizes} from "../../constants/styles";
import StyledText from "../../components/StyledText/StyledText";
/*
                    <View style={styles.photo_option}>
                        <Button
                        title="Go to Camera for A"
                        onPress={() => navigation.navigate('CameraApp', {outfitOption: 'A'})}
                        />
                    </View>

                     <View style={styles.photo_option}>
                        <Button
                        title="Go to Camera for B"
                        onPress={() => navigation.navigate('CameraApp', {outfitOption: 'B'})}
                        />
                    </View>
 */


// The actual post page
const PostPage = ({route}) => {

    const [outfitA, setOutfitA] = useState(null);
    const [outfitB, setOutfitB] = useState(null);
    const navigation = useNavigation();


    useEffect(() => {
        // Set the tabbar to visible just in case
        navigation.setOptions({
            tabBarVisible: true
        });

        // get data for the options
        // use the `uri' to display data
        // use the `base64' to send data
        if (route.params !== undefined) {
            if (route.params.outfitOption === 'A') {
                setOutfitA({uri: route.params.uri, base64: route.params.base64});
            }
            if (route.params.outfitOption === 'B') {
                setOutfitB({uri: route.params.uri, base64: route.params.base64});
            }
        }

    }, [route]);


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.title_container}>
                <StyledText> What Cardigan should I wear for a big presentation today?</StyledText>
            </View>

            <View style={styles.photos_container}>
                <View style={styles.photo_option}>
                    {outfitA ?
                        <Image source={{uri: outfitA.uri}} style={{...styles.image,backgroundColor:undefined }} resizeMode={'cover'}/>
                        :
                        <Button
                            title="Go to Camera for A"
                            onPress={() => navigation.navigate('CameraApp', {outfitOption: 'A'})}
                        />}

                </View>

                <View style={styles.photo_option}>

                    {outfitB ?
                        <Image source={{uri: outfitB.uri}} style={{...styles.image,backgroundColor:undefined }} />
                        :
                        <Button
                            title="Go to Camera for B"
                            onPress={() => navigation.navigate('CameraApp', {outfitOption: 'B'})}
                        />}


                </View>
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
    photo_option: {
        width: '48.5%',
        height: '100%',
        borderColor: '#808080',
        borderWidth: 1,
        backgroundColor: '#E8E8E8',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title_container: {
        borderColor: colors.general.black,
        borderWidth: 1,
        height: '15%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },

    image: {
        width: '100%',
        height: '100%'
    }

});

export default PostPage;
