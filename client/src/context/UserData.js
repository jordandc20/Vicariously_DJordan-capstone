import React, { useState, useEffect, createContext } from 'react'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-hot-toast';

import API_URL from "../apiConfig.js";
import { validateYupSchema } from 'formik';


const UserdataContext = createContext();

const UserdataProvider = ({ children }) => {
    const { isLoading, isAuthenticated, user } = useAuth0();

    // authentication using auth0
    // fetches db userdata (username, travel_style, id) corresponding to that email using /login API route
    // set that userdata as context
    const [userData, setUserData] = useState({})
    useEffect(() => {
        if (isAuthenticated) {
            axios.post(`${API_URL}/login`, { email: user.email })
                .then(r => { setUserData(r.data) })
                .catch((err) => toast.error(`Error: ${err.message}: ${err.response.data.error}`))
        }
    }, [user, isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            if (userData.updated_at === null) { toast.success(`Welcome ${userData.username}, Please edit your random username`) } else {
                toast.success(`Welcome: ${userData.username}`)
            };
        }
    }, [userData]);

    // render loading message
    if (isLoading) { return <div>Loading ...</div> }

    return (
        <UserdataContext.Provider value={[userData, setUserData]}>{children}</UserdataContext.Provider>
    )
}

export { UserdataContext, UserdataProvider }