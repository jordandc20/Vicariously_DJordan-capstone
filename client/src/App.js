import React, { useState, useEffect, createContext } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import API_URL from "./apiConfig.js";
import Home from './components/Home'
import CitiesList from './components/CitiesList';
import CityDetails from './components/CityDetails';
import Navbar from './components/Navbar'
import Profile from './components/Profile';
import { UserDataProvider } from "./context/UserData";

const UserDataContext = createContext();


function App() {
  // const [userData, setUserData] = useState([])
  const { isLoading, isAuthenticated, user } = useAuth0();


  // useEffect(() => {
  //   if (isAuthenticated) {
  //     axios.post(`${API_URL}/login`, user)
  //       .then(r => setUserData(r.data))
  //   }
  // }, [isAuthenticated, user]);


  // if (isLoading) { return <div>Loading ...</div> }


  // function handleChangeUserData(newUsername) {
  //   setUserData({
  //     ...userData, username: newUsername
  //   })
  // }


  return (
    <div className=" bg-yellow-100 h-screen">
      <Navbar />
      <UserDataProvider >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users/:userId/cities" element={<CitiesList />} />
          <Route exact path="/users/:userId/cities/:cityId" element={<CityDetails />} />
          <Route path="/profile" element={<Profile />} />
          {/* onUserDataChange={handleChangeUserData} */}
        </Routes>
      </UserDataProvider>
    </div>
  );
}

export default App;
