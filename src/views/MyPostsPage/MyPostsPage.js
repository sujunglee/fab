import React, { useEffect, useState } from "react"
import { View, Text, SafeAreaView, ScrollView, Button } from "react-native"
import { PostPreview } from "../../components/PostPreview"
import getUserInfo from "../../db/getUserInfo"
import { StyledText } from "../../components/StyledText"

const MyPostsPage = () => {
  // const navigation = useNavigation()
  const userID = "jbrain98"
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const getInfo = async () => {
      const info = await getUserInfo({ userID: userID })
      console.log(info)
      setUserInfo(info)
    }
    getInfo()
  }, [])

  const defaultTestProps = {
    title: "Which cardigan should I wear for a big presentation today?",
    image: require("../../assets/image_B.jpg"),
    day: "Monday",
    time: "2:12"
  }
  return userInfo ? (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#D6D6D6", flex: 1 }}>
        <ScrollView>
          {Object.keys(userInfo.rooms).map(roomID => (
            <PostPreview roomID={roomID} userInfo={userInfo} key={roomID} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  ) : (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <StyledText> Loading...</StyledText>
    </View>
  )
}

export default MyPostsPage
