import React, { createContext, useState, useRef } from "react"

const VoteContext = createContext();

const useVote = ()=>{
      const swiper = useRef(null);
      const [roomlist, setRoomList] = useState(null);
      const [currentRoom, setCurrentRoom] = useState(0);
      return {
          roomlist,
          setRoomList,
          currentRoom,
          setCurrentRoom,
          swiper
      }
};

const VoteContextProvider = ({ children }) => {
    const votingState = useVote();
    return <VoteContext.Provider value={votingState}>{children}</VoteContext.Provider>
};

export {
    VoteContext,
    VoteContextProvider
}
