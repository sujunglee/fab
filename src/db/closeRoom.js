import fb from "./init"
import { getNumberOfVoters } from './Utility'
import { setUserBadge } from "./userBadge"
const db = fb.database();

const incCorrectVoteCount = ({ userID }) => {
    let dbRef = db.ref(`users/${userID}/meta_data/number_correct`);
    dbRef.transaction((counter) => {
        return counter ? counter + 1 : 1

    }).catch((error) => {
        console.log("incCorrectVoteCount failed: " + error.message)
    });
};

const getWinners = ({ room }) => {
    const { numInfluencersA, numNormalA, numInfluencersB, numNormalB } = getNumberOfVoters(room);
    const scoreA = numNormalA + numInfluencersA;
    const scoreB = numNormalB + numInfluencersB;
    if (scoreA > scoreB) {
        awardA({ room: room })
    }
    else if (scoreB == scoreA) {
        awardA({ room: room })
        awardB({ room: room })
    }
    else {
        awardB({ room: room })
    }
}

const awardA = ({ room }) => {
    if ("voters_normal" in room["optionA"]) {
        Object.keys(room["optionA"]["voters_normal"]).map(user => (
            incCorrectVoteCount({ userID: user })
        ))
    }
    if ("voters_influencer" in room["optionA"]) {
        Object.keys(room["optionA"]["voters_influencer"]).map(user => (
            incCorrectVoteCount({ userID: user })
        ))
    }
}

const awardB = ({ room }) => {
    if ("voters_normal" in room["optionB"]) {
        Object.keys(room["optionB"]["voters_normal"]).map(user => (
            incCorrectVoteCount({ userID: user })
        ))
    }
    if ("voters_influencer" in room["optionB"]) {
        Object.keys(room["optionB"]["voters_influencer"]).map(user => (
            incCorrectVoteCount({ userID: user })
        ))
    }
}

const updateBadges = ({ room }) => {
    if ("voters_normal" in room["optionA"]) {
        Object.keys(room["optionA"]["voters_normal"]).map(user => (
            setUserBadge({ userID: user})
        ))
    }
    if ("voters_influencer" in room["optionA"]) {
        Object.keys(room["optionA"]["voters_influencer"]).map(user => (
            setUserBadge({ userID: user })
        ))
    }
    if ("voters_normal" in room["optionB"]) {
        Object.keys(room["optionB"]["voters_normal"]).map(user => (
            setUserBadge({ userID: user })
        ))
    }
    if ("voters_influencer" in room["optionB"]) {
        Object.keys(room["optionB"]["voters_influencer"]).map(user => (
            setUserBadge({ userID: user })
        ))
    }
}

const closeRoom = async ({ roomID }) => {
    console.log('closeroom')
    var snapshot = await db.ref("rooms/active/" + roomID).once("value")
    if (snapshot.val()) {
        getWinners({ room: snapshot.val() })
        updateBadges({ room: snapshot.val() })
        await db.ref(`rooms/inactive`)
            .child(roomID)
            .set(snapshot.val())
            .catch(error => alert(error));
        let dbRef = db.ref("rooms/active/" + roomID);
        dbRef.remove()
            .catch((error) => {
                console.log("remove failed: " + error.message)
            });
    }
};


export default closeRoom;