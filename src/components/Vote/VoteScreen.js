import React, { useState } from "react"
import { View, Text, Dimensions, StyleSheet} from "react-native"
import { VoteButton, SkipButton } from "./VoteButton"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyledText } from "../StyledText"
import updateVotes from "../../db/updateVotes"
import {colors, normalize, sizes} from "../../constants/styles"
import CountDown from "../countdown/CountDown";
import moment from "moment";
import {VotingChart} from "../VotingChart";
import {RoomImages} from "../RoomImages";
import {RoomTitle} from "../RoomTitle";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}


const VoteScreen = ({ roomData, userID, badge, handleNextRoom }) => {

  const [voteState, setVoteState] = useState({});
  const deviceWidth = Dimensions.get('window').width;
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);

  const handlePress = async selection => {
    const roomID = roomData.id;
    const voteResults = await updateVotes({
      roomID: roomID,
      selection: selection,
      userID: userID,
      badge: badge
    })
    setVoteState({
      ...voteState,
      selectedOption: selection,
      voteResults
    })


    /*
        Janky settimeout to show results for 1.5 seconds
    */

    const delay = 3000
    setTimeout(() => {
      handleNextRoom()
      setVoteState({})
      setAreImagesLoaded(false);
    }, delay)
  }

  const handleSkip = () => {
  setAreImagesLoaded(false);
    handleNextRoom()
  }

  const imageLoadCallback = () =>{
    setAreImagesLoaded(true);
  };

  return roomData ? (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "column",
          width: "100%"
        }}
      >

        <RoomTitle title={roomData.room.meta_data.title}/>

        <View styles={styles.photo_container}>
          <RoomImages roomData={roomData} selectedOption={voteState.selectedOption} imageLoadCallback={imageLoadCallback}/>
        </View>

          <View style={{ width: "100%" }}>
          {voteState.voteResults ? (
          <VotingChart  voteResults={voteState.voteResults}/>
          ) : areImagesLoaded ? (
            <View style={{ alignItems: "center", flexDirection: "column" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  paddingHorizontal: 42,
                  justifyContent: "space-between"
                }}
              >
                <View style={{ alignItems: "center" }}>

                  <StyledText size={20} style={{ paddingTop: 5, color: colors.text.secondary.main}}>

                    Option A
                  </StyledText>
                  <VoteButton content="A" onPress={() => handlePress("optionA")} />
                </View>
                <View style={{ alignItems: "center" }}>

                  <StyledText  size={20} style={{ paddingTop: 5, color: colors.text.secondary.main }}>
                    Option B
                  </StyledText>
                  <VoteButton content="B" onPress={() => handlePress("optionB")} />
                </View>
              </View>
              <SkipButton onPress={handleSkip} style={{ marginTop: normalize(8), marginBottom:normalize(8) }} />
              <CountDown
                  finishTime={moment().add({'seconds': getRndInteger(3600/4, 86399)}).toISOString()}
                  isFinished={()=>console.log('Finished!')}
              />
            </View>
          ) : (
            <View style={{ alignItems: "center", width: "100%" }}>
              <StyledText type="bold">Loading...</StyledText>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <Text>Loading...</Text>
  )
};

const styles = StyleSheet.create({
    photo_container:{
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'

    }
});




export default VoteScreen
