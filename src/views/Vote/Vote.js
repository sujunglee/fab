import React, { useEffect } from "react"
import { View, Text, Button } from "react-native"
import { VoteButton, SkipButton } from "../../components/Vote/VoteButton"
import VoteScreen from "../../components/Vote/VoteScreen"
import { SafeAreaView } from "react-native-safe-area-context"
import getRoomData from "../../db/getRoomData"

const Vote = ({navigation}) => {
  useEffect(() => {
    /*
    fetch posts here, in descending order of # of votes on post
    */
  })
  return (
    <VoteScreen navigation={navigation}/>
  )
}

export default Vote
