import fb from "./init"
import addUser from "./addUser"
const db = fb.database();

const getUserInfo = async ({userID}) => {
    var snapshot = await db.ref("users/" + userID).once("value");
    if (!snapshot.val()){
        console.log('new user', userID)
        await addUser({userID:userID});
        snapshot = await db.ref("users/" + userID).once("value");
    }
    return snapshot.val();
};

export default getUserInfo
