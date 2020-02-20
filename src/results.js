import React from 'react';
import Chart from "./Chart";


const data1 = [
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



const Results = () => {
  return (
    <div>
      <Chart data={data1}/>
    </div>)
}

export default Results;
