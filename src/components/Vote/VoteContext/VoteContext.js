import React, {createContext, useState, useRef, useEffect} from "react"
import fb from "../../../db/init"
import Constants from 'expo-constants';
import moment from "moment";
import closeRoom from "../../../db/closeRoom";
import {getNumberOfVoters} from "../../../db/Utility";

const db = fb.database();

const getTotalNumVoters = room => {
    const {
        numInfluencersA,
        numNormalA,
        numInfluencersB,
        numNormalB
    } = getNumberOfVoters(room);
    return numInfluencersA + numNormalA + numInfluencersB + numNormalB
};


const noPreviousVote = ({room, userID}) => {
    if (("voters_normal" in room["optionA"]) && (userID in room["optionA"]["voters_normal"])) {
        return false;
    }
    if (("voters_influencer" in room["optionA"]) && (userID in room["optionA"]["voters_influencer"])) {
        return false;
    }
    if (("voters_normal" in room["optionB"]) && (userID in room["optionB"]["voters_normal"])) {
        return false;
    }
    if (("voters_influencer" in room["optionB"]) && (userID in room["optionB"]["voters_influencer"])) {
        return false;
    }
    return true;
};

const roomStillActive = ({room, roomID}) => {
    if (moment(room["meta_data"]["time_created"]).isBefore(moment().subtract(1, 'days'))) {
        closeRoom({roomID: roomID});
        return false;
    }
    return true;
};


const getActiveList = (rooms_data, seenSet) => {
    let activeRooms = [];

    for (var roomID of Object.keys(rooms_data)) {
        seenSet.add(roomID);
        if (roomStillActive({roomID: roomID, room: rooms_data[roomID]})) {
            getTotalNumVoters(rooms_data[roomID]);

            if (rooms_data[roomID]["meta_data"]["owner"] !== Constants.installationId &&
                noPreviousVote({room: rooms_data[roomID], userID: Constants.installationId})) {
                const currRoom = {
                    numVotes: getTotalNumVoters(rooms_data[roomID]),
                    id: roomID
                };
                activeRooms.push(currRoom)
            }
        }
    }

    activeRooms.sort((a, b) => (a.numVotes > b.numVotes ? 1 : -1))

    return activeRooms
};

// DO IT IN CHUNKS OF LIKE 9
const VoteContext = createContext();

const useVote = () => {
    const swiper = useRef(null);
    const [roomlist, setRoomList] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(0);

    const seenSet = useRef(new Set());
    useEffect(() => {

        // keep updating and appending.
        const handleData = (snap) => {
            if (snap.val()) {
                console.log("new");
                console.log(snap.val())
                const activeList = getActiveList(snap.val(), seenSet.current);
                console.log(activeList);
                setRoomList([...roomlist, ...activeList])
            }
        };

        // Set up initial array
        const getRooms = async () => {
            const snapshot = await db.ref("rooms/active/").once("value");
            const activeList = getActiveList(snapshot.val(),seenSet.current);
            setRoomList(activeList);
            setCurrentRoom(0);
            console.log(activeList);

            let dbRef = db.ref('rooms/active/');
            dbRef.on('child_added', handleData, (error) => alert(`[VoteContext]${error}`));
        };
        getRooms();



        return ()=>dbRef.off('child_added',handleData)
    }, []);

    return {
        roomlist,
        setRoomList,
        currentRoom,
        setCurrentRoom,
        swiper
    }
};

const VoteContextProvider = ({children}) => {
    const votingState = useVote();
    return <VoteContext.Provider value={votingState}>{children}</VoteContext.Provider>
};

export {
    VoteContext,
    VoteContextProvider
}
