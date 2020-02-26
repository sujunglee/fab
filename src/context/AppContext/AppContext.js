import React, { createContext, useState, useEffect } from "react"
import getUserInfo from "../../db/getUserInfo";

const SAMPLE_USERID = "jbrain98";


const initialState ={
    isLoggedIn: false,
    user: null,
};

const AppContext = createContext(initialState);

const AppContextProvider = ({children})=>{
    const [state, setState] = useState(initialState);

    useEffect(()=>{
        // load data with hardcoded userId
        getUserInfo({userID: SAMPLE_USERID}).then((user)=>{
            setState({
                ...state,
                isLoggedIn:true,
                user})
            }
        )
    }, []);
    return <AppContext.Provider value={state}>{children}</AppContext.Provider>
};

export {
    AppContext,
    AppContextProvider
}