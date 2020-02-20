import React from 'react';
import Chart from "./Chart";
import {db} from "../App";

const data1 = [
    {
        key: 3,
        amount: 50,
        svg: { fill: '#1563af' }
    },
    {
        key: 2,
        amount: 15,
        svg: { fill: '#dd8300' }
    },
    {
        key: 1,
        amount: 35,
        svg: { fill: '#f4f4f4' },
    },
]

const data2 = [
    {
        key: 3,
        amount: 35,
        svg: { fill: '#1563af' }
    },
    {
        key: 1,
        amount: 65,
        svg: { fill: '#f4f4f4' },
    },
]

const getVoteData = async () => {
  let snapshot = await db.ref("rooms/active/room1").once("value");
  console.log("SNAPSHOT: ", snapshot.val());

  let numInfluencersA = Object.keys(snapshot.val().optionA.voters_influencer).length;
  let numNormalA = Object.keys(snapshot.val().optionA.voters_normal).length;

  let numInfluencersB = Object.keys(snapshot.val().optionB.voters_influencer).length;
  let numNormalB = Object.keys(snapshot.val().optionB.voters_normal).length;

  let scoreA = votes.numNormalA + votes.numInfluencersA;
  let scoreB = votes.numNormalB + votes.numInfluencersB;

  let results = {"numInfluencersA": numInfluencersA*2,
          "numNormalA": numNormalA,
          "numInfluencersB": numInfluencersB*2,
          "numNormalB": numNormalB,
          "scoreA": scoreA,
          "scoreB": scoreB}

  // console.log("THE SCORES!!!: ", results);
  // return results

}

const createGraphs = async () => {
  let scores = await getVoteData();
}


const Results = () => {
  return (
    <div>
      <Chart data={data1}/>
      <Chart data={data2}/>
    </div>)
}

export default Results;
