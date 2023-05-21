import React, { useState, useEffect, createContext } from 'react'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'
import 'react-toastify/dist/ReactToastify.css';

import API_URL from "../apiConfig.js";


const UserdataContext = createContext();

const UserdataProvider = ({ children }) => {
    const [userData, setUserData] = useState({})
    const { isLoading, isAuthenticated, user } = useAuth0();

    // authentication using auth0
    // fetches db userdata (username, travel_style, id) corresponding to that email using /login API route
    // set that userdata as context
    useEffect(() => {
        if (isAuthenticated) {
            axios.post(`${API_URL}/login`, user)
                .then(r => setUserData(r.data))
        }
    }, [isAuthenticated, user]);

    // render loading message
    if (isLoading) { return <div>Loading ...</div> }

    return (
        <UserdataContext.Provider value={[userData,setUserData]}>{children}</UserdataContext.Provider>
    )
}

export { UserdataContext, UserdataProvider }