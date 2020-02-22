import React, {useState, useEffect, useRef} from 'react';
import moment from "moment";
import {StyleSheet, Text, View} from 'react-native';
import {styles} from "./CountDownStyle";
import PropTypes from 'prop-types';

/**
 * Displays the countdown clock of a outfit
 *
 * ToDo: Load startTime directly from Db
 * @param isFinished() - Callback when the room is done
 * @author jideanene2020@u.northwestern.edu
 */
const CountDown = ({startTime, isFinished}) => {
    const DUMMY_TIME = moment().add({'seconds': 30}).toISOString();

    const outfitStartTime = useRef(moment(DUMMY_TIME));
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
            <Text style={styles.title}>TIME LEFT</Text>
            <Text style={styles.content}>{hasEnded? 'COMPLETED' : formatted}</Text>
        </View>
    );
};

export default CountDown;

CountDown.propTypes = {
    isFinished: PropTypes.func.isRequired,
};
