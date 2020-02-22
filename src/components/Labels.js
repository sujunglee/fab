import React from "react"
import { Text } from "react-native-svg"

const Labels = ({ slices, height, width }) => {
  return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
          <Text
              key={index}
              x={pieCentroid[ 0 ]}
              y={pieCentroid[ 1 ]}
              fill={'white'}
              textAnchor={'middle'}
              alignmentBaseline={'middle'}
              fontSize={24}
              stroke={'black'}
              strokeWidth={0.2}
          >
              {data.amount}
          </Text>
      )
  })
}

export default Labels
