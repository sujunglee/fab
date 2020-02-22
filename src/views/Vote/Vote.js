import React, { useEffect } from "react"
import { View, Text } from "react-native"
import { VoteButton, SkipButton } from "../../components/VoteButton"
import { SafeAreaView } from "react-native-safe-area-context"

const Vote = () => {
  useEffect(() => {
    /*
    fetch posts here, in descending order of # of votes on post
    */
  })
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <Text>This is the Vote screen</Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            padding: 48
          }}
        >
          <VoteButton content="A" onPress={() => alert("hey")} />
          <VoteButton content="B" onPress={() => alert("hey")} />
        </View>
        <SkipButton />
      </View>
    </SafeAreaView>
  )
}

export default Vote
