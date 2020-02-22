import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { VoteButton, SkipButton } from "../../components/VoteButton"
import VoteScreen from "../../components/Vote/VoteScreen"
import { SafeAreaView } from "react-native-safe-area-context"
import db from "../../db/init"

const getActiveList = async () => {
  const snapshot = await db.ref("rooms/active/").once("value")
  /*
  var list = {"you": 100, "me": 75, "foo": 116, "bar": 15};
keysSorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]})
console.log(keysSorted);     // bar,me,you,foo
*/
  //return a list of active rooms with all the data
  return "hi"

}


const Vote = () => {
  const [roomlist, setList] = useState(null);
  useEffect(() => {
    const getRooms = async () => {
      const activeLst = await getActiveList()
      setList(activeLst)
    }
    getRooms()
  }, [])

  /// for each room on roomlist, check if user is already on the voted list,
  // if not then go through creating VoteScreens passing down the roomID
  //once done prob have "voted on all" or something screen
  return (
    <VoteScreen roomID="room1" />
  )
}

export default Vote
