import React, { useState, useEffect, useContext } from "react"
import { View, Text, Image, ScrollView, Modal, Dimensions } from "react-native"
import { VoteButton, SkipButton } from "./VoteButton"
import { SafeAreaView, useSafeArea } from "react-native-safe-area-context"
import ImageViewer from "react-native-image-zoom-viewer"
import { StyledText } from "../StyledText"
import { useNavigation } from "@react-navigation/native"
import updateVotes from "../../db/updateVotes"
import {colors, normalize, sizes} from "../../constants/styles"
import { PieChart } from "react-native-svg-charts"
import Labels from "../../components/Labels"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import {AppContext} from "../../context/AppContext";
import CountDown from "../countdown/CountDown";
import moment from "moment";


// TODO: Reorganize these functions in a separate helper file
const createChartData = ({
  influencer,
  normal,
  competitor,
  totalNumVoters
}) => {
  const data = [
    {
      key: 3,
      amount: normal,
      svg: { fill: "#1563af" },
      totalNumVoters: totalNumVoters
    },
    {
      key: 2,
      amount: influencer,
      svg: { fill: "#dd8300" },
      totalNumVoters: totalNumVoters
    },
    {
      key: 1,
      amount: competitor,
      svg: { fill: "#D3D3D3" },
      totalNumVoters: totalNumVoters
    }
  ]
  return data
}

const VoteScreen = ({ roomData, userID, badge, handleNextRoom }) => {

  const [voteState, setVoteState] = useState({})
  const [isImageOpen, setIsImageOpen] = useState(false)
  const deviceWidth = Dimensions.get('window').width
  const [areImagesLoaded, setAreImagesLoaded] = useState({
    A: false,
    B: false
  })
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
    setTimeout(() => {
      handleNextRoom()
      setVoteState({})
      setAreImagesLoaded({ A: false, B: false })
    }, delay)
  }

  const handleSkip = () => {
    setAreImagesLoaded({ A: false, B: false })
    handleNextRoom()
  }

  return roomData ? (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          width: "100%"
        }}
      >
        {isImageOpen.state && (
          <Modal visible={isImageOpen.state}>
            <ImageViewer
              enableImageZoom
              enableSwipeDown
              onSwipeDown={() => setIsImageOpen({ state: false })}
              imageUrls={[
                {
                  url: isImageOpen.url
                }
              ]}
            />
          </Modal>
        )}
        <View style={{ maxHeight: 150 }}>
          <StyledText type="bold" size={sizes.small.fontSize} style={{color:colors.text.primary.main}}>

            {roomData.room.meta_data.title}
          </StyledText>
        </View>

        <View style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <View
              style={{ alignItems: "center", flex: 1, marginRight:35 }}
            >
              <TouchableWithoutFeedback
                onPress={() =>
                  setIsImageOpen({
                    state: true,
                    url: roomData.room.optionA.picture
                  })
                }
              >
                <Image
                  source={{ uri: roomData.room.optionA.picture }}
                  style={{ width: 200, height: 300, aspectRatio:4/3, minWidth:200, maxWidth:200, minHeight:300, maxHeight:300 }}
                  onLoad={() =>
                    setAreImagesLoaded({ ...areImagesLoaded, A: true })
                  }
                  resizeMode="contain"
                />
              </TouchableWithoutFeedback>
              {voteState.selectedOption === "A" && <YourVote />}
            </View>
            <View
              style={{ alignItems: "center", flex: 1, marginHorizontal: 4 }}
            >
              <TouchableWithoutFeedback
                onPress={() =>
                  setIsImageOpen({
                    state: true,
                    url: roomData.room.optionB.picture
                  })
                }
              >
                <Image
                  source={{ uri: roomData.room.optionB.picture }}
                  style={{ width: 200, height: 300, position: "relative", aspectRatio:4/3, minWidth:200, maxWidth:200, minHeight:300, maxHeight:300}}
                  onLoad={() =>
                    setAreImagesLoaded({ ...areImagesLoaded, B: true })
                  }
                  resizeMode="contain"
                />
              </TouchableWithoutFeedback>
              {voteState.selectedOption === "B" && <YourVote />}
            </View>
          </View>
          {voteState.voteResults ? (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ alignItems: "center", textAlign: "center", justifyContent: "center", flex: 1 }}>
                <PieChart
                  style={{ width: 160, height: 160 }}
                  valueAccessor={({ item }) => item.amount}
                  data={createChartData({
                    influencer: voteState.voteResults.numInfluencersA,
                    normal: voteState.voteResults.numNormalA,
                    competitor: voteState.voteResults.scoreB,
                    totalNumVoters:
                      voteState.voteResults.numInfluencersA +
                      voteState.voteResults.numNormalA +
                      voteState.voteResults.scoreB
                  })}
                  outerRadius={"95%"}
                />
                <Text
                    style={{
                        position: 'absolute',
                        left: 70,
                        textAlign: 'center',
                        fontSize: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: "#dd8300"
                    }}
                >
                {((voteState.voteResults.scoreB / (voteState.voteResults.scoreA + voteState.voteResults.scoreB))*100).toFixed()}%
                </Text>
              </View>
              <View style={{ alignItems: "center", textAlign: "center", justifyContent: "center", flex: 1 }}>
                {/*TODO: Factor this out into a clean, separate Chart component*/}
                <PieChart
                  style={{ width: 160, height: 160 }}
                  valueAccessor={({ item }) => item.amount}
                  data={createChartData({
                    influencer: voteState.voteResults.numInfluencersB,
                    normal: voteState.voteResults.numNormalB,
                    competitor: voteState.voteResults.scoreA,
                    totalNumVoters:
                      voteState.voteResults.numInfluencersA +
                      voteState.voteResults.numNormalA +
                      voteState.voteResults.scoreB
                  })}
                  outerRadius={"95%"}
                />
                <Text
                    style={{
                        position: 'absolute',
                        left: 70,
                        textAlign: 'center',
                        fontSize: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: "#1563af"
                    }}
                >
                    {((voteState.voteResults.scoreA / (voteState.voteResults.scoreA + voteState.voteResults.scoreB))*100).toFixed()}%
                </Text>
              </View>
            </View>
          ) : areImagesLoaded.A && areImagesLoaded.B ? (
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
                  <VoteButton content="A" onPress={() => handlePress("A")} />
                </View>
                <View style={{ alignItems: "center" }}>

                  <StyledText  size={20} style={{ paddingTop: 5, color: colors.text.secondary.main }}>
                    Option B
                  </StyledText>
                  <VoteButton content="B" onPress={() => handlePress("B")} />
                </View>
              </View>
              <SkipButton onPress={handleSkip} style={{ marginTop: normalize(8), marginBottom:normalize(8) }} />
              <CountDown
                  finishTime={moment().add({'seconds': 30}).toISOString()}
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
}

const YourVote = () => (
  <View
    style={{
      backgroundColor: colors.secondary.main,
      width: "100%",
      alignItems: "center",
      paddingVertical: 8,
      marignTop: -8,
      position: "relative",
      top: -60
    }}
  >

    <StyledText size={sizes.medium.fontSize} type={'regular'} style={{ position: "relative", top: -8, color:colors.general.white}} >
      YOUR VOTE
    </StyledText>
  </View>
)
export default VoteScreen
