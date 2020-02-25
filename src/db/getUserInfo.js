import db from "./init"

const getUserInfo = async ({userID}) => {
    const snapshot = await db.ref("users/" + userID).once("value");
    return {
        badge: snapshot.val().badge,
        numcorrect: snapshot.val().number_correct,
        numvoted: snapshot.val().number_voted,
        rooms: snapshot.val().rooms_owned
    }
}


export default getUserInfo;