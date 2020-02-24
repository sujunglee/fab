import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import VoteScreen from "../../components/Vote/VoteScreen"
import { SafeAreaView } from "react-native-safe-area-context"
import db from "../../db/init"
import { getUserBadge } from "../../db/userBadge"
import { StyledText } from "../../components/StyledText"

const getTotalNumVoters = (room) => {
  const optAInfluencers = Object.keys(room.optionA.voters_influencer).length;
  const optANormal = Object.keys(room.optionA.voters_normal).length;
  const optBInfluencers = Object.keys(room.optionB.voters_influencer).length;
  const optBNormal = Object.keys(room.optionB.voters_normal).length;

  return optAInfluencers + optANormal + optBInfluencers + optBNormal;
}

const getActiveList = async () => {
  const snapshot = await db.ref("rooms/active/").once("value")
  let activeRooms = [];

  for (var roomID of Object.keys(snapshot.val())) {
    console.log("ROOM ID:", roomID);
    getTotalNumVoters(snapshot.val()[roomID])
    const currRoom = {numVotes: getTotalNumVoters(snapshot.val()[roomID]), id: roomID, room: snapshot.val()[roomID]}
    console.log("CURRENT ROOM: ", currRoom);

  }



  return snapshot.val()

}

const Vote = ({ navigation }) => {
  const userID = "jbrain98";
  const [roomlist, setList] = useState(null);
  const [badge, setBadge] = useState(null);
  useEffect(() => {
    const getRooms = async () => {
      const activeLst = await getActiveList()
      setList(activeLst)
    }
    getRooms()
  }, [])

  useEffect(() => {
    const getBadge = async () => {
      const dbbadge = await getUserBadge({ userID: userID })
      setBadge(dbbadge)
    }
    getBadge()
  }, [])


  /// for each room on roomlist, check if user is already on the voted list or is the owner of the post,
  // if not then go through creating VoteScreens passing down the roomID
  //once done prob have "voted on all" or something screen

  const roomID = "room1"
  return badge ? ( <VoteScreen navigation = { navigation } userID = { userID } badge = { badge } roomID = { roomID }/>
  ) : ( <
    StyledText > Loading... < /StyledText>
  )
}

export default Vote
