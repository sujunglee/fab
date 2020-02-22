import React from "react"
import { ImageBackground, processColor } from "react-native"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"

import { screens } from "./constants"
import { Results, Home, Post, Vote } from "../views"
import ResultsNavigationStack from "./ResultsNavigationStack"
import MyPostsIcon from "./icons/MyPosts"
import PostCamera from "./icons/PostCamera"
import VoteIcon from "./icons/VoteIcon"
const Tab = createMaterialBottomTabNavigator()

const BottomNavbar = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "white" }}
      activeColor="#3e2465"
      inactiveColor="#DBD9E1"
      initialRouteName={screens.POST}
      shifting
      inactiveColor="grey"
      activeColor="purple"
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
        component={ResultsNavigationStack}
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
