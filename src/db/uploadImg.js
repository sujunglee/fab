import fb from "./init";
import * as firebase from "firebase";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
const shortid = require('shortid');

const dbStorage = fb.storage();


/**
 * Compress image
 * @see https://stackoverflow.com/questions/50257879/expo-camera-takepictureasync-imagemanipulator
 * @see https://stackoverflow.com/questions/50257879/expo-camera-takepictureasync-imagemanipulator
 * @param uri
 */
const compressImage = async ({uri}) => {
    let originalInfo = await FileSystem.getInfoAsync(uri, {'size': true});
    console.log(`Original image size: ${originalInfo.size} bytes, or ${originalInfo.size / Math.pow(2, 20)} mb`);

    let resizedPhoto = await ImageManipulator.manipulateAsync(
        uri,
        [],
        {compress: 0, format: "jpeg", base64: false}
    );
    let compressedInfo = await FileSystem.getInfoAsync(resizedPhoto.uri, {'size': true});
    console.log(`Compressed image size: ${compressedInfo.size} or ${compressedInfo.size / Math.pow(2, 20)} mb`);
    console.log(`Percent reduction: ${((originalInfo.size - compressedInfo.size) / originalInfo.size * 100)}%`);

    const directoryName = FileSystem.documentDirectory + 'images';
    const fileName = `${directoryName}/${shortid.generate()}.jpeg`;

    await FileSystem.makeDirectoryAsync(directoryName,{'intermediates':true});
    await FileSystem.moveAsync({from: resizedPhoto.uri, to: fileName});
    
    return fileName;
};

const uploadImage = async ({uri, uploadCallback}) => {

    // compress image
    const compressedUri = await compressImage({uri});

    // Get the type of file. Either png or jpeg usually
    let splitUri = compressedUri.split('.');
    let fileType = splitUri[splitUri.length - 1];

    // Turn the compressedUri into a file object
    const response = await fetch(compressedUri);
    const blob = await response.blob();

    // Upload to fire storage
    let filename = `${shortid.generate()}.${fileType}`;
    let ref = dbStorage.ref().child(filename);
    let uploadTask = ref.put(blob);


    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                //console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                //console.log('Upload is running');
                break;
        }
    }, function (error) {
        // Handle unsuccessful uploads
    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            //console.log("UPLOADED!!!");
            uploadCallback({url})
        });
    });


};

export default uploadImage;
