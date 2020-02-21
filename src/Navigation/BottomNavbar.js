import React from "react"
import { ImageBackground } from "react-native"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { screens } from "./constants"
import { Results, Home, Post, Vote } from "../views"
import MyPostsIcon from "./icons/MyPosts"
import PostCamera from "./icons/PostCamera"
import VoteIcon from "./icons/VoteIcon"
// import TestIcon from "./icons/test.svg"
const Tab = createMaterialBottomTabNavigator()

const BottomNavbar = () => {
  return (
    <Tab.Navigator
      //   screenOptions={({ route }) => ({
      //     tabBarIcon: ({ focused, color, size }) => {
      //       console.log(route)
      //       if (route.name === screens.RESULTS) {
      //         console.log("results")
      //         console.log(size)
      //         return <MyPostsIcon size={size} />
      //       }
      //     }
      //   })}
      barStyle={{ backgroundColor: "white" }}
      activeColor="#3e2465"
      inactiveColor="#DBD9E1"
      initialRouteName={screens.POST}
      shifting
      //   tabBarOptions={{
      //     inactiveTintColor: "gray"
      //   }}
    >
      <Tab.Screen
        name={screens.VOTE}
        component={Vote}
        options={{
          title: "Vote",
          tabBarIcon: ({ color, size }) => (
            <VoteIcon size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name={screens.POST}
        component={Post}
        options={{
          title: "Post",
          tabBarIcon: ({ color, size }) => (
            <PostCamera size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name={screens.RESULTS}
        component={Results}
        options={{
          title: "Results",
          tabBarIcon: ({ color, size }) => (
            <MyPostsIcon size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}
export default BottomNavbar
