import {View, Image, Modal, ImageBackground, StyleSheet, StatusBar, TouchableWithoutFeedback,TouchableOpacity} from "react-native"
import PropTypes from 'prop-types';
import ImageViewer from "react-native-image-zoom-viewer";
import CloseButton from "../CameraApp/components/CloseButton"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect, forwardRef } from "react"
import {SafeAreaView} from "react-native-safe-area-context"
import {colors, normalize} from "../../constants/styles";
import StyledText from "../StyledText/StyledText";
import { Ionicons } from '@expo/vector-icons';
import Fade from "../Animations/Fade";
import getVoteData from "../../db/getVoteData"

let x =
  "https://firebasestorage.googleapis.com/v0/b/fabapp-a1ea0.appspot.com/o/my-image.jpg?alt=media&token=995d6347-0435-41ac-96e1-91106786ab2c"

//const testPictures = 'https://i.imgur.com/VakBHis.jpg';

const RoomImages = props => {
  const {
    roomData,
    imageLoadCallback,
    setImageViewport
  } = props

  const [isImageOpen, setIsImageOpen] = useState(false)
  const [areImagesLoaded, setAreImagesLoaded] = useState({
    A: false,
    B: false
  })
  const [winningImage, setWinningImage] = useState("")

  const closeImage = () => {
      StatusBar.setHidden(false,'slide');
    StatusBar.setBarStyle('default',true);
    setIsImageOpen({state:false});
  }
  const openImageB =() =>{
    StatusBar.setBarStyle('light-content',true);
    setIsImageOpen({
        state: true,
        url: roomData.optionB.picture
    })
  }
  const openImageA = () => {
    StatusBar.setBarStyle('light-content',true);
    setIsImageOpen({
        state: true,
        url: roomData.optionA.picture
    })
  }

  useEffect(() => {
    if (areImagesLoaded.A === true && areImagesLoaded.B === true) {
      imageLoadCallback()
    }

    const votes = getVoteData(roomData)
    console.log("UPDATED VOTE DATA: ", votes)
    if (votes.scoreA > votes.scoreB) {
      setWinningImage("A")
    }
    else if (votes.scoreB > votes.scoreA) {
      setWinningImage("B")
    }

    console.log("IMAGE: ", winningImage)

  }, [areImagesLoaded])

    // sets hides or shows the status bar depending on if the image expander is open
    useEffect(()=>{
        if (isImageOpen.state){
            StatusBar.setHidden(true,'none');
        }else{
            StatusBar.setHidden(false,'slide');
            StatusBar.setBarStyle('default',true);
        }

    },[isImageOpen.state]);

    //<CloseButton closeCallBack={() => closeImage()}/>
  return (
    <View
      style={styles.container}
      onLayout={event => {
        const { x, y, width, height } = event.nativeEvent.layout
        setImageViewport({ x, y, width, height })
      }}
    >
      {/*Modal for image zoom-in + expansion*/}
      {isImageOpen.state && (

          <Modal visible={isImageOpen.state}>
            <View style={{width:'100%',height:'100%',backgroundColor:'black'}}>
                <TouchableOpacity
                    onPress={closeImage}
                    style={{
                        height: normalize(40),
                        width:normalize(40),
                        marginLeft:normalize(0),
                        marginTop:0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                     <Ionicons name="md-close" size={32} color="white" />
                </TouchableOpacity>
                <ImageViewer
                            renderIndicator={()=>{}}
                            enableImageZoom
                            enableSwipeDown
                            enablePreload
                            onSwipeDown={() => setIsImageOpen({ state: false })}
                            imageUrls={[
                              {
                                url: isImageOpen.url
                              }
                            ]}
                          />
            </View>
        </Modal>
      )}
      <View style={styles.photo_container}>
        <View style={styles.photo_option}>
              <TouchableWithoutFeedback
                  onPress={() =>
                      openImageA()
                  }>
                  <ImageBackground source={{uri:roomData.optionA.picture}} style={styles.image} onLoad={() =>
                      setAreImagesLoaded({...areImagesLoaded, A: true})}>
                      <MaterialCommunityIcons style={styles.icon_shadow}  name="arrow-expand" size={32} color="white" onPress={() =>
                         openImageA()
                      }/>
                  </ImageBackground>
              </TouchableWithoutFeedback>
          </View>
          {(winningImage == "A") ? (
            <Ionicons style={styles.icon} name="md-checkmark-circle" size={45} color="#DD8300" />
          ) : (
            <View></View>
          )}
        </View>

        <View style={styles.photo_container}>
          <View style={styles.photo_option}>
              <TouchableWithoutFeedback
                  onPress={() =>
                      openImageB()
                  }>
                  <ImageBackground source={{uri:roomData.optionB.picture}} style={styles.image} onLoad={() =>
                          setAreImagesLoaded({...areImagesLoaded, B: true})}>
                          <MaterialCommunityIcons style={styles.icon_shadow} name="arrow-expand" size={32} color="white" onPress={() =>
                             openImageB()
                          }/>
                  </ImageBackground>
              </TouchableWithoutFeedback>
          </View>
          {(winningImage == "B") ? (
            <Ionicons style={styles.icon} name="md-checkmark-circle" size={45} color="#DD8300" />
          ) : (
            <View></View>
          )}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  photo_container: {
    width: "50%",
  },
  photo_option: {
    height: "100%",
    width: "100%",
    borderColor: "#A9A9A9",
    borderWidth: 0.5,
    backgroundColor: "#E8E8E8",
    borderRadius: 2,
    // alignItems: "center",
    // justifyContent: "center"
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover"
  },
  container: {
    width: "100%",
    height: "100%",
    // justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: 'transparent'
  },
  icon_shadow:{
      shadowOpacity: .5,
      shadowRadius: 2,
      shadowColor:'#000000',
      textShadowOffset:{width: 5,height: 2},
      textShadowRadius: 10,
      shadowOffset: {
          width: 1,            // Same rules apply from above
          height: 0,           // Can't both be 0
      }
  },
  icon: {
    bottom: 20,
    left: 75
  }
});

RoomImages.propTypes = {
  roomData: PropTypes.object.isRequired,
  selectedOption: PropTypes.string,
  imageLoadCallback: PropTypes.func
}

export default RoomImages
