import React, { useEffect, useState } from "react"
import Chart from "./Chart"
import db from "../db/init"
// import { CountDown } from "./countdown/CountDown"
import { Image, View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const createChartData = ({ influencer, normal, competitor }) => {
  console.log("comp score", competitor)
  const data = [
    {
      key: 3,
      amount: normal,
      svg: { fill: "#1563af" }
    },
    {
      key: 2,
      amount: influencer,
      svg: { fill: "#dd8300" }
    },
    {
      key: 1,
      amount: competitor,
      svg: { fill: "#f4f4f4" }
    }
  ]
  console.log("chart data", data)
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

const getVoteData = async () => {
  let snapshot = await db.ref("rooms/active/room1").once("value")
  console.log("SNAPSHOT: ", snapshot.val())

  let numInfluencersA = Object.keys(snapshot.val().optionA.voters_influencer)
    .length
  let numNormalA = Object.keys(snapshot.val().optionA.voters_normal).length

  let numInfluencersB = Object.keys(snapshot.val().optionB.voters_influencer)
    .length
  let numNormalB = Object.keys(snapshot.val().optionB.voters_normal).length

  let scoreA = numNormalA + numInfluencersA
  let scoreB = numNormalB + numInfluencersB

  let results = {
    numInfluencersA: numInfluencersA * 2,
    numNormalA: numNormalA,
    numInfluencersB: numInfluencersB * 2,
    numNormalB: numNormalB,
    scoreA: scoreA,
    scoreB: scoreB
  }

  // console.log("THE SCORES!!!: ", results);
  return results
}

const isFinished = () => {
  console.log("Finished!")
}

const Results = () => {
  const [scores, setVotes] = useState(null)

  useEffect(() => {
    const getVotes = async () => {
      const v = await getVoteData()
      setVotes(v)
    }
    getVotes()
  }, [])

  const a_src = require("../assets/image_A.jpg")
  const b_src = require("../assets/image_B.jpg")
  return scores ? (
    <View>
      <View style={{ padding: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Which cardigan should I wear for a big presentation today?
        </Text>
      </View>
      <View>
        <View style={styles.container}>
          <View style={styles.item}>
            <View>
              <Image source={a_src} style={{ width: 150, height: 200 }} />
              <Text>Option A</Text>
              <Chart
                data={createChartData({
                  influencer: scores.numInfluencersA,
                  normal: scores.numNormalA,
                  competitor: scores.scoreB
                })}
              />
            </View>
          </View>
          <View style={styles.item}>
            <View>
              <Image source={b_src} style={{ width: 150, height: 200 }} />
              <Text>Option B</Text>
              <Chart
                data={createChartData({
                  influencer: scores.numInfluencersB,
                  normal: scores.numNormalB,
                  competitor: scores.scoreA
                })}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <Text>Loading...</Text>
  )
}

export default Results
