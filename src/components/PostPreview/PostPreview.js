import React, { useEffect, useState } from "react"
import { View, TouchableHighlight, Text, StyleSheet, Image } from "react-native"
import moment from "moment"
import { screens } from "../../Navigation/constants"
import getRoomData from "../../db/getRoomData"
import { useNavigation } from "@react-navigation/native"
import { StyledText } from "../StyledText"
import {RoomTitle} from "../RoomTitle";

const winnerPicture = ({postData}) =>{
  return (postData.scoreA >= postData.scoreB) ? postData.pictureA : postData.pictureB;
}


const PostPreview = ({ roomID, userInfo }) => {
  const navigation = useNavigation()

  const [postData, setPostData] = useState({})


  useEffect(() => {
    const getPostData = async () => {
      const data = await getRoomData({ roomID })
      const createdAt = moment(data.timeCreated).format("dddd h:mm A")
      setPostData({
        ...data,
        createdAt: createdAt
      })

    }

    getPostData()
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
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.timeText}>{postData.createdAt}</Text>
            {/* <Text style={styles.timeText}>{time}</Text> */}
          </View>
          <Text style={styles.text}> {postData.title} </Text>
        </View>
      </View>
    </TouchableHighlight>
  ) : (
    <StyledText>Loading...</StyledText>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 2,
    // borderColor: "grey",
    // borderWidth: 1,
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
  }
})
export default PostPreview
