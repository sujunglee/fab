import React from "react"
import {View, StyleSheet} from "react-native"
import StyledText from "../StyledText/StyledText";
import {colors, normalize, sizes} from "../../constants/styles";
import { TextInput } from 'react-native-paper';

import {
    SimpleLineIcons
} from '@expo/vector-icons';

// Based on - https://callstack.github.io/react-native-paper/text-input.html

// Textbox needs a callback to update the `roomTitle` state in the PostPage component.
// also needs a way to reload and show "Enter title..."
const TitleEntry = () => {
    const [value, onChangeText] = React.useState('Which one should I choose?');

    return (
        <View style={styles.container}>
            <View style={styles.icon_container}>
                <SimpleLineIcons name={'pencil'} size={normalize(20)} color={colors.general.black}/>
            </View>
            <View style={styles.text_container}>
              <TextInput
                  style={{width:'90%',height:'50%',backgroundColor:colors.general.white}}
                label=' '
                  multiline={true}
                value={value}
                onChangeText={text => onChangeText( text )}
              />
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
        height: '60%',
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