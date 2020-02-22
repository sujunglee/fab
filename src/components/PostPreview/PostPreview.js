import React from "react"
import { View, TouchableHighlight, Text, StyleSheet, Image } from "react-native"
import { screens } from "../../Navigation/constants"
import { useNavigation } from "@react-navigation/native"

const PostPreview = ({ image, title, day, time }) => {
  const navigation = useNavigation()
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate(screens.RESULTS)}
      style={styles.container}
      underlayColor="#F4F4F4"
    >
      <View style={styles.innerContainer}>
        <Image source={image} style={styles.image} />
        <View style={styles.textWrapper}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.timeText}>{day}</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          <Text style={styles.text}> {title} </Text>
        </View>
      </View>
    </TouchableHighlight>
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
    width: 75
  }
})
export default PostPreview
