import React from "react"
import {View, StyleSheet, Keyboard, TouchableWithoutFeedback,Animated} from "react-native"
import {colors, normalize, sizes} from "../../constants/styles";
import {TextInput} from 'react-native-paper';
import StyledText from "../StyledText/StyledText";
import {MAX_TITLE_CHARS} from "../../constants/styles";
import Fade from "../Animations/Fade";
import {
    SimpleLineIcons
} from '@expo/vector-icons';

// Based on - https://callstack.github.io/react-native-paper/text-input.html

// Textbox needs a callback to update the `roomTitle` state in the PostPage component.
// also needs a way to reload and show "Enter title..."
const TitleEntry = ({placeholderText, onTitleChangeCallBack}) => {

    const [textValue, setTextValue] = React.useState('');
    const [titleCharsLeft, setTitleCharsLeft] = React.useState(MAX_TITLE_CHARS);
    const [showCharLimit, setShowCharLimit] = React.useState(false);
    const onChange = (text)=>{
            setTitleCharsLeft(MAX_TITLE_CHARS - text.length);
            setTextValue(text);
            onTitleChangeCallBack(text);

    };


    return (
        <View style={styles.container}>
            <View style={styles.icon_container}>
                <SimpleLineIcons name={'pencil'} size={normalize(22)} color={colors.general.black}/>
            </View>
            <View style={styles.text_container}>
                <TextInput
                    placeholder ={placeholderText}
                    style={{height: normalize(46), backgroundColor: colors.general.white}}
                    label={''}
                    error={titleCharsLeft < 5}
                    multiline={true}
                    onChangeText={text => {onChange(text)}}
                    maxLength={MAX_TITLE_CHARS}
                    value={textValue}
                    onBlur = {()=>setShowCharLimit(false)}
                    onFocus = {()=>setShowCharLimit(true)}
                    textBreakStrategy={'simple'}
                    numberOfLines ={2}
                    maxHeight={60}
                />

               {showCharLimit&& <Fade style={{flex:1,flexDirection: 'row-reverse' }}>
                    <StyledText  style={styles.char_limit}>{`${MAX_TITLE_CHARS-titleCharsLeft}/${MAX_TITLE_CHARS}`}</StyledText>
                </Fade>}

            </View>
        </View>
    )

};

const styles = StyleSheet.create({
    char_limit:{
        fontSize: sizes.mini.fontSize,
        color: colors.text.secondary.light,
    },
    container: {
        width: '80%',
        height: '100%',
        flexDirection: 'row',
        paddingLeft: normalize(10),
        paddingRight: normalize(10),
    },
    icon_container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_container: {
        marginTop: normalize(15),
        alignSelf:'center',
        width: '96%',
        height: '100%',
    }
});


export default TitleEntry;
