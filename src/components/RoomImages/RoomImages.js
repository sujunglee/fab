import React, { useState, useEffect } from "react"
import { View, Image, Modal , ImageBackground,StyleSheet} from "react-native"
import PropTypes from 'prop-types';
import ImageViewer from "react-native-image-zoom-viewer";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {StyledText} from "../StyledText";
import {colors, normalize, sizes} from "../../constants/styles";

let x = 'https://firebasestorage.googleapis.com/v0/b/fabapp-a1ea0.appspot.com/o/my-image.jpg?alt=media&token=995d6347-0435-41ac-96e1-91106786ab2c'

const YourVote = () => (
    <View
        style={{
            backgroundColor: colors.secondary.main,
            width: "100%",
            alignItems: "center",
            paddingVertical: 8,
            position: "relative",
            top: -60
        }}
    >

        <StyledText size={sizes.medium.fontSize} type={'regular'} style={{ position: "relative", color:colors.general.white}} >
            YOUR VOTE
        </StyledText>
    </View>
);


const RoomImages = ({roomData,selectedOption, imageLoadCallback}) =>{
    console.log(selectedOption);

    const [isImageOpen, setIsImageOpen] = useState(false);
    const [areImagesLoaded, setAreImagesLoaded] = useState({
        A: false,
        B: false
    });

    useEffect(()=>{
        if(areImagesLoaded.A===true && areImagesLoaded.B===true){
            imageLoadCallback();
         }
        },
        [areImagesLoaded]
    );

    return (
        <View style={styles.container}>

                <View
                    style={styles.photo_option}
                >
                    <Image
                            source={{ uri: roomData.room.optionA.picture }}
                            style={styles.image}
                            onLoad={() =>
                                setAreImagesLoaded({ ...areImagesLoaded, A: true })
                            }
                            resizeMode="cover"
                        />
                </View>
                <View
                    style={styles.photo_option}
                >
                    <Image
                            source={{ uri: roomData.room.optionB.picture }}
                            style={styles.image}
                            onLoad={() =>
                                setAreImagesLoaded({ ...areImagesLoaded, B: true })
                            }
                            resizeMode="cover"
                        />

                </View>

        </View>
    )
};


const styles = StyleSheet.create({
    photo_option: {
        width: '48%',
        height: '60%',
        borderColor: '#A9A9A9',
        borderWidth: 0.5,
        backgroundColor: '#E8E8E8',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 2,
    },
    container: {
        width: '100%',
        height: '60%',
        justifyContent: 'space-around',
        marginBottom: normalize(100),
        flexDirection: 'row'
    },
});



RoomImages.propTypes = {
    roomData: PropTypes.object.isRequired,
    selectedOption: PropTypes.string,
    imageLoadCallback: PropTypes.func
};

export default RoomImages;