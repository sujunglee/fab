import React from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Post = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <Text>This is the Post screen</Text>
      </View>
    </SafeAreaView>
  )
}

export default Post
