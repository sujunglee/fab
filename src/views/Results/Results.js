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
import {RoomImages} from "../../components/RoomImages";
import {VotingChart} from "../../components/VotingChart";

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
    justifyContent: 'center',
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
  photo_option: {
    width: '48.5%',
    height: '100%',
    borderColor: '#A9A9A9',
    borderWidth: 0.5,
    backgroundColor: '#E8E8E8',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  sub_container: {
      width: '100%',
      height: '100%',
      justifyContent: 'space-around',
      flexDirection: 'row'
  },
  text_container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 30
  },
  title: {
      color:"#1563af",
      fontSize: sizes.large.fontSize,
  },
  content: {
      color: "#1563af",
      fontSize: sizes.large.fontSize,
  },
  countdown_container: {
    paddingTop: 10
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
  const totalNumVoters = roomData.scoreA + roomData.scoreB
  //console.log(roomData)

  if (totalNumVoters === 0 ) {
    //console.log("NOBODY VOTED YET!!!");
  }

  return scores ? (

      <View style={styles.container}>
        <View style={styles.title_container}>
          <RoomTitle title={roomData.title}/>
        </View>

        <View style={styles.photo_container}>
          <View style={styles.sub_container}>
            <View style={styles.photo_option}>
                <Image
                    source={{uri: roomData.pictureA}}
                    style={styles.image}
                />
            </View>
            <View style={styles.photo_option}>

                <Image
                    source={{uri: roomData.pictureB}}
                    style={styles.image}
                />
            </View>
          </View>
        </View>
        {(totalNumVoters !== 0) ? (
          <View>
            <VotingChart  voteResults={roomData}/>
          </View>
          ) : (
            <View style={styles.text_container}>
                <StyledText style={styles.title}>No votes yet.</StyledText>
                <StyledText style={styles.content}>Check back soon.</StyledText>
            </View>
          )
        }
        <View style={styles.countdown_container}>
          <CountDown startTime={roomData.timeCreated}  isFinished={() => console.log("Finished!")} />
        </View>
      </View>
  ) : (
    <Text>Loading...</Text>
  )
}

export default Results
