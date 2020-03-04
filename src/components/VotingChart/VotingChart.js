import React from "react"
import {Text, View, StyleSheet} from "react-native"
import {PieChart} from "react-native-svg-charts";
import PropTypes from 'prop-types';
import StyledText from "../StyledText/StyledText";
import {sizes} from "../../constants/styles";

styles = StyleSheet.create({
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
            svg: {fill: "#f4f4f4"},
            totalNumVoters: totalNumVoters
        }
    ]
};


const VotingChart = ({voteResults}) =>{

    const totalNumVoters = voteResults.scoreA + voteResults.scoreB

    return (
        <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ alignItems: "center", textAlign: "center", justifyContent: "center", flex: 1 }}>
                <PieChart
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
                        color: "#dd8300"
                    }}
                >
                  {(totalNumVoters === 0) ? (
                    ""
                  ) : (
                    ((voteResults.scoreA / (voteResults.scoreA + voteResults.scoreB))*100).toFixed().toString() + "%"
                  )}
                </Text>
            </View>
            <View style={{ alignItems: "center", textAlign: "center", justifyContent: "center", flex: 1 }}>
                {/*TODO: Factor this out into a clean, separate Chart component*/}
                <PieChart
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
                        color: "#1563af"
                    }}
                >

                    {(totalNumVoters === 0) ? (
                      ""
                    ) : (
                      ((voteResults.scoreB / (voteResults.scoreA + voteResults.scoreB))*100).toFixed().toString() + "%"
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
