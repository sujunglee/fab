import fb from "./init";
import * as firebase from "firebase";

const shortid = require('shortid');

const dbStorage = fb.storage();

const uploadImage = async ({uri, uploadCallback}) => {

    // Get the type of file. Either png or jpg usually
    let splitUri = uri.split('.');
    let fileType = splitUri[splitUri.length - 1];

    // Turn the uri into a file object
    const response = await fetch(uri);
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
        uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
            //console.log("UPLOADED!!!");
            uploadCallback({url})});
    });


};

export default uploadImage;
