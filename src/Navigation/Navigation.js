import React from "react"
import { StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Results from "../components/results"
import BottomNavbar from "./BottomNavbar"

const Stack = createStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <BottomNavbar />
    </NavigationContainer>
  )
}

export default Navigation
