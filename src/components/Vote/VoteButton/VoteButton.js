import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { colors } from "../../constants/styles"
import { StyledText } from "../StyledText"

const VoteButton = ({ onPress, content }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.5}
    >
      <StyledText type="regular" size={72} style={{ color: "white" }}>
        {content}
      </StyledText>
    </TouchableOpacity>
  )
}

VoteButton.defaultProps = {
  content: "A"
}
const styles = StyleSheet.create({
  button: {
    margin: 8,
    backgroundColor: colors.MAIN_BLUE,
    paddingVertical: 4,
    paddingHorizontal: 32,
    borderRadius: 10
  }
})

export default VoteButton
