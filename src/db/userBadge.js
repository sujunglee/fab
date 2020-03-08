import fb from "./init"
import {BADGES} from "../constants/badges";

const db = fb.database();

const getUserBadge = async ({ userID }) => {
    const snapshot = await db.ref("users/" + userID + "/meta_data/badge").once("value");
    return snapshot.val()||BADGES.NORMAL;
};

const setUserBadge = async ({ userID }) => {
    const snapshot = await db.ref("users/" + userID).once("value");
    let rank = null;
    if ((snapshot.val().meta_data.number_correct / snapshot.val().meta_data.number_voted >= .8) && (snapshot.val().meta_data.number_voted > 4)) {
        console.log( BADGES.INFLUENCER);

        rank = BADGES.INFLUENCER
    }
    else {
        rank = BADGES.NORMAL
    }
    if (rank !== snapshot.val().meta_data.badge) {
        let dbRef = db.ref(`users/${userID}/meta_data/badge`);
        dbRef.transaction((badge) => {
            return (badge === BADGES.INFLUENCER) ? BADGES.NORMAL : BADGES.INFLUENCER

        }).catch((error) => {
            console.log("setUserBadge failed: " + error.message)
        });
    }
};

export { getUserBadge, setUserBadge };