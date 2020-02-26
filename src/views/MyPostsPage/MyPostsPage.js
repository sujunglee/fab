import React, { useEffect, useState, useContext} from "react"
import { View, Text, SafeAreaView, ScrollView, Button } from "react-native"
import { PostPreview } from "../../components/PostPreview"
import getUserInfo from "../../db/getUserInfo"
import {AppContext} from "../../context/AppContext";
import {colors} from "../../constants/styles";

const MyPostsPage = () => {
  // const navigation = useNavigation()
  const userID = "jbrain98";
  const {user, isLoggedIn} = useContext(AppContext);
  console.log(user);

  const defaultTestProps = {
    title: "Which cardigan should I wear for a big presentation today?",
    image: require("../../assets/image_B.jpg"),
    day: "Monday",
    time: "2:12"
  };

  return isLoggedIn ? (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: colors.general.white, flex: 1 }}>
        <ScrollView>
          {Object.keys(user.rooms_owned).map(roomID => (
            <PostPreview roomID={roomID} user={user} key={roomID} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  ) : (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <StyledText> Loading...</StyledText>
    </View>
  )
};

export default MyPostsPage
