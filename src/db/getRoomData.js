import db from "./init"

const getRoomData = async ({roomID}) => {
    const snapshot = await db.ref("rooms/active/" + roomID).once("value")
    const title = snapshot.val().meta_data.title;
    const timeCreated = snapshot.val().meta_data.time_created;
    const pictureA = snapshot.val().optionA.picture;
    const pictureB = snapshot.val().optionB.picture;
    const numInfluencersA = Object.keys(snapshot.val().optionA.voters_influencer)
        .length
    const numNormalA = Object.keys(snapshot.val().optionA.voters_normal).length
    const numInfluencersB = Object.keys(snapshot.val().optionB.voters_influencer)
        .length
    const numNormalB = Object.keys(snapshot.val().optionB.voters_normal).length
    const scoreA = numNormalA + numInfluencersA
    const scoreB = numNormalB + numInfluencersB
    const results = {
        title: title,
        timeCreated: timeCreated,
        pictureA: pictureA,
        pictureB: pictureB,
        numInfluencersA: numInfluencersA * 2,
        numNormalA: numNormalA,
        numInfluencersB: numInfluencersB * 2,
        numNormalB: numNormalB,
        scoreA: scoreA,
        scoreB: scoreB
    }
    return results
}

export default getRoomData