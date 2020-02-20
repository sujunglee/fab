import React from 'react';
import { Text } from 'react-native-svg'
import { PieChart } from 'react-native-svg-charts'

const Chart = ({data}) => {
  console.log("CHART DATA: ", data);

  return (
    <div>
        <PieChart
            style={{ height: 200 }}
            valueAccessor={({ item }) => item.amount}
            data={data}
            spacing={0}
            outerRadius={'95%'}
        >
        </PieChart>
    </div>)
}

export default Chart;
