import React, { useEffect, useState, useContext } from "react"
import { View,StyleSheet,Platform } from "react-native"
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
import {VoteContext} from "./VoteContext/VoteContext";
import Loader from "../FancyLoader/FancyLoader";
const db = fb.database();


const Vote = () => {
  const [hasSwipedAll, setHasSwipedAll] = useState(false);
  const {roomlist,setRoomList,currentRoom,setCurrentRoom,swiper} = useContext(VoteContext);


  /*
  currently loading
  */
  if (!roomlist) {
    return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Loader visible={true} />
          </View>
  }

  /*
  no more rooms 
  */
  if (hasSwipedAll) {
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


  return (
    <View style={styles.container}>
        <Swiper
            cards={roomlist}
            renderCard={(card)=>{return <VoteScreen roomInfo={card}/>}}
            onSwiped={(cardIndex) => {setCurrentRoom(cardIndex)}}
            onSwipedAll={() => {setHasSwipedAll(true)}}
            cardIndex={currentRoom}
            backgroundColor={colors.general.white}
            stackSize= {3}
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
