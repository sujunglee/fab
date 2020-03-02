import React from "react"
import {View, StyleSheet} from "react-native"
import StyledText from "../../components/StyledText/StyledText";
import {colors, normalize, sizes} from "../../constants/styles";

import {
    SimpleLineIcons
} from '@expo/vector-icons';

// Textbox needs a callback to update the `roomTitle` state in the PostPage component.

const TitleEntry = () => {
    return (
        <View style={styles.container}>
            <View style={styles.icon_container}>
                <SimpleLineIcons name={'pencil'} size={normalize(20)} />
            </View>
            <View style={styles.text_container}>
                <StyledText> What Cardigan should I wear for a big presentation today and tommorow?</StyledText>
            </View>
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: '100%',
        flexDirection: 'row',
        paddingLeft: normalize(10),
        paddingRight: normalize(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon_container:{
        width: '16%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_container:{
        width:'96%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
});


export default TitleEntry;