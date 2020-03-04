import React, { useState, useRef, useEffect, useLayoutEffect } from "react"
import { View, Text, Dimensions, StyleSheet } from "react-native"
import { VoteButton, SkipButton } from "./VoteButton"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyledText } from "../StyledText"
import updateVotes from "../../db/updateVotes"
import { colors, normalize, sizes } from "../../constants/styles"
import CountDown from "../countdown/CountDown"
import moment from "moment"
import { VotingChart } from "../VotingChart"
import { RoomImages } from "../RoomImages"
import { RoomTitle } from "../RoomTitle"
import Loader from "../FancyLoader/FancyLoader"

/*
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
*/

const VoteScreen = ({ roomData, userID, badge, handleNextRoom }) => {
  const [voteState, setVoteState] = useState({})
  const deviceWidth = Dimensions.get("window").width
  const [areImagesLoaded, setAreImagesLoaded] = useState(false)
  const [imageViewport, setImageViewport] = useState({})


  useEffect(() => {
    console.log(imageViewport)
  }, [imageViewport])

  const handlePress = async selection => {
    const roomID = roomData.id
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
    // setTimeout(() => {
    //   handleNextRoom()
    //   setVoteState({})
    //   setAreImagesLoaded(false)
    // }, delay)
  }

  const handleSkip = () => {
    setAreImagesLoaded(false)
    handleNextRoom()
  }

  const imageLoadCallback = () => {
    setAreImagesLoaded(true)
  }


  return roomData ? (
    <SafeAreaView>
      <View style={styles.container}>
        {/*
        black screen overlay and vote results over images
        */}

        {/*Room Title*/}
        <View style={styles.title_container}>
          <RoomTitle title={roomData.room.meta_data.title} />
        </View>
        {/*Room Images*/}

        <View style={styles.photo_container}>
          <RoomImages
            roomData={roomData}
            selectedOption={voteState.selectedOption}
            imageLoadCallback={imageLoadCallback}
            setImageViewport={setImageViewport}
          />
        </View>

        {voteState.voteResults && (
          <>
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "rgba(0, 0, 0, 0.7)"
              }}
            />
            {voteState.voteResults.scoreA === 0 &&
              voteState.voteResults.scoreB === 0 && (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    bottom: imageViewport.height / 2 + 10
                  }}
                >
                  <StyledText type="bold" style={{ color: "white" }}>
                    You've made the first vote.
                  </StyledText>
                  <StyledText style={{ color: "white" }}>
                    So far you are 100%!
                  </StyledText>
                </View>
              )}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <VotePercents
                score="A"
                voteResults={voteState.voteResults}
                imageViewport={imageViewport}
              />
              <VotePercents
                score="B "
                voteResults={voteState.voteResults}
                imageViewport={imageViewport}
              />
            </View>
            <YourVote selectedOption={voteState.selectedOption} />
          </>
        )}

        <View style={{ width: "100%", height: "48%" }}>
          {voteState.voteResults ? (
            <VotingChart voteResults={voteState.voteResults} />
          ) : areImagesLoaded ? (
            <View style={styles.buttons_and_timer_container}>
              <View style={styles.buttons_container}>
                <View style={styles.options_container_text}>
                  <StyledText size={normalize(18)} style={styles.option_text}>
                    Option A
                  </StyledText>
                  <VoteButton
                    content="A"
                    onPress={() => handlePress("optionA")}
                  />
                </View>

                <View style={styles.options_container_text}>
                  <StyledText size={normalize(18)} style={styles.option_text}>
                    Option B
                  </StyledText>
                  <VoteButton
                    content="B"
                    onPress={() => handlePress("optionB")}
                  />
                </View>
              </View>

              <SkipButton onPress={handleSkip} style={styles.skip_button} />
              <CountDown
                  startTime={roomData.room.meta_data.time_created}
                isFinished={() => console.log("Finished!")}
              />
            </View>
          ) : (
            <View style={styles.loading_container}>
              <Loader />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <Loader visible={true} />
  )
};

const VotePercents = ({ score, voteResults, imageViewport }) => {
  const textStyles = {
    color: "white",
    bottom: imageViewport.height / 2 + 20,
    fontSize: 48
  }
  return score === "A" ? (
    <StyledText style={{ ...textStyles, right: imageViewport.width / 8 }}>{`${(
      (voteResults.scoreA / (voteResults.scoreA + voteResults.scoreB)) *
      100
    )
      .toFixed()
      .toString()}%`}</StyledText>
  ) : (
    <StyledText style={{ ...textStyles, left: imageViewport.width / 6 }}>{`${(
      (voteResults.scoreB / (voteResults.scoreA + voteResults.scoreB)) *
      100
    )
      .toFixed()
      .toString()}%`}</StyledText>
  )
}

const YourVote = ({ selectedOption }) => {
  const [height, setHeight] = useState(null)

  useEffect(() => console.log("hegiht", height), [height])

  return (
    <View
      onLayout={e => setHeight(e.nativeEvent.layout.height)}
      style={{
        backgroundColor: colors.secondary.main,
        width: "48.5%",
        left: selectedOption === "optionB" ? "51%" : "1%",
        top: height ? -height : 0,
        alignItems: "center",
        paddingVertical: 8
      }}
    >
      <StyledText
        size={sizes.medium.fontSize}
        type={"regular"}
        style={{ color: colors.general.white }}
      >
        YOUR VOTE
      </StyledText>
    </View>
  )
}

{
  /*<Loader />*/
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  photo_container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "40%"
  },

  buttons_and_timer_container: {
    alignItems: "center",
    flexDirection: "column"
  },
  buttons_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%"
  },
  title_container: {
    height: "12%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  loading_container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  options_container_text: {
    alignItems: "center"
  },
  option_text: {
    paddingTop: 5,
    color: colors.text.secondary.main
  },
  skip_button: {
    marginTop: normalize(8),
    marginBottom: normalize(8)
  }
})

export default VoteScreen
