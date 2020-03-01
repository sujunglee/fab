import React,{useEffect,useState} from "react"
import { View ,Button, StyleSheet,Image} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {CameraApp} from "../../components/CameraApp";
import { useNavigation } from "@react-navigation/native"
import PostButton from "../../components/Post/PostButton";
import { colors, normalize, sizes } from "../../constants/styles";
import StyledText from "../../components/StyledText/StyledText";


// The actual post page
const PostPage = ({route}) =>{

    const [outfitA, setOutfitA] = useState(null);
    const [outfitB, setOutfitB] = useState(null);
    const navigation = useNavigation();


    useEffect(()=>{
       // Set the tabbar to visible just in case
        navigation.setOptions({
            tabBarVisible: true
        });

        // get data for the options
        // use the `uri' to display data
        // use the `base64' to send data
        if (route.params !== undefined){
            if (route.params.outfitOption==='A'){
                setOutfitA({uri:route.params.uri,base64:route.params.base64});
            }
            if (route.params.outfitOption==='B'){
                setOutfitB({uri:route.params.uri,base64:route.params.base64});
            }
        }

    },[route]);


    return(
        <SafeAreaView style={styles.container}>

                <View style={styles.title_container}>
                    <StyledText> What Cardigan should I wear for a big presentation today?</StyledText>
                </View>

                <View style={styles.photos_container}>
                    <Button
                    title="Go to Camera for A"
                    onPress={() => navigation.navigate('CameraApp', {outfitOption: 'A'})}
                    />

                    <Button
                    title="Go to Camera for B"
                    onPress={() => navigation.navigate('CameraApp', {outfitOption: 'B'})}
                    />
                </View>


                <PostButton title={'Poopdi scoop woop'} outfitA={outfitA} outfitB={outfitB}/>
        </SafeAreaView>
    )
};


const styles =  StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        flex:1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    photos_container:{
        borderColor: colors.general.black,
        borderWidth: 1,
        height: '50%',
        width: '100%',
        marginTop: normalize(5),
        marginBottom: normalize(90)
    },
    title_container:{
        borderColor: colors.general.black,
        borderWidth: 1,
        height: '15%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default PostPage;
