import React, {useState, useEffect, useRef} from 'react';
import moment from "moment";
import {StyleSheet, Text, View} from 'react-native';
import {styles} from "./CountDownStyle";
import PropTypes from 'prop-types';
import StyledText from "../StyledText/StyledText";

/**
 * Displays the countdown clock of a outfit
 *
 * @param isFinished() - Callback when the room is done
 * @param finishTime - ISO formatted finish time
 * @author jideanene2020@u.northwestern.edu
 */

const CountDown = ({finishTime, isFinished}) => {
    const outfitStartTime = useRef(moment(finishTime));
    const [hasEnded, setHasEnded] = useState(false);
    const [timeLeft, setTimeLeft] = useState(outfitStartTime.current.diff(moment(), 'seconds'));

    /**
     * Indicates  if time has run out
     * @param now - moment
     * @return {boolean}
     */
    const hasTimeRunOut = (now) => {
        return (now.isAfter(outfitStartTime.current))
    };


    useEffect(() => {
            if (hasTimeRunOut(moment())) {
                isFinished();
                setHasEnded(true);
            } else {
                const interval = setInterval(() => {
                    let now = moment();
                    if (hasTimeRunOut(now)) {
                        setHasEnded(true);
                        isFinished();
                        clearInterval(interval)
                    } else {
                        setTimeLeft(outfitStartTime.current.diff(moment(), 'seconds'));
                    }
                }, 500);
                return () => clearInterval(interval);
            }
        }, []
    );


    const formatted = moment.utc(timeLeft * 1000).format('HH:mm:ss');
    return (
        <View style={styles.container}>
            <StyledText style={styles.title}>TIME LEFT</StyledText>
            <StyledText style={styles.content}>{hasEnded? 'COMPLETED' : formatted}</StyledText>
        </View>
    );
};
CountDown.defaultProps = {
    finishTime: moment().add({'seconds': 30}).toISOString()
};

CountDown.propTypes = {
    isFinished: PropTypes.func.isRequired,
};

export default CountDown;

