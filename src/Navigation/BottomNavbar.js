import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { colors } from "../constants/styles"
import { screens } from "./constants"
import { Post, Vote } from "../views"
import ResultsNavigationStack from "./ResultsNavigationStack"
import MyPosts from "./icons/MyPosts"
import PostCamera from "./icons/PostCamera"
import VoteIcon from "./icons/VoteIcon"
const Tab = createBottomTabNavigator()

const BottomNavbar = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: "#ffffff",
        activeTintColor: "#ffffff",
        tabStyle: { backgroundColor: "#323232", color: "white" }
      }}
      initialRouteName={screens.POSTS_PAGE}
    >
      <Tab.Screen
        name={screens.VOTE}
        component={Vote}
        options={{
          tabBarLabel: "Vote",

          tabBarIcon: ({ focused, size }) => (
            <VoteIcon
              size={size}
              color={focused ? colors.secondary.main : "#ffffff"}
            />
          )
        }}
      />
      <Tab.Screen
        name={screens.POST}
        component={Post}
        options={{
          tabBarLabel: "Post",
          tabBarIcon: ({ focused, size }) => (
            <PostCamera
              size={size}
              color={focused ? colors.secondary.main : "#ffffff"}
            />
          )
        }}
      />
      <Tab.Screen
        name={screens.RESULTS}
        component={ResultsNavigationStack}
        options={{
          title: "My Posts",
          tabBarIcon: ({ focused, size }) => (
            <MyPosts
              size={size}
              color={focused ? colors.secondary.main : "#ffffff"}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}
export default BottomNavbar
