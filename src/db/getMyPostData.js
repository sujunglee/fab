import fb from "./init"
import { getNumberOfVoters } from './Utility'
const db = fb.database();

const getMyPostData = async ({ roomID }) => {
    var snapshot = await db.ref("rooms/active/" + roomID).once("value")
    if (!snapshot.val()) {
        snapshot = await db.ref("rooms/inactive/" + roomID).once("value")
    }
    const { numInfluencersA, numNormalA, numInfluencersB, numNormalB } = getNumberOfVoters(snapshot.val());
    const scoreA = numNormalA + numInfluencersA;
    const scoreB = numNormalB + numInfluencersB;

    return {
        title: snapshot.val().meta_data.title,
        timeCreated: snapshot.val().meta_data.time_created,
        pictureA: snapshot.val().optionA.picture,
        pictureB: snapshot.val().optionB.picture,
        numInfluencersA: numInfluencersA * 2,
        numNormalA: numNormalA,
        numInfluencersB: numInfluencersB * 2,
        numNormalB: numNormalB,
        scoreA: scoreA,
        scoreB: scoreB
    }

};

export default getMyPostData