import React, { useEffect, useState, useContext } from "react"
import { View, Text,StyleSheet } from "react-native"
import VoteScreen from "../../components/Vote/VoteScreen"
import { SafeAreaView } from "react-native-safe-area-context"
import fb from "../../db/init"
import { getUserBadge } from "../../db/userBadge"
import closeRoom from "../../db/closeRoom"
import { StyledText } from "../../components/StyledText"
import { colors } from "../../constants/styles"
import { getNumberOfVoters } from "../../db/Utility"
import { AppContext } from "../../context/AppContext"
import { CountDown } from "../../components/countdown/"
import moment from "moment"
import Swiper from 'react-native-deck-swiper';
import Constants from 'expo-constants';
import Button from "react-native-paper/src/components/Button";
const db = fb.database()


const getTotalNumVoters = room => {
  const {
    numInfluencersA,
    numNormalA,
    numInfluencersB,
    numNormalB
  } = getNumberOfVoters(room)
  return numInfluencersA + numNormalA + numInfluencersB + numNormalB
}


const noPreviousVote = ({ room, userID }) => {
  if (("voters_normal" in room["optionA"]) && (userID in room["optionA"]["voters_normal"])) {
    return false;
  }
  if (("voters_influencer" in room["optionA"]) && (userID in room["optionA"]["voters_influencer"])) {
    return false;
  }
  if (("voters_normal" in room["optionB"]) && (userID in room["optionB"]["voters_normal"])) {
    return false;
  }
  if (("voters_influencer" in room["optionB"]) && (userID in room["optionB"]["voters_influencer"])) {
    return false;
  }
  return true;
}

const roomStillActive = ({ room, roomID }) => {
  if (moment(room["meta_data"]["time_created"]).isBefore(moment().subtract(1, 'days'))) {
    closeRoom({ roomID: roomID });
    return false;
  }
  return true;
}

const getActiveList = async () => {
  const snapshot = await db.ref("rooms/active/").once("value")
  let activeRooms = []

  for (var roomID of Object.keys(snapshot.val())) {
    if (roomStillActive({roomID:roomID, room: snapshot.val()[roomID]})) {
      getTotalNumVoters(snapshot.val()[roomID])

      if (snapshot.val()[roomID]["meta_data"]["owner"] !== Constants.installationId &&
        noPreviousVote({ room: snapshot.val()[roomID], userID: Constants.installationId })) {
        const currRoom = {
          numVotes: getTotalNumVoters(snapshot.val()[roomID]),
          id: roomID,
          room: snapshot.val()[roomID]
        }
        activeRooms.push(currRoom)
      }
    }
  }

  activeRooms.sort((a, b) => (a.numVotes > b.numVotes ? 1 : -1))

  return activeRooms
}

const Vote = ({ navigation }) => {
  const userID = Constants.installationId
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
  //console.log(roomID)

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
          style={{
            backgroundColor: colors.general.white,
            padding: 32,
            borderRadius: 20
          }}
        >
          <StyledText
            type="semibold"
            size={32}
            style={{ color: colors.primary.main, textAlign: "center" }}
          >
            There's no more posts to vote on!
          </StyledText>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
        <Swiper
            cards={roomlist}
            renderCard={(card)=>{return <VoteScreen roomData={card}/>}}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {console.log('onSwipedAll')}}
            cardIndex={0}
            backgroundColor={colors.general.white}
            stackSize= {3}>
        </Swiper>
    </View>


  )
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});


export default Vote
