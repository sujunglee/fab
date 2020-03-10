import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from "react"
import {View, StyleSheet} from "react-native"
import { StyledText } from "../StyledText"
import { colors, normalize, sizes } from "../../constants/styles"

const VoteResults = (props) => {
  return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: 30
        }}
      >
      {props.scoreA === 0 &&
        props.scoreB === 0 && (
          <View
            style={{
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              bottom: props.viewport.height / 2 + 10
            }}
          >
            <StyledText type="bold" style={{ color: "white" }}>
              You've made the first vote.
          </StyledText>
            <StyledText style={{ color: "white" }}>
              So far you are 100%!
          </StyledText>
          </View>
        )}

          {/*Get the container from for title from VoteScreen to align container below - hack */}
        <View style={styles.title_container}/>

        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'center',
            borderWidth: 1 ,
            height: props.viewport.height,
            width: props.viewport.width
        }}>

        <View style={{ width: "50%" }}>
          <VotePercents
            score="A"
            scoreA={props.scoreA}
            scoreB={props.scoreB}
            imageViewport={props.viewport}
          />
        </View>
        <View style={{ width: "50%" }}>
          <VotePercents
            score="B"
            scoreA={props.scoreA}
            scoreB={props.scoreB}
            imageViewport={props.viewport}
          />
        </View>
      </View>
      {props.selectedOption && <YourVote selectedOption={props.selectedOption} />}
      </View>
  )
};

const VotePercents = (props) => {
    const textStyles = {
    color: "white",
    fontSize: 48
  }
  const borderStyles = {
    borderWidth: 10,
    textAlign: "center",
    height: 70,
    padding: 5,
    marginRight: 10,
    marginLeft: 10
  }
  var borderColors = (props.scoreA > props.scoreB) ? { borderA: colors.secondary.main, borderB: "transparent" } : { borderB: colors.secondary.main, borderA: "transparent" }
  if (props.scoreA == props.scoreB){
    borderColors = { borderA: "transparent", borderB: "transparent" }
  }
  return props.score === "A" ? (
    <StyledText style={{ ...textStyles, ...borderStyles, borderColor: borderColors.borderA }}>
      {((props.scoreA / (props.scoreA + props.scoreB)) * 100).toFixed()}%
    </StyledText>
  ) : (
      <StyledText style={{ ...textStyles, ...borderStyles, borderColor: borderColors.borderB}}>
        {((props.scoreB / (props.scoreA + props.scoreB)) * 100).toFixed()}%
        </StyledText>
    )
}

const YourVote = ({ selectedOption }) => {
  const [height, setHeight] = useState(null)

  useEffect(() => console.log("hegiht", height), [height])

  return (
    <View
      onLayout={e => setHeight(e.nativeEvent.layout.height)}
      style={{
        backgroundColor: colors.secondary.main,
        width: "48.5%",
        left: selectedOption === "optionB" ? "51%" : "1%",
        top: height ? -height : 0,
        alignItems: "center",
        paddingVertical: 8
      }}
    >
      <StyledText
        size={sizes.medium.fontSize}
        type={"regular"}
        style={{ color: colors.general.white }}
      >
        YOUR VOTE
      </StyledText>
    </View>
  )
}

const styles = StyleSheet.create({
  title_container: {
    height: "12%",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
  }
});


export default VoteResults
