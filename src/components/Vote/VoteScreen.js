import React, { useEffect, useState } from "react"
import { View, Text, Image } from "react-native"
import { VoteButton, SkipButton } from "./VoteButton"
import { SafeAreaView } from "react-native-safe-area-context"
import getRoomData from "../../db/getRoomData"
import { StyledText } from "../StyledText"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import updateVotes from "../../db/updateVotes"

const enterVote = ({ navigation, roomID, selection, userID, badge }) => {
    const results = updateVotes({ roomID: roomID, selection: selection, userID: userID, badge: badge })
    //navigation.navigate('Results', { name: 'Jane' })
}

const VoteScreen = ({ navigation, roomID, userID, badge }) => {
    const [roomData, setRoomData] = useState(null);

    useEffect(() => {
        const getRoom = async () => {
            const data = await getRoomData({ roomID: roomID })
            setRoomData(data)
        }
        getRoom()
    }, [])

    //const Stack = createStackNavigator();

    return roomData ? (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    alignItems: "center",
                    height: "100%"
                }}
            >
                <View style={{ padding: 25, height: 150 }}>
                    <StyledText type="bold" size={23}>
                        {roomData.title}
                    </StyledText>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        padding: 48
                    }}
                >
                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Image source={{ uri: roomData.pictureA }} style={{ width: 150, height: 200 }} />
                        <StyledText type="bold" size={20} style={{ paddingTop: 10 }}>Option A</StyledText>
                        <VoteButton content="A" onPress={() => enterVote({
                            navigation: navigation,
                            selection: 'optionA',
                            roomID: roomID,
                            userID: userID,
                            badge: badge
                        })} />
                    </View>
                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Image source={{ uri: roomData.pictureB }} style={{ width: 150, height: 200 }} />
                        <StyledText type="bold" size={20} style={{ paddingTop: 10 }}>Option B</StyledText>
                        <VoteButton content="B" onPress={() => enterVote({
                            navigation: navigation,
                            selection: 'optionB',
                            roomID: roomID,
                            userID: userID,
                            badge: badge
                        })} />
                    </View>
                </View>
                <SkipButton />
            </View>
        </SafeAreaView>
    ) : (
            <Text>Loading...</Text>
        )
}
export default VoteScreen
