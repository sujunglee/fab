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
        <UserStats user={user} />
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


const UserStats = ({ user }) => (
  <View style={{ flexDirection: "row", backgroundColor: colors.general.white, paddingTop: "15%", paddingBottom: 10, paddingLeft: '8%', paddingRight: '8%' }}>
    <View style={{ flex: 1 }}>
      <StyledText size={sizes.xlarge.fontSize} style={{ color: colors.text.secondary.light }}>
        My Stats
              </StyledText>
      <StyledText size={sizes.xlarge.fontSize} style={{ color: colors.text.secondary.main }}>
        <Badge badge={user.meta_data.badge} />
      </StyledText>
    </View>
    <View style={{ flex: 1 }}>
      <PostCount count={Object.keys(user.rooms_owned).length} />
      <VoteCount count={user.meta_data.number_voted} />
      <PercentCorrect percent={Math.ceil(user.meta_data.number_correct * 100 / user.meta_data.number_voted)} />
    </View>
  </View>
)

const Badge = ({ badge }) => {
  if (badge === 'influencer')
    return (
      <StyledText size={sizes.large.fontSize} style={{ color: colors.text.secondary.main }}>
        INFLUENCER
      </StyledText>
    )
  return null;
}

const PostCount = ({ count }) => (
  <View style={{ flexDirection: "row", borderBottomColor: colors.text.secondary.light, borderBottomWidth: 1 }}>
    <View style={{ width: '50%' }}>
      <StyledText size={sizes.medium.fontSize} style={{ color: colors.text.secondary.main, textAlign: "right", paddingRight: 5 }}>
        Posts
      </StyledText>
    </View>
    <StyledText size={sizes.large.fontSize} style={{ color: colors.text.secondary.main, paddingLeft: 5 }}>
      {count}
    </StyledText>
  </View>
)

const VoteCount = ({ count }) => (
  <View style={{ flexDirection: "row", paddingTop: 5 }}>
    <View style={{ width: '50%' }}>
      <StyledText size={sizes.medium.fontSize} style={{ color: colors.text.secondary.main, textAlign: "right", paddingRight: 5 }}>
        Votes
    </StyledText>
    </View>
    <StyledText size={sizes.large.fontSize} style={{ color: colors.primary.light, paddingLeft: 5 }}>
      {count}
    </StyledText>
  </View>
)

const PercentCorrect = ({ percent }) => (
  <View style={{ flexDirection: "row" }}>
    <View style={{ width: '50%' }}>
      <StyledText size={sizes.medium.fontSize} style={{ color: colors.text.secondary.main, lineHeight: 15, paddingTop: 5, textAlign: "right", paddingRight: 5 }}>
        Percent Correct
      </StyledText>
    </View>
    <View style={{ flexDirection: "row", position: "relative" }}>
      <View style={{ flexDirection: "row" }}>
        <StyledText size={sizes.large.fontSize} style={{ color: colors.primary.light, paddingLeft: 5 }}>
          {percent}
        </StyledText>
        <StyledText size={sizes.medium.fontSize} style={{ color: colors.primary.light, bottom: 0 }}>
          %
    </StyledText>
      </View>
    </View>
  </View>
)


export default MyPostsPage
