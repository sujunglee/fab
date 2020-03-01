import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {colors} from "../constants/styles";
import { screens } from "./constants"
import { Post, Vote } from "../views"
import ResultsNavigationStack from "./ResultsNavigationStack"
import MyPosts from "./icons/MyPosts"
import PostCamera from "./icons/PostCamera"
import VoteIcon from "./icons/VoteIcon"
const Tab = createBottomTabNavigator();

const BottomNavbar = () => {
  return (
    <Tab.Navigator
        tabBarOptions ={{
            inactiveTintColor: "#ffffff",
            activeTintColor:colors.secondary.main,
            inactiveBackgroundColor:"#ffffff",
            style: {backgroundColor:'#323232'},
            tabStyle: {backgroundColor:'#323232'}
        }}

        initialRouteName={screens.POSTS_PAGE}
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
