import React,{useState} from "react"
import {Text, View, StyleSheet} from "react-native"
import {PieChart} from "react-native-svg-charts";
import PropTypes from 'prop-types';
import StyledText from "../StyledText/StyledText";
import {sizes} from "../../constants/styles";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color:'#414141',
        fontSize: sizes.mini.fontSize,
    },
    content: {
        color: '#414141',
        fontSize: sizes.large.fontSize

    },
});

const createChartData = ({
                             influencer,
                             normal,
                             competitor,
                             totalNumVoters
                         }) => {
    return [
        {
            key: 3,
            amount: normal,
            svg: {fill: "#1563af"},
            totalNumVoters: totalNumVoters
        },
        {
            key: 2,
            amount: influencer,
            svg: {fill: "#dd8300"},
            totalNumVoters: totalNumVoters
        },
        {
            key: 1,
            amount: competitor,
            svg: {fill: "#E8E8E8"},
            totalNumVoters: totalNumVoters
        }
    ]
};




const VotingChart = ({voteResults}) =>{

    console.log("HELLO VOTING CHART SHOULD BE DISPLAYING")

    const voteA_percent = ((voteResults.scoreA / (voteResults.scoreA + voteResults.scoreB))*100);
    const voteB_percent = ((voteResults.scoreB / (voteResults.scoreA + voteResults.scoreB))*100);
    const totalNumVoters = voteResults.scoreA + voteResults.scoreB;

    return (
        <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ alignItems: "center", textAlign: "center", justifyContent: "center", flex: 1 }}>
              <PieChart
                  padAngle={0}
                  style={{ width: 160, height: 160 }}
                  valueAccessor={({ item }) => item.amount}
                  data={createChartData({
                      influencer: voteResults.numInfluencersA,
                      normal: voteResults.numNormalA,
                      competitor: voteResults.scoreB,
                      totalNumVoters:
                          voteResults.numInfluencersA +
                          voteResults.numNormalA +
                          voteResults.scoreB
                  })}
                  outerRadius={"95%"}
              />

                <Text
                  style={{
                      position: 'absolute',
                      left: 70,
                      textAlign: 'center',
                      fontSize: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: (voteA_percent ===voteB_percent? "#1563af":  (voteA_percent>voteB_percent?"#dd8300":"#1563af"))
                  }}
              >
                {(totalNumVoters === 0) ? (
                  ""
                ) : (
                  voteA_percent.toFixed().toString() + "%"
                )}
              </Text>
            </View>
            <View style={{ alignItems: "center", textAlign: "center", justifyContent: "center", flex: 1 }}>
              <PieChart
                   padAngle={0}
                  style={{ width: 160, height: 160 }}
                  valueAccessor={({ item }) => item.amount}
                  data={createChartData({
                      influencer: voteResults.numInfluencersB,
                      normal: voteResults.numNormalB,
                      competitor: voteResults.scoreA,
                      totalNumVoters:
                          voteResults.numInfluencersA +
                          voteResults.numNormalA +
                          voteResults.scoreB
                  })}
                  outerRadius={"95%"}
              />
              <Text
                  style={{
                      position: 'absolute',
                      left: 70,
                      textAlign: 'center',
                      fontSize: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: (voteA_percent ===voteB_percent? "#1563af":  (voteB_percent>voteA_percent?"#dd8300":"#1563af"))
                  }}
              >

                  {(totalNumVoters === 0) ? (
                    ""
                  ) : (
                    voteB_percent.toFixed().toString() + "%"
                  )}
              </Text>
            </View>
        </View>
    );

};

VotingChart.propTypes = {
    voteResults: PropTypes.object.isRequired,
};


export default VotingChart;
