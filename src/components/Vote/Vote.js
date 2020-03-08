import React, { useEffect, useState, useContext } from "react"
import { View, StyleSheet, Platform } from "react-native"
import VoteScreen from "./VoteScreen"
import { SafeAreaView } from "react-native-safe-area-context"
import fb from "../../db/init"
import { getUserBadge } from "../../db/userBadge"
import closeRoom from "../../db/closeRoom"
import { StyledText } from "../StyledText"
import { colors } from "../../constants/styles"
import { getNumberOfVoters } from "../../db/Utility"
import moment from "moment"
import Swiper from 'react-native-deck-swiper';
import Constants from 'expo-constants';
import { VoteContext } from "./VoteContext/VoteContext";
import Loader from "../FancyLoader/FancyLoader";
const db = fb.database();


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
};


const getActiveList = async () => {
  const snapshot = await db.ref("rooms/active/").once("value");
  let activeRooms = [];

  for (var roomID of Object.keys(snapshot.val())) {
    if (roomStillActive({ roomID: roomID, room: snapshot.val()[roomID] })) {
      getTotalNumVoters(snapshot.val()[roomID]);

      if (snapshot.val()[roomID]["meta_data"]["owner"] !== Constants.installationId &&
        noPreviousVote({ room: snapshot.val()[roomID], userID: Constants.installationId })) {
        const currRoom = {
          numVotes: getTotalNumVoters(snapshot.val()[roomID]),
          id: roomID
        };
        activeRooms.push(currRoom)
      }
    }
  }

  activeRooms.sort((a, b) => (a.numVotes > b.numVotes ? 1 : -1))

  return activeRooms
};

const Vote = ({ navigation }) => {
  const userID = Constants.installationId;
  //const [roomlist, setRoomList] = useState(null)
  const [badge, setBadge] = useState(null);
  const [hasSwipedAll, setHasSwipedAll] = useState(false);
  //const [currentRoom, setCurrentRoom] = useState(0)
  const { roomlist, setRoomList, currentRoom, setCurrentRoom, swiper } = useContext(VoteContext);

  useEffect(() => {
    const getRooms = async () => {
      const activeList = await getActiveList();
      setRoomList(activeList);
      setCurrentRoom(0)
    };
    getRooms()
  }, []);

  useEffect(() => {
    const getBadge = async () => {
      const dbbadge = await getUserBadge({ userID: userID })
      setBadge(dbbadge)
    };
    getBadge()
  }, []);

  const handleNextRoom = () => {
    setCurrentRoom(currentRoom + 1)
  };

  const getNewRooms = async () => {
    const activeList = await getActiveList();
    console.log(activeList)
    if (activeList.length !== 0) {
      setRoomList(activeList)
      setCurrentRoom(0)
      setHasSwipedAll(false)
    }
    else {
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
              There are no more posts to vote on!
          </StyledText>
          </View>
        </SafeAreaView>
      )
    }
  }

  /*
  currently loading
  */
  if (!roomlist || !badge) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Loader visible={true} />
    </View>
  }



  /*
  no more rooms 
  */
  if (hasSwipedAll) {
    getNewRooms()
    return <StyledText>loading</StyledText>
  }


  return (
    <View style={styles.container}>
      <Swiper
        cards={roomlist}
        renderCard={(card) => { return <VoteScreen roomInfo={card} /> }}
        onSwiped={(cardIndex) => { setCurrentRoom(cardIndex) }}
        onSwipedAll={() => { setHasSwipedAll(true) }}
        cardIndex={currentRoom}
        backgroundColor={colors.general.white}
        stackSize={3}
        ref={swiper}
        useViewOverflow={Platform.OS === 'ios'}
      >
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
    borderRadius: 2,
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
