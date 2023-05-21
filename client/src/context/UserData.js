import React, { useState, useEffect, createContext } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'
import 'react-toastify/dist/ReactToastify.css';

import API_URL from "../apiConfig.js";


const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {

    const [userData, setUserData] = useState([])
    const { isLoading, isAuthenticated, user } = useAuth0();



    useEffect(() => {
        if (isAuthenticated) {
            axios.post(`${API_URL}/login`, user)
                .then(r => setUserData(r.data))
        }
    }, [isAuthenticated, user]);


    if (isLoading) { return <div>Loading ...</div> }


    return (
        <UserDataContext.Provider value={userData}>{children}</UserDataContext.Provider>
    )
}

export { UserDataProvider, UserDataContext }