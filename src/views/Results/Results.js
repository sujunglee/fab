import React, { useEffect, useState } from "react"
import getVoteData from "../../db/getVoteData"
import { Image, View, Text, StyleSheet, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { PieChart } from "react-native-svg-charts"
import Labels from "../../components/Labels"
import CountDown from "../../components/countdown/CountDown"
import { StyledText } from "../../components/StyledText"
import {colors, normalize, sizes} from "../../constants/styles"
import {RoomTitle} from "../../components/RoomTitle";

export const createChartData = ({
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
      svg: { fill: "#f4f4f4" },
      totalNumVoters: totalNumVoters
    }
  ]
  return data
}

const styles = StyleSheet.create({
  container:{
    flexDirection: "column",
    width: "100%",
    height: '100%'
  },
  photo_container:{
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      height: '40%',
    },

  buttons_and_timer_container:{
    alignItems: "center",
    flexDirection: "column",
  },
  buttons_container:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: '80%'
  },
  title_container:{
    height:'12%',
    width:'100%',
    alignItems:'center',
    justifyContent: 'center'
  },
  loading_container:{
    alignItems: "center",
    justifyContent: 'center',
    width: "100%" ,
    height: '100%',

  },
  options_container_text:{
    alignItems: "center"
  },
  option_text:{
    paddingTop: 5,
    color: colors.text.secondary.main
  },
  skip_button:{
    marginTop: normalize(8),
    marginBottom:normalize(8)
  }
});

const Results = ({ route }) => {
  const [scores, setScore] = useState(null)

  useEffect(() => {
    const { roomID } = route.params
    const getScore = async () => {
      const v = await getVoteData({ roomID })
      setScore(v)
    }
    getScore()
  }, [])

  const deviceWidth = Dimensions.get("window").width
  const { roomData } = route.params
  console.log("THE ROOM DATA TITLE: ", roomData.title);
  return scores && (roomData.title !== undefined) ? (
    <SafeAreaView>
      <View style={styles.container}>
      <View style={styles.title_container}>
        <RoomTitle title={roomData.title}/>
      </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={{ uri: roomData.pictureA }}

                style={{ width: 140, height: 200 }}
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <StyledText type="bold" size={20} style={{ paddingTop: 5 }}>
                Option A
              </StyledText>
            </View>
            <PieChart
              style={{ height: 200 }}
              valueAccessor={({ item }) => item.amount}
              data={createChartData({
                influencer: scores.numInfluencersA,
                normal: scores.numNormalA,
                competitor: scores.scoreB,
                totalNumVoters:
                  scores.numInfluencersA + scores.numNormalA + scores.scoreB
              })}
              spacing={0}
              outerRadius={"95%"}
            >
              <Labels />
            </PieChart>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={{ uri: roomData.pictureB }}

                style={{ width: 140, height: 200, }}
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <StyledText type="bold" size={20} style={{ paddingTop: 5 }}>
                Option B
              </StyledText>
            </View>
            <PieChart
              style={{ height: 200 }}
              valueAccessor={({ item }) => item.amount}
              data={createChartData({
                influencer: scores.numInfluencersB,
                normal: scores.numNormalB,
                competitor: scores.scoreA,
                totalNumVoters:
                  scores.numInfluencersA + scores.numNormalA + scores.scoreB
              })}
              spacing={0}
              outerRadius={"95%"}
              innerRadius={"45%"}
            >
              <Labels />
            </PieChart>
          </View>
        </View>
        <CountDown isFinished={() => console.log("Finished!")} />
      </View>
    </SafeAreaView>
  ) : (
    <Text>Loading...</Text>
  )
}

export default Results
