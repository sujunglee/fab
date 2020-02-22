import React, { useEffect } from "react"
import { View, Text, SafeAreaView, ScrollView, Button } from "react-native"
import { screens } from "../../Navigation/constants"
import { PostPreview } from "../../components/PostPreview"
import { useNavigation } from "@react-navigation/native"

const MyPostsPage = () => {
  // const navigation = useNavigation()

  useEffect(() => {
    /*

      Fetch users Posts and stats here

      */
  })

  const defaultTestProps = {
    title: "Which cardigan should I wear for a big presentation today?",
    image: require("../../assets/image_B.jpg"),
    day: "Monday",
    time: "2:12"
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#D6D6D6", flex: 1 }}>
        <ScrollView>
          <PostPreview {...defaultTestProps} />
          <PostPreview {...defaultTestProps} />
          <PostPreview {...defaultTestProps} />
          <PostPreview {...defaultTestProps} />
          <PostPreview {...defaultTestProps} />
          <PostPreview {...defaultTestProps} />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default MyPostsPage
