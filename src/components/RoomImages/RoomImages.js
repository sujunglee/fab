import React, {useState, useEffect} from "react"
import {View, Image, Modal, ImageBackground, StyleSheet, StatusBar, TouchableWithoutFeedback} from "react-native"
import PropTypes from 'prop-types';
import ImageViewer from "react-native-image-zoom-viewer";
import {StyledText} from "../StyledText";
import CloseButton from "../CameraApp/components/CloseButton"
import {colors, normalize, sizes} from "../../constants/styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

        <StyledText size={sizes.medium.fontSize} type={'regular'}
                    style={{position: "relative", color: colors.general.white}}>
            YOUR VOTE
        </StyledText>
    </View>
);

//const testPictures = 'https://i.imgur.com/VakBHis.jpg';

const RoomImages = ({roomData, selectedOption, imageLoadCallback}) => {
    console.log(selectedOption);
    console.log(roomData);

    //roomData.room.optionA.picture = testPictures;
    //roomData.room.optionB.picture = testPictures;
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [areImagesLoaded, setAreImagesLoaded] = useState({
        A: false,
        B: false
    });

    const closeImage = () => {
        StatusBar.setBarStyle('default',true);
        setIsImageOpen({state:false});
    }
    const openImageB =() =>{
        StatusBar.setBarStyle('light-content',true);
        setIsImageOpen({
            state: true,
            url: roomData.room.optionB.picture
        })
    }
    const openImageA = () => {
        StatusBar.setBarStyle('light-content',true);
        setIsImageOpen({
            state: true,
            url: roomData.room.optionA.picture
        })
    }
    useEffect(() => {
            if (areImagesLoaded.A === true && areImagesLoaded.B === true) {
                imageLoadCallback();
            }
        },
        [areImagesLoaded]
    );

    return (
        <View style={styles.container}>


            {/*Modal for image zoom-in + expansion*/}
            {isImageOpen.state &&
            
            <Modal visible={isImageOpen.state}>
                <ImageBackground source={{url:isImageOpen.url}} style={styles.container}>
                        <CloseButton closeCallBack={() => closeImage()}/>
                </ImageBackground>
                {/*<ImageViewer
                    enableImageZoom
                    enableSwipeDown
                    onSwipeDown={() => setIsImageOpen({state: false})}
                    imageUrls={[
                        {
                            url: isImageOpen.url
                        }
                    ]}
                />*/}
            </Modal>}

            <View style={styles.photo_option}>
                <TouchableWithoutFeedback style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.15)'}}
                    onPress={() =>
                        openImageA()
                    }>
                    <ImageBackground source={{uri:roomData.room.optionA.picture}} style={styles.image} onLoad={() =>
                            setAreImagesLoaded({...areImagesLoaded, A: true})}>
                        <MaterialCommunityIcons name="arrow-expand" size={32} color="white" onPress={() =>
                        openImageA()
                    }/>    
                    </ImageBackground>
                    {/* <Image
                        source={{uri: roomData.room.optionA.picture}}
                        style={styles.image}
                        onLoad={() =>
                            setAreImagesLoaded({...areImagesLoaded, A: true})
                        }
                    /> */}
                </TouchableWithoutFeedback>

                {selectedOption === "optionA" && <YourVote />}
            </View>

            <View style={styles.photo_option}>
                <TouchableWithoutFeedback style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.15)'}}
                    onPress={() =>
                        openImageB()
                    }>
                    <ImageBackground source={{uri:roomData.room.optionB.picture}} style={styles.image} onLoad={() =>
                            setAreImagesLoaded({...areImagesLoaded, B: true})}>
                            <MaterialCommunityIcons name="arrow-expand" size={32} color="white" onPress={() =>
                            openImageB()
                    }/>    
                    </ImageBackground>
                   {/*  <Image
                        source={{uri: roomData.room.optionB.picture}}
                        style={styles.image}
                        onLoad={() =>
                            setAreImagesLoaded({...areImagesLoaded, B: true})
                        }
                    />
                    <MaterialCommunityIcons name="arrow-expand" size={32} color="white" /> */}
                </TouchableWithoutFeedback>

                 {selectedOption === "optionB" && <YourVote />}
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    photo_option: {
        width: '48.5%',
        height: '100%',
        borderColor: '#A9A9A9',
        borderWidth: 0.5,
        backgroundColor: '#E8E8E8',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',

    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
});


RoomImages.propTypes = {
    roomData: PropTypes.object.isRequired,
    selectedOption: PropTypes.string,
    imageLoadCallback: PropTypes.func
};

export default RoomImages;