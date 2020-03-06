import fb from "./init"
import {getNumberOfVoters} from './Utility'
const db = fb.database();

const getRoomData = async ({roomID}) => {
    var snapshot = await db.ref("rooms/active/" + roomID).once("value")
    if (!snapshot.val()) {
        snapshot = await db.ref("rooms/inactive/" + roomID).once("value")
    }
    const title = snapshot.val().meta_data.title;
    const timeCreated = snapshot.val().meta_data.time_created;
    const pictureA = snapshot.val().optionA.picture;
    const pictureB = snapshot.val().optionB.picture;


    const {numInfluencersA,numNormalA,numInfluencersB,numNormalB} = getNumberOfVoters(snapshot.val());
    const scoreA = numNormalA + numInfluencersA;
    const scoreB = numNormalB + numInfluencersB;

    return {
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
};

export default getRoomData