import React from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Vote = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <Text>This is the Vote screen</Text>
      </View>
    </SafeAreaView>
  )
}

export default Vote
