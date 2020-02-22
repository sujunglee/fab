import React from "react"
import Chart from "../../components/Chart"
import db from "../../db/init"
// import { CountDown } from "./countdown/CountDown"
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { PieChart } from "react-native-svg-charts"
import { Col, Row, Grid } from "react-native-easy-grid"

var { height, width } = Dimensions.get("window")
console.log(
  "Dimensions of current window: ",
  height,
  " height and ",
  width,
  "width"
)

const data1 = [
  {
    key: 3,
    amount: 50,
    svg: { fill: "#1563af" }
  },
  {
    key: 2,
    amount: 15,
    svg: { fill: "#dd8300" }
  },
  {
    key: 1,
    amount: 35,
    svg: { fill: "#f4f4f4" }
  }
]

const data2 = [
  {
    key: 3,
    amount: 35,
    svg: { fill: "#1563af" }
  },
  {
    key: 1,
    amount: 65,
    svg: { fill: "#f4f4f4" }
  }
]

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

const getVoteData = async () => {
  let snapshot = await db.ref("rooms/active/room1").once("value")
  console.log("SNAPSHOT: ", snapshot.val())

  let numInfluencersA = Object.keys(snapshot.val().optionA.voters_influencer)
    .length
  let numNormalA = Object.keys(snapshot.val().optionA.voters_normal).length

  let numInfluencersB = Object.keys(snapshot.val().optionB.voters_influencer)
    .length
  let numNormalB = Object.keys(snapshot.val().optionB.voters_normal).length

  let scoreA = votes.numNormalA + votes.numInfluencersA
  let scoreB = votes.numNormalB + votes.numInfluencersB

  let results = {
    numInfluencersA: numInfluencersA * 2,
    numNormalA: numNormalA,
    numInfluencersB: numInfluencersB * 2,
    numNormalB: numNormalB,
    scoreA: scoreA,
    scoreB: scoreB
  }

  // console.log("THE SCORES!!!: ", results);
  // return results
}

const isFinished = () => {
  console.log("Finished!")
}

const createGraphs = async () => {
  let scores = await getVoteData()
}

const Results = () => {
  const a_src = require("../../assets/image_A.jpg")
  const b_src = require("../../assets/image_B.jpg")
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ padding: 25 }}>
          <Text style={{ fontSize: 20, fontFamily: "source-sans-pro-bold" }}>
            Which cardigan should I wear for a big presentation today?
          </Text>
        </View>
        <Grid>
          <Col style={{ alignItems: "center" }}>
            <Image source={a_src} style={{ width: 150, height: 200 }} />
            <Text style={{ fontFamily: "source-sans-pro-regular" }}>
              Option A
            </Text>
            <PieChart
              style={{ height: 200 }}
              valueAccessor={({ item }) => item.amount}
              data={data1}
              spacing={0}
              outerRadius={"95%"}
            ></PieChart>
          </Col>
          <Col style={{ alignItems: "center" }}>
            <Image source={b_src} style={{ width: 150, height: 200 }} />
            <Text style={{ fontFamily: "source-sans-pro-regular" }}>
              Option B
            </Text>
            <PieChart
              style={{ height: 200 }}
              valueAccessor={({ item }) => item.amount}
              data={data2}
              spacing={0}
              outerRadius={"95%"}
            ></PieChart>
          </Col>
        </Grid>
      </SafeAreaView>
    </ScrollView>
  )
}

export default Results
