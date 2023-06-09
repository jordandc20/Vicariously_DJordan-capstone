import React, { useState, useEffect, createContext } from 'react'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { LifebuoyIcon } from '@heroicons/react/24/solid'

import API_URL from "../apiConfig.js";


const UserdataContext = createContext();

const UserdataProvider = ({ children }) => {
    const { isLoading, isAuthenticated, user } = useAuth0();

    const navigate = useNavigate()
    // authentication using auth0
    // fetches db userdata (username, travel_style, id) corresponding to that email using /login API route
    // set that userdata as context
    const [userData, setUserData] = useState({})
    useEffect(() => {
        if (isAuthenticated) {
            axios.post(`${API_URL}/login`, { email: user.email })
                .then(r => {
                    if (r.data.updated_at === null) { toast.success(`Welcome ${r.data.username}, Please edit your random username`) } else {
                        toast.success(`Welcome: ${r.data.username}`)
                    };
                    setUserData(r.data)
                    navigate(`/users/${r.data.id}/cities`)
                })
                .catch((err) => toast.error(`Error: ${err.message}: ${err.response.data.error}`))
        }
    }, [isAuthenticated]);

    // useEffect(() => {
    //     if (isAuthenticated) {



    //     }
    // }, [userData]);

    // render loading message
    if (isLoading) { return (<><LifebuoyIcon className='h-5 animate-spin' /><div>Loading...</div></>) }

    return (
        <UserdataContext.Provider value={[userData, setUserData]}>{children}</UserdataContext.Provider>
    )
}

export { UserdataContext, UserdataProvider }