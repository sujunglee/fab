import React, { createContext, useState, useEffect } from "react"
import getUserInfo from "../../db/getUserInfo";
import db from "../../db/init"
import Constants from 'expo-constants';

//const SAMPLE_USERID = "jbrain98";


const initialState = {
    isLoggedIn: false,
    user: null,
};

const AppContext = createContext(initialState);



const AppContextProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    /*
    //does not work
    useEffect(() => {
        const handleData = snap => {
            if (snap.val()) {
                setState({
                    ...state,
                    isLoggedIn: true,
                    user
                })
            }
        }
        db.ref("users/" + SAMPLE_USERID).on('value', handleData, error => alert(error));
        return () => { db.off('value', handleData); };
    }, []);
    */


    useEffect(() => {
        // load data with hardcoded userId
        getUserInfo({ userID: Constants.installationId }).then((user) => {
            setState({
                ...state,
                isLoggedIn: true,
                userID: Constants.installationId,
                user
            })
        }
        )
    }, []);

    return <AppContext.Provider value={state}>{children}</AppContext.Provider>
};

export {
    AppContext,
    AppContextProvider
}