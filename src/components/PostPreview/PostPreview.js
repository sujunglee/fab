import React, { useEffect, useState } from "react"
import { View, TouchableHighlight, Text, StyleSheet, Image, Dimensions } from "react-native"
import moment from "moment"
import { screens } from "../../Navigation/constants"
import getMyPostData from "../../db/getMyPostData"
import { useNavigation } from "@react-navigation/native"
import { StyledText } from "../StyledText"
import {RoomTitle} from "../RoomTitle";
import { Ionicons } from '@expo/vector-icons';
// import CountDown from "../../components/countdown/CountDown"
import CountDown from 'react-native-countdown-component';

const winnerPicture = ({postData}) =>{
  return (postData.scoreA >= postData.scoreB) ? postData.pictureA : postData.pictureB;
}


const PostPreview = ({ roomID, userInfo }) => {
  const navigation = useNavigation()
  const [postData, setPostData] = useState({})
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [hoursLeft, setHoursLeft] = useState(0)
  const [minsLeft, setMinsLeft] = useState(0)

  useEffect(() => {
    const getPostData = async () => {
      const data = await getMyPostData({ roomID })
      const createdAt = moment(data.timeCreated).format("dddd h:mm A")
      setPostData({
        ...data,
        createdAt: createdAt
      })


    }

    getPostData()

    let difference = 0

    const calculateTime = () => {
      console.log("POST TITLE: ", postData.title)
      console.log("POST DATA CREATED: ", postData.timeCreated)
      const postCreatedAt = postData.timeCreated
      let currentTime = moment()
      let todayDate = moment().toISOString().split("T")[0]
      console.log("Today: ", todayDate)

      if (currentTime !== postCreatedAt) {
        difference = moment.duration(moment().diff(postCreatedAt))
        difference = difference.asHours()
        setTimeElapsed(difference)

        if (timeElapsed > 24) {
          console.log()
        }
        else {
          console.log("CURRENT TIME: ", moment())
          console.log("CREATED TIME: ", postCreatedAt)
          console.log("CREATED TIME ", moment(postData.timeCreated))

          let diff = moment().diff(postCreatedAt);
          let timeLeft = moment.utc(diff).format("HH:ss");
          let momentVer = moment(todayDate.concat("T", timeLeft, "Z"))
          timeLeft = timeLeft.split(":")
          let hoursLeft = 24 - parseInt(timeLeft[0])
          let minutesLeft = 60 - parseInt(timeLeft[1])

          setHoursLeft(hoursLeft-1)
          setMinsLeft(minutesLeft)

          console.log("TIME LEFT: ", timeLeft)
          console.log("HOURS: ", hoursLeft)
          console.log("MINUTES: ", minutesLeft)
        }
      }
    }

    if (postData) {
      calculateTime()
    }


  }, [])

  return postData ? (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate(screens.RESULTS, {
          roomID: roomID,
          roomData: postData
        })
      }
      style={styles.container}
      underlayColor="#F4F4F4"
    >
      <View style={styles.innerContainer}>
        <Image source={{ uri: winnerPicture({postData:postData})}} style={styles.image} />
        <View style={styles.textWrapper}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.titleWrapper}>
              <Text style={styles.timeText}>{postData.createdAt}</Text>
              <Text style={styles.text}> {postData.title} </Text>
            </View>
            {(timeElapsed > 24) ? (
              <View style={styles.iconWrapper}>
                <Ionicons style={styles.icon} name="md-checkmark-circle" size={45} color="#DD8300" />
              </View>
            ) : ((timeLeft !== undefined) && (minsLeft > 0)) ? (
              <View style={styles.countDownWrapper}>
              <StyledText type="semibold" style={styles.title}>TIME LEFT</StyledText>
                <CountDown
                  digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#fff'}}
                  until={(hoursLeft*3600) + (minsLeft*60)}
                  size={15}
                  timeLabels={{m: null, s: null}}
                  timeToShow={['H', 'M']}
                  showSeparator
                />
              </View>
            ) : (
              <Text>Nope</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  ) : (
    <StyledText>Loading...</StyledText>
  )
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 2,
    padding: 16
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row"
  },
  textWrapper: {
    flex: 1,
    marginLeft: 16
  },
  timeText: {
    fontFamily: "source-sans-pro-regular",
    color: "#DEDEDE",
    // flex: 1,
    // flexWrap: "wrap",
    marginRight: 5,
    fontSize: 24
  },
  text: {
    fontFamily: "source-sans-pro-semibold",
    fontSize: 16,
    // flex: 1,

    marginTop: 16
    // flexWrap: "wrap"
  },
  image: {
    aspectRatio: 2 / 3,
    height: 75,
    width: 75,
    borderRadius:3
  },
  icon: {
    paddingTop: 40
  },
  titleWrapper: {
    width: windowWidth/2.1
  },
  iconWrapper: {
    paddingLeft: 20
  },
  countDownWrapper: {
    paddingTop: 30,
    paddingLeft: 5
  }
})
export default PostPreview
