import React, { useEffect, useState } from "react"
import getVoteData from "../../db/getVoteData"
import { Image, View, Text, StyleSheet, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { PieChart } from "react-native-svg-charts"
import Labels from "../../components/Labels"
import CountDown from "../../components/countdown/CountDown"
import { StyledText } from "../../components/StyledText"

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
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start" // if you want to fill rows left to right
  },
  item: {
    width: "50%", // is 50% of container width
    flexDirection: "column",
    alignItems: "center"
  }
})

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
  return scores ? (
    <SafeAreaView>
      <View>
        <View style={{ padding: 25, height: 150 }}>
          <StyledText type="bold" size={23}>
            {roomData.title}
          </StyledText>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={{ uri: roomData.pictureA }}
                style={{ width: 150, height: 200 }}
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <StyledText type="bold" size={20} style={{ paddingTop: 10 }}>
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
                style={{ width: 150, height: 200 }}
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <StyledText type="bold" size={20} style={{ paddingTop: 10 }}>
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
