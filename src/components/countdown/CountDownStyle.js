import {StyleSheet} from 'react-native';
import {sizes} from "../../constants/styles";
//Loading custom fonts --> https://dev.to/edo_begagic/add-custom-fonts-to-react-native-expo-app-54d
export const styles = StyleSheet.create({
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