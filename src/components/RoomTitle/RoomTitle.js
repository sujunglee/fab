import React from "react"
import { View } from "react-native"
import { StyledText } from "../StyledText"
import {colors, sizes} from "../../constants/styles";
import PropTypes from "prop-types";
import {Title} from "react-native-paper";

const RoomTitle = ({title}) =>{
    return (
        <View style={{ maxHeight: 150 , alignSelf:'center'}}>
            <Title size={sizes.small.fontSize} style={{color:colors.text.primary.main}}>
                {title}
            </Title>
        </View>

    )
};

RoomTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default RoomTitle;