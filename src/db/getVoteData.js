import db from "./init"
///might want to delete and just use getRoomData
const getVoteData = async ({roomID}) => {
    const snapshot = await db.ref("rooms/active/" + roomID).once("value")
    console.log("SNAPSHOT: ", snapshot.val())
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

export default getVoteData
