import fb from "./init"
const db = fb.database();

const getUserInfo = async ({userID}) => {
    const snapshot = await db.ref("users/" + userID).once("value");
    console.log("The given user ID: ", userID);
    console.log("!!!SNAPSHOT!!!: ", snapshot)
    return snapshot.val();
};

export default getUserInfo
