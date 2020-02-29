import { StyleSheet, Dimensions } from 'react-native';
const { width: winWidth, height: winHeight } = Dimensions.get('window');

export const cameraHeaderStyle =  {
    title: 'Camera',
    headerStyle: {
        backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

