import db from "./init"

const getUserInfo = async ({userID}) => {
    const snapshot = await db.ref("users/" + userID).once("value");
    return snapshot.val();
};

export default getUserInfo
