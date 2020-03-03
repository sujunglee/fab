import fb from "./init"
import {BADGES} from '../constants/badges';

const db = fb.database();
/**
 * Creates a room and returns the newly generated roomId
 * @param userId - the deviceId
 * @param time_created - iso 8601 formatted
 * @param title
 * @param outfitA_url
 * @param outfitB_url
 */
const _createRoom = async ({userId, time_created, title, outfitA_url, outfitB_url}) => {

    const meta_data = {owner: userId, time_created: time_created, title: title};
    const optionA = {picture: outfitA_url};
    const optionB = {picture: outfitB_url};

    // push creates a uniqueId when it creates the entry.
    let newPostRef = await db.ref("rooms/active/").push();
    await newPostRef.set({meta_data, optionA, optionB});

    return newPostRef.key;
};


/**
 * Add user info to db. Creates user if it doesn't exist
 * @param userId
 * @param roomId
 * @param time_created
 * @see https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions
 * @see https://gist.github.com/anantn/4323967
 */
const _addUserInfo = async ({userId, roomId, time_created}) => {
    let dbRef = db.ref('users').child(userId);
    await dbRef.transaction((userInfo) => {
        // if user exists
        if (userInfo) {
            userInfo['rooms_owned'][roomId] = {time_created: time_created};
            return userInfo;
            // if user does not exist
        } else {
            let meta_data = {badge: BADGES.NORMAL, number_correct: 0, number_voted: 0, time_created};
            let rooms_owned = {[roomId]: time_created};
            return {meta_data, rooms_owned}
        }
    })
};


const createRoom = async ({userId, time_created, title, outfitA_url, outfitB_url})=>{

    let roomId = await _createRoom({userId, time_created, title, outfitA_url, outfitB_url});
    await _addUserInfo({userId, time_created, roomId});

    return roomId;
};

export default createRoom;
