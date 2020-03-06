import fb from "./init"
import {getNumberOfVoters} from './Utility'

const db = fb.database();

///might want to delete and just use getRoomData
const getVoteData = async ({roomID}) => {
    var snapshot = await db.ref("rooms/active/" + roomID).once("value")
    if (!snapshot.val()) {
        snapshot = await db.ref("rooms/inactive/" + roomID).once("value")
    }
    console.log("SNAPSHOT: ", snapshot.val());

    const {numInfluencersA,numNormalA,numInfluencersB,numNormalB} = getNumberOfVoters(snapshot.val());
    const scoreA = numNormalA + numInfluencersA;
    const scoreB = numNormalB + numInfluencersB;
    return {
        numInfluencersA: numInfluencersA * 2,
        numNormalA: numNormalA,
        numInfluencersB: numInfluencersB * 2,
        numNormalB: numNormalB,
        scoreA: scoreA,
        scoreB: scoreB
    }
};

export default getVoteData
