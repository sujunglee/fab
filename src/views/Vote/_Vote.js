import React from "react"
import {VoteContextProvider} from "../../components/Vote/VoteContext/VoteContext";
import Vote from "../../components/Vote/Vote";

const _Vote = ()=>(
    <VoteContextProvider>
      <Vote/>
    </VoteContextProvider>
);

export default _Vote;