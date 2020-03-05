import React, { useEffect, useState, useContext } from "react"
import { View, Text, SafeAreaView, ScrollView, Button, StyleSheet } from "react-native"
import { PostPreview } from "../../components/PostPreview"
import getUserInfo from "../../db/getUserInfo"
import { StyledText } from "../../components/StyledText"
import { AppContext } from "../../context/AppContext"
import { colors, normalize, sizes } from "../../constants/styles"
import fb from "../../db/init"
import Loader from "../../components/FancyLoader/FancyLoader";
import Constants from "expo-constants"
const db = fb.database()

const MyPostsPage = () => {
  // const navigation = useNavigation()
  const userID = Constants.installationId;
  console.log("USER ID: ", userID);
  const { user, isLoggedIn } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState(null)
  console.log(user)

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setUserInfo(snap.val())
    }
    db.ref("users/" + userID).on("value", handleData, error => alert(error))
    return () => {
      db.ref("users/" + userID).off("value", handleData)
    }
  }, [])

  return isLoggedIn && userInfo ? (
    <SafeAreaView style={{ flex: 1,backgroundColor: colors.general.white,width:'100%', height: '100%'}}>
        <View style={{height: normalize(140)}}>
            <UserStats user={userInfo} />
        </View>
        <ScrollView>
          {userInfo.rooms_owned ? (
            Object.keys(userInfo.rooms_owned).map(roomID => (
              <PostPreview roomID={roomID} user={user} key={roomID} />
            ))
          ) : (
            <View
              style={{
                width: "100%",
                marginTop: 24,
                paddingHorizontal: 32
              }}
            >
              <StyledText
                type="semibold"
                style={{
                  textAlign: "center"
                }}
                size={normalize(26)}
                color={colors.primary.main}
              >
                No posts yet
              </StyledText>
              <StyledText
                style={{
                  textAlign: "center",
                  marginTop: 32
                }}
                size={normalize(26)}
                color={colors.primary.main}
              >
                Head to the Post page to submit a new post!
              </StyledText>
            </View>
          )}
        </ScrollView>
    </SafeAreaView>
  ) : (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Loader visible={true} />
      </View>
  )
}

const UserStats = ({ user }) => (
  <View
    style={{
      flexDirection: "row",
      backgroundColor: colors.general.white,
      paddingTop: "15%",
      paddingBottom: 10,
      paddingLeft: "8%",
      paddingRight: "8%"
    }}
  >
    <View style={{ flex: 1 }}>
      <StyledText
        size={sizes.xlarge.fontSize}
        style={{ color: colors.text.secondary.light }}
      >
        My Stats
      </StyledText>
      <StyledText
        size={sizes.xlarge.fontSize}
        style={{ color: colors.text.secondary.main }}
      >
        <Badge badge={user.meta_data.badge} />
      </StyledText>
    </View>
    <View style={{ flex: 1 }}>
      <PostCount
        count={"rooms_owned" in user ? Object.keys(user.rooms_owned).length : 0}
      />
      <VoteCount count={user.meta_data.number_voted} />
      <PercentCorrect
        percent={Math.ceil(
          (user.meta_data.number_correct * 100) / user.meta_data.number_voted
        )}
        numVotes={user.meta_data.number_voted}
      />
    </View>
  </View>
)

const Badge = ({ badge }) => {
  if (badge === "influencer")
    return (
      <StyledText
        size={sizes.large.fontSize}
        style={{ color: colors.text.secondary.main }}
      >
        INFLUENCER
      </StyledText>
    )
  return null
}

const PostCount = ({ count }) => (
  <View
    style={{
      flexDirection: "row",
      borderBottomColor: colors.text.secondary.light,
      borderBottomWidth: 1
    }}
  >
    <View style={{ width: "50%" }}>
      <StyledText
        size={sizes.medium.fontSize}
        style={{
          color: colors.text.secondary.main,
          textAlign: "right",
          paddingRight: 5
        }}
      >
        Posts
      </StyledText>
    </View>
    <StyledText
      size={sizes.large.fontSize}
      style={{ color: colors.text.secondary.main, paddingLeft: 5 }}
    >
      {count}
    </StyledText>
  </View>
)

const VoteCount = ({ count }) => (
  <View style={{ flexDirection: "row", paddingTop: 5 }}>
    <View style={{ width: "50%" }}>
      <StyledText
        size={sizes.medium.fontSize}
        style={{
          color: colors.text.secondary.main,
          textAlign: "right",
          paddingRight: 5
        }}
      >
        Votes
      </StyledText>
    </View>
    <StyledText
      size={sizes.large.fontSize}
      style={{ color: colors.primary.light, paddingLeft: 5 }}
    >
      {count}
    </StyledText>
  </View>
)

const PercentCorrect = ({ percent, numVotes }) => {
  if (numVotes !== 0) {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "50%" }}>
          <StyledText
            size={sizes.medium.fontSize}
            style={{
              color: colors.text.secondary.main,
              lineHeight: 15,
              paddingTop: 5,
              textAlign: "right",
              paddingRight: 5
            }}
          >
            Percent Correct
          </StyledText>
        </View>
        <View style={{ flexDirection: "row", position: "relative" }}>
          <View style={{ flexDirection: "row" }}>
            <StyledText
              size={sizes.large.fontSize}
              style={{ color: colors.primary.light, paddingLeft: 5 }}
            >
              {percent}
            </StyledText>
            <StyledText
              size={sizes.medium.fontSize}
              style={{ color: colors.primary.light, bottom: 0 }}
            >
              %
            </StyledText>
          </View>
        </View>
      </View>
    )
  }
  return null
}

export default MyPostsPage
