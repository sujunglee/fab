import React, {useState, useEffect, useRef} from 'react';
import moment from "moment";
import {StyleSheet, Text, View} from 'react-native';
import {styles} from "./CountDownStyle";
import PropTypes from 'prop-types';
import StyledText from "../StyledText/StyledText";
import {colors,sizes} from "../../constants/styles"


/**
 * Displays the countdown clock of a outfit
 *
 * @param isFinished() - Callback when the room is done
 * @param startTime - ISO formatted finish time
 * @author jideanene2020@u.northwestern.edu
 */

const CountDown = ({startTime, isFinished, seconds, remainingHours}) => {

    let outfitStartTime = moment(startTime);
    let outfitEndTime;

    if (remainingHours > 0) {
      // console.log("do NOT set it to 24 hours ", remainingTime)
      outfitEndTime = moment(startTime).add(3, 'hours')
    }
    else {
      outfitEndTime = moment(startTime).add(24, 'hours');
    }
    let outfitWarningTime =moment(startTime).add(24, 'hours').subtract(60, 'seconds');

    const [hasEnded, setHasEnded] = useState(false);
    const [timeLeft, setTimeLeft] = useState(moment(startTime).diff(moment(), 'seconds'));
    const [isCloseToEnd, setIsCloseToEnd] = useState(false);

    const [hasLoaded, setHasLoaded] = useState(false);

    let format = 'HH:mm:ss'
    if (seconds) {
      format = 'HH:mm:ss'
    }

    /**
     * Indicates  if time has run out
     * @param now - moment
     * @return {boolean}
     */
    const hasTimeRunOut = (now) => {
        setIsCloseToEnd(now.isSameOrAfter(outfitWarningTime));
        return (now.isAfter(outfitEndTime))
    };


    useEffect(() => {



        if (hasTimeRunOut(moment())) {
                isFinished();
                setHasEnded(true);
                setHasLoaded(true);
            } else {
                const interval = setInterval(() => {
                    let now = moment();
                    if (hasTimeRunOut(now)) {
                        setHasEnded(true);
                        isFinished();
                        clearInterval(interval);
                        setHasLoaded(true);
                    } else {
                        setTimeLeft(outfitStartTime.diff(moment(), 'seconds'));
                        setHasLoaded(true);
                    }
                }, 500);
                return () => clearInterval(interval);
            }
        }, []
    );


    return (
        hasLoaded &&
        (<View style={styles.container}>
            <StyledText type="semibold" style={styles.title}>TIME LEFT</StyledText>
            <StyledText type="bold" style={
                {...styles.content,
                    color:isCloseToEnd && !hasEnded? colors.general.hot_purple:'#414141',
                    fontSize: isCloseToEnd && !hasEnded? sizes.xlarge.fontSize:sizes.large.fontSize
                }
            }>{hasEnded? 'COMPLETED' : moment.utc(timeLeft * 1000).format(format)}</StyledText>
        </View>)
    );
};
CountDown.defaultProps = {
    finishTime: moment().add({'seconds': 30}).toISOString()
};

CountDown.propTypes = {
    isFinished: PropTypes.func.isRequired,
};

export default CountDown;
