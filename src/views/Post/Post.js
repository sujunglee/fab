import React,{useEffect,useState} from "react"
import { View, Text, Button, Image, StyleSheet} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {CameraApp} from "../../components/CameraApp";
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native"
import PostPage from "./PostPage";
const Stack = createStackNavigator();


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
