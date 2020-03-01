import fb from "./init"
const db = fb.database();

const addVote = async ({roomID, selection, userID, badge}) =>{
    const rank = (badge=="influencer") ? 'voters_influencer' : 'voters_normal';
    const snapshot = await db.ref(`rooms/active/${roomID}/${selection}/${rank}`)
    .child(userID)
    .set(1)
    .catch(error => alert(error));
    return 0;
};


const updateVotes = async ({roomID, selection, userID, badge}) => {
    const voted = await addVote({roomID:roomID, selection:selection, userID: userID, badge:badge})
    const snapshot = await db.ref(`rooms/active/${roomID}`).once("value")
    const numInfluencersA = Object.keys(snapshot.val().optionA.voters_influencer)
        .length
    const numNormalA = Object.keys(snapshot.val().optionA.voters_normal).length
    const numInfluencersB = Object.keys(snapshot.val().optionB.voters_influencer)
        .length
    const numNormalB = Object.keys(snapshot.val().optionB.voters_normal).length
    const scoreA = numNormalA + numInfluencersA
    const scoreB = numNormalB + numInfluencersB
    const results = {
        numInfluencersA: numInfluencersA * 2,
        numNormalA: numNormalA,
        numInfluencersB: numInfluencersB * 2,
        numNormalB: numNormalB,
        scoreA: scoreA,
        scoreB: scoreB
    }
    return results
}


export default updateVotes;
