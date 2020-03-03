import fb from "./init"
import {BADGES} from '../constants/badges';

const db = fb.database();
/**
 * Creates user if it doesn't exist
 */
const addNewUser = async ({userId, time_created}) => {
    let dbRef = db.ref('users').child(userId);
    await dbRef.transaction((userInfo) => {
        // if user exists
        if (userInfo) {
          console.log("User already exists: ", userInfo)
            // userInfo['rooms_owned'][roomId] = {time_created: time_created};
            // return userInfo;
        } else {
          console.log("User does NOT exist!")
            let meta_data = {badge: BADGES.NORMAL, number_correct: 0, number_voted: 0, time_created};
            let rooms_owned = {};
            return {meta_data, rooms_owned}
        }
    })
};



export default addNewUser;
