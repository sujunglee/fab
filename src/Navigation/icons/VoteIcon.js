import React from "react"
import Svg, { G, Path, Circle, Polyline } from "react-native-svg"

const VoteIcon = ({ color }) => (
  <Svg width="39px" height="18px" viewBox="0 0 39 18">
    <G
      id="icons-303-lines"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <G
        id="Artboard-Copy"
        transform="translate(-50.000000, -3.000000)"
        stroke={color}
        strokeWidth="2"
      >
        <G id="Group" transform="translate(51.000000, 4.000000)">
          <G id="check-3-copy">
            <Circle id="Oval-9" cx="8" cy="8" r="8"></Circle>
            <Polyline
              id="Rectangle"
              points="12 6 7.33333333 11 5 8.5"
            ></Polyline>
          </G>
          <G id="error-3-copy" transform="translate(21.000000, 0.000000)">
            <Circle id="Oval-9" cx="8" cy="8" r="8"></Circle>
            <Path d="M5,5 L11,11" id="Line"></Path>
            <Path
              d="M5,5 L11,11"
              id="Line-Copy"
              transform="translate(8.000000, 8.000000) scale(-1, 1) translate(-8.000000, -8.000000) "
            ></Path>
          </G>
        </G>
      </G>
    </G>
  </Svg>
)
export default VoteIcon
