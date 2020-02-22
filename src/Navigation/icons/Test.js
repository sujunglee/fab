import React from "react"
import { View } from "react-native"
import * as Svg from "react-native-svg"

const { G, Circle, Path } = Svg

const Test = () => (
  <View>
    <Svg width="44px" height="38px" viewBox="0 0 44 38">
      <G stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <G transform="translate(-2.000000, -5.000000)">
          <G transform="translate(4.000000, 7.000000)">
            <Circle
              stroke="#111"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              cx="15"
              cy="6"
              r="6"
            ></Circle>
            <Path
              d="M15,18 C8.5778496,18 1.36980332,21.9035923 0.75,23.25 C0.24206543,24.3533936 0,27.75 0,27.75 C0,28.9901122 1.00541245,30 2.24565156,30 L27.7543484,30 C28.9945876,30 30,28.9901122 30,27.75 C30,27.75 29.7579346,24.3533936 29.25,23.25 C28.6301967,21.9035923 21.4221504,18 15,18 L15,18 Z"
              stroke="#111"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></Path>
            <Circle id="Oval-2" fill="#111" cx="32" cy="26" r="10"></Circle>
            <Path
              d="M29.4142136,23.5857864 C28.633165,22.8047379 27.366835,22.8047379 26.5857864,23.5857864 C25.8047379,24.366835 25.8047379,25.633165 26.5857864,26.4142136 L29.5857864,29.4142136 C29.9763107,29.8047379 30.4881554,30 31,30 C31.5118446,30 32.0236893,29.8047379 32.4142136,29.4142136 L37.4142136,24.4142136 C38.1952621,23.633165 38.1952621,22.366835 37.4142136,21.5857864 C36.633165,20.8047379 35.366835,20.8047379 34.5857864,21.5857864 L31,25.1715729 L29.4142136,23.5857864 Z"
              fill="#FFFFFF"
              fillRule="nonzero"
            ></Path>
          </G>
        </G>
      </G>
    </Svg>
  </View>
)

export default Test
