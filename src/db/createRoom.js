import fb from "./init"
import {BADGES} from '../constants/badges';

const db = fb.database();
/**
 * Creates a room and returns the newly generated roomId
 * @param userId - the deviceId
 * @param time_created - iso 8601 formatted
 * @param title
 * @param optionA_uri
 * @param optionB_uri
 */
const _createRoom = async ({userId, time_created, title, optionA_uri, optionB_uri}) => {

    const meta_data = {owner: userId, time_created: time_created, title: title};
    const optionA = {picture: optionA_uri};
    const optionB = {picture: optionB_uri};

    // push creates a uniqueId when it creates the entry.
    let newRoomInfo = await db.ref("rooms/active/").push().set({meta_data, optionA, optionB});

    console.log("INFO");
    console.log(newRoomInfo);
    return newRoomInfo.key;
};


/**
 * Add user info to db. Creates user if it doesn't exist
 * @param userId
 * @param roomId
 * @param time_created
 * @see https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions
 * @see https://gist.github.com/anantn/4323967
 */
const _addUserInfo = ({userId, roomId, time_created}) =>{
   let dbRef =  db.ref(`users`).child(userId);
    dbRef.transaction((userInfo)=>{
        // if user exists
        if (userInfo){
                userInfo['rooms_owned'][roomId] = {time_created: time_created};
                return;
        // if user does not exist
        }else{
            let meta_data = {badge:BADGES.NORMAL, number_correct:0, number_voted:0,time_created: timeCreated}
            let rooms_owned = {[roomId]:time_created};
            return {meta_data,rooms_owned}
        }
    })
};


const createRoom = async ({userId, time_created, title, optionA_uri, optionB_uri})=>{
    let roomId = await _createRoom({userId, time_created, title, optionA_uri, optionB_uri});
    console.log(roomId)
    //_addUserInfo({userId,time_created,roomId});
    return roomId;
};

export default createRoom;