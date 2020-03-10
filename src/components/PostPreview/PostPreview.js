import React, { useEffect, useState } from "react"
import { View, TouchableHighlight, Text, StyleSheet, Image, Dimensions } from "react-native"
import moment from "moment"
import { screens } from "../../Navigation/constants"
import getMyPostData from "../../db/getMyPostData"
import { useNavigation } from "@react-navigation/native"
import { StyledText } from "../StyledText"
import {RoomTitle} from "../RoomTitle";
import { Ionicons } from '@expo/vector-icons';
import CountDown from "../../components/countdown/CountDown"

const winnerPicture = ({postData}) =>{
  return (postData.scoreA >= postData.scoreB) ? postData.pictureA : postData.pictureB;
}


const PostPreview = ({ roomID, userInfo }) => {
  const navigation = useNavigation()
  const [postData, setPostData] = useState(null)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const getPostData = async () => {
      const data = await getMyPostData({ roomID });
      setPostData(data);
    };
    getPostData()
  }, []);

  const isFinishedCallback = ()=>{
    setIsFinished(true)
  };

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
            {(isFinished) ? (
              <View style={styles.iconWrapper}>
                <Ionicons style={styles.icon} name="md-checkmark-circle" size={45} color="#DD8300" />
              </View>
            ) : (

              <View style={styles.countDownWrapper}>
                <CountDown
                  startTime={postData.timeCreated}
                  isFinished={isFinishedCallback}
                  prettyFormat={true}
                />
              </View>

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
    width: windowWidth/2.3
  },
  iconWrapper: {
    paddingLeft: 20
  },
  countDownWrapper: {
    paddingTop: 40,
    paddingLeft: 5,
  }
})
export default PostPreview
