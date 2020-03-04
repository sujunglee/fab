import {Dimensions, Platform, PixelRatio} from 'react-native';

/*****************************************************/
/*** Below is based on: https://stackoverflow.com/questions/33628677/react-native-responsive-font-size*/
/*****************************************************/
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export const normalize = (size) => {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
};
/*****************************************************/
/*****************************************************/

export const MAX_TITLE_CHARS = 140;

export const sizes = {
    mini: {
        fontSize: normalize(12),
    },
    small: {
        fontSize: normalize(15),
    },
    medium: {
        fontSize: normalize(17),
    },
    large: {
        fontSize: normalize(20),
    },
    xlarge: {
        fontSize: normalize(24),
    },
};


export const colors = {
    primary: {
        main: '#1563AF',
        light: '#71B2E2'
    },
    secondary: {
        main: '#DD8300'
    },
    text: {
        primary: {
            main: '#323232',
            light: '#414141'
        },
        secondary: {
            main: '#737474',
            light: '#A6A5A5'
        }
    },
    general: {
        white: '#F4F4F4',
        black: '#323232',
        hot_purple: '#9a0036'
    }
};
