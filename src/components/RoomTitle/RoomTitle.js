import React from "react"
import { View } from "react-native"
import { StyledText } from "../StyledText"
import {colors, sizes} from "../../constants/styles";
import PropTypes from "prop-types";

const RoomTitle = ({title}) =>{
    return (
        <View style={{ maxHeight: 150 }}>
            <StyledText type="bold" size={sizes.small.fontSize} style={{color:colors.text.primary.main}}>
                {title}
            </StyledText>
        </View>

    )
};

RoomTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default RoomTitle;