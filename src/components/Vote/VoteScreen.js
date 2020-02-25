import React, { useState } from "react"
import { View, Text, Image } from "react-native"
import { VoteButton, SkipButton } from "./VoteButton"
import { SafeAreaView, useSafeArea } from "react-native-safe-area-context"
import { StyledText } from "../StyledText"
import { useNavigation } from "@react-navigation/native"
import updateVotes from "../../db/updateVotes"

const VoteScreen = ({ roomData, userID, badge, handleNextRoom }) => {
  const [results, setResults] = useState(null)
  const handlePress = async selection => {
    const roomID = roomData.id
    const results = await updateVotes({
      roomID: roomID,
      selection: selection,
      userID: userID,
      badge: badge
    })
    setResults(results)

    /*
        Janky settimeout to show results for 1.5 seconds
    */

    const delay = 1500
    setTimeout(() => {
      handleNextRoom()
      setResults(null)
    }, delay)
  }

  return roomData ? (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          width: "100%"
        }}
      >
        <View style={{ padding: 25, maxHeight: 150 }}>
          <StyledText type="bold" size={23}>
            {roomData.room.meta_data.title}
          </StyledText>
        </View>
        <View style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <View
              style={{ alignItems: "center", flex: 1, marginHorizontal: 4 }}
            >
              <Image
                source={{ uri: roomData.room.optionA.picture }}
                style={{ width: 200, height: 300 }}
                resizeMode="contain"
              />
              <StyledText type="bold" size={20} style={{ paddingTop: 10 }}>
                Option A
              </StyledText>
            </View>
            <View
              style={{ alignItems: "center", flex: 1, marginHorizontal: 4 }}
            >
              <Image
                source={{ uri: roomData.room.optionB.picture }}
                style={{ width: 200, height: 300 }}
                resizeMode="contain"
              />
              <StyledText type="bold" size={20} style={{ paddingTop: 10 }}>
                Option B
              </StyledText>
            </View>
          </View>
          {results ? (
            <StyledText type="bold">Results go here </StyledText>
          ) : (
            <View style={{ alignItems: "center", flexDirection: "column" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 8,
                  justifyContent: "space-evenly"
                }}
              >
                <VoteButton content="A" onPress={() => handlePress("A")} />
                <VoteButton content="B" onPress={() => handlePress("B")} />
              </View>
              <SkipButton onPress={handleNextRoom} style={{ marginTop: 8 }} />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <Text>Loading...</Text>
  )
}
export default VoteScreen
