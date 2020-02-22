import React, { useEffect } from "react"
import { View, Text } from "react-native"
import { VoteButton, SkipButton } from "../../components/Vote/VoteButton"
import VoteScreen from "../../components/Vote/VoteScreen"
import { SafeAreaView } from "react-native-safe-area-context"
import getRoomData from "../../db/getRoomData"

const Vote = () => {
  useEffect(() => {
    /*
    fetch posts here, in descending order of # of votes on post
    */
  })
  return (
    <VoteScreen roomID="room1" />
  )
}

export default Vote
