import React from "react"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"

import { screens } from "./constants"
import { Post, Vote } from "../views"
import ResultsNavigationStack from "./ResultsNavigationStack"
import MyPosts from "./icons/MyPosts"
import PostCamera from "./icons/PostCamera"
import VoteIcon from "./icons/VoteIcon"
const Tab = createMaterialBottomTabNavigator()

const BottomNavbar = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "#323232" }}
      activeColor="#3e2465"
      inactiveColor="#ffffff"
      initialRouteName={screens.POSTS_PAGE}
      activeColor="#DD8300"
    >
      <Tab.Screen
        name={screens.VOTE}
        component={Vote}
        options={{
          tabBarLabel: "Vote",
          tabBarIcon: ({ color, size }) => (
            <VoteIcon size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name={screens.POST}
        component={Post}
        options={{
          tabBarLabel: "Post",
          tabBarIcon: ({ color, size }) => (
            <PostCamera size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name={screens.RESULTS}
        component={ResultsNavigationStack}
        options={{
          title: "My Posts",
          tabBarIcon: ({ color, size }) => <MyPosts size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  )
}
export default BottomNavbar
