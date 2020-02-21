import React from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
const Home = () => (
  <SafeAreaView>
    <View
      style={{ alignItems: "center", justifyContent: "center", height: "100%" }}
    >
      <Text>Hey, this is the home lol</Text>
    </View>
  </SafeAreaView>
)

export default Home
