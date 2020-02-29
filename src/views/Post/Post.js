import React,{useEffect} from "react"
import { View, Text ,Button} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {CameraApp} from "../../components/CameraApp";
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native"
import {cameraHeaderStyle} from './PostStyles'
const Stack = createStackNavigator();




// The actual post page
const PostPage = ({route}) =>{
    const navigation = useNavigation();
    return(
        <SafeAreaView>
            <Text> My post page</Text>
            <Button
                title="Go to Camera"
                onPress={() => navigation.navigate('CameraApp')}
                />
        </SafeAreaView>
    )
};




const Post = () => {
  return (
        <Stack.Navigator initialRouteName={"PostPage"} screenOptions={{headerShown: false}}>
            <Stack.Screen  name="PostPage" component={PostPage} />
            <Stack.Screen name="CameraApp" component={CameraApp} options={cameraHeaderStyle} />
        </Stack.Navigator>
  )
};



export default Post
