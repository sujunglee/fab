import React from "react"
import { View, Text } from "react-native"
import { PieChart } from "react-native-svg-charts"

const Chart = ({ data }) => {
  console.log("CHART DATA: ", data)

  return (
    <View>
      <PieChart
        style={{ height: 140, width: 140 }}
        valueAccessor={({ item }) => item.amount}
        data={data}
        spacing={0}
        outerRadius={"100%"}
      />
    </View>
  )
}

export default Chart
