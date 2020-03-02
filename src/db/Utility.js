/**
 * Gives the number of voters for a given room
 * @param room
 */
export const getNumberOfVoters = (room) =>{

    let numInfluencersA = 0;
    let numNormalA = 0;
    let numInfluencersB = 0;
    let numNormalB = 0;

    if ('voters_influencer' in room.optionA){
        numInfluencersA = Object.keys(room.optionA.voters_influencer).length;
    }

    if ('voters_normal' in room.optionA){
        numNormalA = Object.keys(room.optionA.voters_normal).length;
    }

    if ('voters_influencer' in room.optionB){
        numInfluencersB = Object.keys(room.optionB.voters_influencer).length;
    }

    if ('voters_normal' in room.optionB){
        numNormalB = Object.keys(room.optionB.voters_normal).length;
    }

    return {
        numInfluencersA,
        numNormalA,
        numInfluencersB,
        numNormalB
    }
};