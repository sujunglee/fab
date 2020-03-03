import React, { useState, useEffect } from "react"
import { View, Image, Modal, ImageBackground, StyleSheet } from "react-native"
import PropTypes from 'prop-types';
import ImageViewer from "react-native-image-zoom-viewer";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {colors, sizes} from "../../constants/styles";
import {StyledText} from "../StyledText";
import CloseButton from "../CameraApp/components/CloseButton"

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
        <View>
            {isImageOpen.state && (
                <Modal visible={isImageOpen.state}>
                    <ImageBackground source={{url:isImageOpen.url}} style={styles.preview}>
                        <CloseButton closeCallBack={() => setIsImageOpen({state:false})}/>
                    </ImageBackground>
                    {/* <ImageViewer
                        enableImageZoom
                        enableSwipeDown
                        onSwipeDown={() => setIsImageOpen({ state: false })}
                        imageUrls={[
                            {
                                url: isImageOpen.url
                            }
                        ]}
                    /> */}
                </Modal>
            )}

            <View
                style={{
                    flexDirection: "row"
                }}
            >
                <View
                    style={{ alignItems: "center", flex: 1 }}
                >
                    <TouchableWithoutFeedback
                        onPress={() =>
                            setIsImageOpen({
                                state: true,
                                url: roomData.room.optionA.picture
                            })
                        }
                    >
                        <Image
                            source={{ uri: roomData.room.optionA.picture }}
                            style={{ width: 200, height: 300, aspectRatio:4/3, minWidth:200, maxWidth:200, minHeight:300, maxHeight:300 }}
                            onLoad={() =>
                                setAreImagesLoaded({ ...areImagesLoaded, A: true })
                            }
                            resizeMode="contain"
                        />
                    </TouchableWithoutFeedback>
                    {selectedOption === "optionA" && <YourVote />}
                </View>
                <View
                    style={{ alignItems: "center", flex: 1, marginHorizontal: 4 }}
                >
                    <TouchableWithoutFeedback
                        onPress={() =>
                            setIsImageOpen({
                                state: true,
                                url: roomData.room.optionB.picture
                            })
                        }
                    >
                        <Image
                            source={{ uri: roomData.room.optionB.picture }}
                            style={{ width: 200, height: 300, position: "relative", aspectRatio:4/3, minWidth:200, maxWidth:200, minHeight:300, maxHeight:300}}
                            onLoad={() =>
                                setAreImagesLoaded({ ...areImagesLoaded, B: true })
                            }
                            resizeMode="contain"
                        />
                    </TouchableWithoutFeedback>
                    {selectedOption === "optionB" && <YourVote />}
                </View>
            </View>

        </View>


    )

};

RoomImages.propTypes = {
    roomData: PropTypes.object.isRequired,
    selectedOption: PropTypes.string,
    imageLoadCallback: PropTypes.func
};

const styles =  StyleSheet.create({
    preview: {
        height: '100%',
        width: '100%',
        borderRadius:20,
        overflow:'hidden',
        flexDirection: 'row'
    }
});
export default RoomImages;