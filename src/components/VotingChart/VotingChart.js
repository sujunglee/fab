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

    const voteA_percent = ((voteResults.scoreA / (voteResults.scoreA + voteResults.scoreB))*100);
    const voteB_percent = ((voteResults.scoreB / (voteResults.scoreA + voteResults.scoreB))*100);
    const totalNumVoters = voteResults.scoreA + voteResults.scoreB;

    return (
        <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ alignItems: "center", textAlign: "center", justifyContent: "center", flex: 1 }}>
            </View>
            <View style={{ alignItems: "center", textAlign: "center", justifyContent: "center", flex: 1 }}>
            </View>
        </View>
    );

};

VotingChart.propTypes = {
    voteResults: PropTypes.object.isRequired,
};


export default VotingChart;
