import React from 'react';
import { Text } from 'react-native-svg'
import { PieChart } from 'react-native-svg-charts'


const data = [
    {
        key: 1,
        amount: 50,
        svg: { fill: '#600080' },
    },
    {
        key: 2,
        amount: 50,
        svg: { fill: '#9900cc' }
    },
    {
        key: 3,
        amount: 40,
        svg: { fill: '#c61aff' }
    },
    {
        key: 4,
        amount: 95,
        svg: { fill: '#d966ff' }
    },
    {
        key: 5,
        amount: 35,
        svg: { fill: '#ecb3ff' }
    }
]

const Chart = () => {
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
