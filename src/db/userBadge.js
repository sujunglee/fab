import fb from "./init"
const db = fb.database();

const getUserBadge = async ({ userID }) => {
    const snapshot = await db.ref("users/" + userID + "/meta_data/badge").once("value");
    return snapshot.val();
}

const setUserBadge = async ({ userID }) => {
    const snapshot = await db.ref("users/" + userID).once("value");
    var rank = "none";
    if ((snapshot.val().meta_data.number_correct / snapshot.val().meta_data.number_voted >= .8) && (snapshot.val().meta_data.number_voted > 4)) {
        console.log('influencer');
        rank = "influencer"
    }
    else {
        rank = "normal"
    }
    if (rank != snapshot.val().meta_data.badge) {
        let dbRef = db.ref(`users/${userID}/meta_data/badge`);
        dbRef.transaction((badge) => {
            return (badge == "influencer") ? "normal" : "influencer"

        }).catch((error) => {
            console.log("setUserBadge failed: " + error.message)
        });
    }
}

export { getUserBadge, setUserBadge };