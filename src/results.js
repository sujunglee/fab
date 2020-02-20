import React from 'react';
import Chart from "./Chart";
import {db} from "../App";

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


const getVoteData = async () => {
  let snapshot = await db.ref("rooms/active/room1").once("value");
  console.log("SNAPSHOT: ", snapshot.val());
}


const Results = () => {
  getVoteData();
  return (
    <div>
      <Chart data={data1}/>
    </div>)
}

export default Results;
