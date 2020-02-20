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

  let numInfluencersA = Object.keys(snapshot.val().optionA.voters_influencer).length;
  let numNormalA = Object.keys(snapshot.val().optionA.voters_normal).length;

  let numInfluencersB = Object.keys(snapshot.val().optionB.voters_influencer).length;
  let numNormalB = Object.keys(snapshot.val().optionB.voters_normal).length;

  let scoreA = votes.numNormalA + votes.numInfluencersA;
  let scoreB = votes.numNormalB + votes.numInfluencersB;

  return {"numInfluencersA": numInfluencersA*2,
          "numNormalA": numNormalA,
          "numInfluencersB": numInfluencersB*2,
          "numNormalB": numNormalB,
          "scoreA": scoreA,
          "scoreB": scoreB, }
}

const createGraphs = async () => {
  let scores = await getVoteData();

}


const Results = () => {

  return (
    <div>
      <Chart data={data1}/>
    </div>)
}

export default Results;
