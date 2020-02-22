import React from "react"
import Svg, { G, Path, Circle } from "react-native-svg"

const MyPosts = ({ color }) => (
  <Svg width="27px" height="23px" viewBox="0 0 27 23">
    <G
      id="icons-303-lines"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <G id="user-check-copy" transform="translate(-11.000000, -13.000000)">
        <G id="user-check" transform="translate(12.000000, 14.000000)">
          <Circle
            id="Oval"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            cx="9.5"
            cy="3.5"
            r="3.5"
          ></Circle>
          <Path
            d="M9.5,11 C5.43263808,11 0.867542105,13.2770955 0.475,14.0625 C0.153308105,14.7061462 0,16.6875 0,16.6875 C0,17.4108988 0.636761218,18 1.42224599,18 L17.577754,18 C18.3632388,18 19,17.4108988 19,16.6875 C19,16.6875 18.8466919,14.7061462 18.525,14.0625 C18.1324579,13.2770955 13.5673619,11 9.5,11 L9.5,11 Z"
            id="Combined-Shape"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></Path>
          <Circle id="Oval-2" fill={color} cx="20" cy="16" r="6"></Circle>
          <Path
            d="M17.9916246,14.7238576 C17.5360129,14.2031586 16.7973204,14.2031586 16.3417088,14.7238576 C15.8860971,15.2445567 15.8860971,16.0887767 16.3417088,16.6094757 L18.0917088,18.6094757 C18.3195146,18.8698252 18.6180906,19 18.9166667,19 C19.2152427,19 19.5138187,18.8698252 19.7416246,18.6094757 L22.6582912,15.2761424 C23.1139029,14.7554433 23.1139029,13.9112233 22.6582912,13.3905243 C22.2026796,12.8698252 21.4639871,12.8698252 21.0083754,13.3905243 L18.9166667,15.7810486 L17.9916246,14.7238576 Z"
            id="Combined-Shape"
            fill="#323232"
            fillRule="nonzero"
          ></Path>
        </G>
      </G>
    </G>
  </Svg>
)
export default MyPosts
