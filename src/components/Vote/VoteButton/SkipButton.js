import React from "react"
import { TouchableOpacity, StyleSheet, View, Text } from "react-native"
import { colors, normalize,sizes} from "../../../constants/styles"
import { StyledText} from "../../StyledText"

const SkipButton = ({ onPress, style, ...rest }) => {
  return (
        <TouchableOpacity
        style={{ ...styles.container, ...style }}
        onPress={onPress}
        {...rest}
      >
          <StyledText size={sizes.medium.fontSize} style={{ color: colors.primary.main, alignSelf: 'center'}}>
            SKIP
          </StyledText>

      </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',

  },
  container:{
    width: normalize(120),
    height: normalize(30),
    borderColor: colors.primary.main,
    borderWidth: 2,
    justifyContent: 'center',
  }
});

export default SkipButton
