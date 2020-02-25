import React from "react"
import { Text } from "react-native-svg"

const Labels = ({ slices, height, width }) => {
  return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      const percentage = Math.round((data.amount / data.totalNumVoters)*100);
      let labelStroke;
      data.svg.fill == "#f4f4f4" ? labelStroke = "#f4f4f4" : labelStroke = "black"

      console.log("THE DATA FOR THIS SLICE: ", data)
      return (
          <Text
              key={index}
              x={pieCentroid[ 0 ]}
              y={pieCentroid[ 1 ]}
              fill={'#f4f4f4'}
              textAnchor={'middle'}
              alignmentBaseline={'middle'}
              fontSize={20}
              stroke={labelStroke}
              strokeWidth={0.2}
          >
              {percentage}%
          </Text>
      )
  })
}

export default Labels
