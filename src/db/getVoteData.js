import fb from "./init"
import {getNumberOfVoters} from './Utility'


///might want to delete and just use getRoomData
const getVoteData =  (roomData) => {

    const {numInfluencersA,numNormalA,numInfluencersB,numNormalB} = getNumberOfVoters(roomData);
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
