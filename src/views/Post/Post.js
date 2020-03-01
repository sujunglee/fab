import React,{useEffect,useState} from "react"
import { View, Text ,Button} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {CameraApp} from "../../components/CameraApp";
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native"
const Stack = createStackNavigator();


// The actual post page
const PostPage = ({navigation, route}) =>{

    const [outfitA_uri, setOutfitA_uri] = useState(null);
    const [outfitB_uri, setOutfitB_uri] = useState(null);
    // const navigation = useNavigation();


    useEffect(()=>{
       // Set the tabbar to visible just in case
        navigation.setOptions({
            tabBarVisible: true
        });

        // get the uri for optionA or optionB from the camera
        if (route.params?.uri) {
        // if (route.params !== undefined){
            if (route.params.outfitOption==='A'){
                console.log(route.params.uri);
                setOutfitA_uri(route.params.uri);
                console.log("****THE URI FOR OUTFIT A: ", route.params.uri)
            }
            if (route.params.outfitOption==='B'){
                 console.log(route.params.uri);
                setOutfitB_uri(route.params.uri);
            }
        }

    },[route]);

    console.log("ALWAYS PRINT: ", route.params);

    if (route.params) {
      console.log("The current URI: ", route.params);
    }


    return(
        <SafeAreaView>
            <Text> My post page</Text>
            {route.params ===undefined?
              <View>
                <Button
                    title="Go to Camera for A"
                    onPress={() => navigation.navigate('CameraApp',
                              {outfitOption: 'A', uri:""})}
                    />

                <Button
                title="Go to Camera for B"
                onPress={() => navigation.navigate('CameraApp', {outfitOption: 'B'})}
                />
              </View>
              :
          <Text>WE NOW HAVE A PHOTO!</Text>}

        </SafeAreaView>
    )
};


const Post = () => {
  return (
        <Stack.Navigator gestureDirection="vertical"
                         initialRouteName={"PostPage"}
                         screenOptions={
                             {
                                 gestureDirection:'vertical-inverted',
                                 gestureEnabled:true,
                                 headerShown: false,
                                 cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                             }
                         }>
            <Stack.Screen  name="PostPage" component={PostPage} />
            <Stack.Screen name="CameraApp" component={CameraApp}  />
        </Stack.Navigator>
  )
};



export default Post
