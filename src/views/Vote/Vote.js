import React, { useEffect, useState, useContext} from "react"
import { View, Text } from "react-native"
import VoteScreen from "../../components/Vote/VoteScreen"
import { SafeAreaView } from "react-native-safe-area-context"
import db from "../../db/init"
import { getUserBadge } from "../../db/userBadge"
import { StyledText } from "../../components/StyledText"
import { colors } from "../../constants/styles"
import {AppContext} from "../../context/AppContext";
import {CountDown} from "../../components/countdown/";

const getTotalNumVoters = room => {
  const optAInfluencers = Object.keys(room.optionA.voters_influencer).length
  const optANormal = Object.keys(room.optionA.voters_normal).length
  const optBInfluencers = Object.keys(room.optionB.voters_influencer).length
  const optBNormal = Object.keys(room.optionB.voters_normal).length

  return optAInfluencers + optANormal + optBInfluencers + optBNormal
}

const getActiveList = async () => {
  const snapshot = await db.ref("rooms/active/").once("value")
  let activeRooms = []

  for (var roomID of Object.keys(snapshot.val())) {
    getTotalNumVoters(snapshot.val()[roomID])
    const currRoom = {
      numVotes: getTotalNumVoters(snapshot.val()[roomID]),
      id: roomID,
      room: snapshot.val()[roomID]
    }
    activeRooms.push(currRoom)
  }

  activeRooms.sort((a, b) => (a.numVotes > b.numVotes ? 1 : -1))

  return activeRooms
}

const Vote = ({ navigation }) => {
  const userID = "jbrain98"
  const [roomlist, setRoomList] = useState(null)
  const [badge, setBadge] = useState(null)

  const [currentRoom, setCurrentRoom] = useState(0)
  useEffect(() => {
    const getRooms = async () => {
      const activeList = await getActiveList()
      setRoomList(activeList)
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

  const handleNextRoom = () => {
    setCurrentRoom(currentRoom + 1)
  }

  /// for each room on roomlist, check if user is already on the voted list or is the owner of the post,
  // if not then go through creating VoteScreens passing down the roomID
  //once done prob have "voted on all" or something screen
  /*{
    "id": "room3",
    "numVotes": 13,
    "room": Object {
      "meta_data": Object {
        "owner": "jbrain98",
        "time_created": "2020-02-24T00:22:20Z",
        "title": "What watch is best for a first date?",
      },
      "optionA": Object {
        "picture": "https://i.imgur.com/FQdEIKS.jpg",
        "voters_influencer": Object {
          "suzy": 1,
        },
        "voters_normal": Object {
          "santa": 1,
        },
      },
      "optionB": Object {
        "picture": "https://i.imgur.com/7jZFeXM.jpg",
        "voters_influencer": Object {
          "zack": 1,
        },
        "voters_normal": Object {
          "a": 1,
          "b": 1,
          "c": 1,
          "d": 1,
          "e": 1,
          "f": 1,
          "g": 1,
          "h": 1,
          "i": 1,
          "suzy": 1,
        },
      },
    },
  }*/

  const roomID = "room1"
  console.log(roomID)

  /*
  currently loading
  */
  if (!roomlist || !badge) {
    return <StyledText>Loading...</StyledText>
  }

  /*
  no more rooms 
  */
  if (currentRoom >= roomlist.length) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          margin: 16
        }}
      >
        <View
          style={{ backgroundColor: colors.general.white, padding: 32, borderRadius: 20 }}
        >
          <StyledText
            type="semibold"
            size={32}
            style={{ color: colors.primary.main }}
          >
            There's no more posts to vote on!
          </StyledText>
        </View>
      </SafeAreaView>
    )
  }

  return (
        <VoteScreen
          roomData={roomlist[currentRoom]}
          userID={userID}
          badge={badge}
          handleNextRoom={handleNextRoom}
      />
  )
};

export default Vote
