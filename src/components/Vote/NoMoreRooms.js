import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import {View } from "react-native"
import StyledText from "../StyledText/StyledText";
import {colors} from "../../constants/styles";

const NoMoreRooms = () => (
    <SafeAreaView
        style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            margin: 16
        }}
    >
        <View
            style={{
                backgroundColor: colors.general.white,
                padding: 32,
                borderRadius: 20
            }}
        >
            <StyledText
                type="semibold"
                size={32}
                style={{color: colors.primary.main, textAlign: "center"}}
            >
                There are no more posts to vote on!
            </StyledText>
        </View>
    </SafeAreaView>
);

export default NoMoreRooms;