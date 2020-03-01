import fb from "./init"
const db = fb.database();

const getUserBadge = async ({userID}) => {
    const snapshot = await db.ref("users/" + userID + "/meta_data/badge").once("value");
    return snapshot.val();
}

const setUserBadge = async ({userID}) => {
    const snapshot = await db.ref("users/" + userID + "/meta_data/badge").once("value");
    return snapshot.val();
}

export { getUserBadge, setUserBadge};