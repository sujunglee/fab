import React, { useEffect, useState, useContext } from "react"
import { View, Text, SafeAreaView, ScrollView, Button } from "react-native"
import { PostPreview } from "../../components/PostPreview"
import getUserInfo from "../../db/getUserInfo"
import { StyledText } from "../../components/StyledText"
import { AppContext } from "../../context/AppContext";
import { colors, normalize, sizes } from "../../constants/styles";

const MyPostsPage = () => {
  // const navigation = useNavigation()
  const userID = "jbrain98";
  const { user, isLoggedIn } = useContext(AppContext);
  console.log(user);

  return isLoggedIn ? (

    <SafeAreaView style={{ flex: 1 }}>

      <View style={{ backgroundColor: colors.general.white, flex: 1 }}>
        <View style={{ flexDirection: "row", backgroundColor: colors.general.white, paddingTop: "15%", paddingBottom: 10, paddingLeft: 15 }}>
          <View style={{ flex: 1 }}>
            <StyledText size={sizes.xlarge.fontSize} style={{ color: colors.text.secondary.main }}>
              My Stats
              </StyledText>
            <StyledText size={sizes.xlarge.fontSize} style={{ color: colors.text.secondary.main }}>
              <Badge badge = {user.meta_data.badge} />
            </StyledText>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              <StyledText size={sizes.medium.fontSize} style={{ color: colors.text.secondary.main }}>
                Posts
              </StyledText>
              <StyledText size={sizes.large.fontSize} style={{ color: colors.text.secondary.main, paddingLeft: 5 }}>
                {Object.keys(user.rooms_owned).length}
              </StyledText>
            </View>
            <View style={{ flexDirection: "row" }}>
              <StyledText size={sizes.medium.fontSize} style={{ color: colors.text.secondary.main }}>
                Votes
              </StyledText>
              <StyledText size={sizes.large.fontSize} style={{ color: colors.primary.light, paddingLeft: 5 }}>
                {user.meta_data.number_voted}
              </StyledText>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View>
                <StyledText size={sizes.medium.fontSize} style={{ color: colors.text.secondary.main }}>
                  Percent
              </StyledText>
                <StyledText size={sizes.medium.fontSize} style={{ color: colors.text.secondary.main }}>
                  Correct
              </StyledText>
              </View>
              <StyledText size={sizes.large.fontSize} style={{ color: colors.primary.light, paddingLeft: 5 }}>
                {Math.ceil(user.meta_data.number_correct * 100 / user.meta_data.number_voted)}%
              </StyledText>
            </View>
          </View>
        </View>
        <ScrollView>
          {Object.keys(user.rooms_owned).map(roomID => (
            <PostPreview roomID={roomID} user={user} key={roomID} />

          ))}
        </ScrollView>
      </View >
    </SafeAreaView >
  ) : (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <StyledText> Loading...</StyledText>
      </View>
    )
};

const Badge = ({ badge }) => {
  if (badge === 'influencer')
    return (
      <StyledText size={sizes.large.fontSize} style={{ color: colors.text.secondary.main }}>
        INFLUENCER
      </StyledText>
    )
  return null;
}


export default MyPostsPage
