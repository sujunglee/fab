import React from "react"
import { View, Text } from "react-native"
import { PieChart } from "react-native-svg-charts"

const Chart = ({ data }) => {
  console.log("CHART DATA: ", data)

  return (
    <View>
      <Text>Chart</Text>
      <PieChart
        style={{ height: 200 }}
        valueAccessor={({ item }) => item.amount}
        data={data}
        spacing={0}
        outerRadius={"95%"}
      />
    </View>
  )
}

export default Chart
