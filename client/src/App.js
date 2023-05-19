import React, { useState, useEffect, createContext } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home'
import CitiesList from './components/CitiesList';
import CityDetails from './components/CityDetails';
import Navbar from './components/Navbar'
import Profile from './components/Profile';

function App() {
  const [userData, setUserData] = useState([])
  const { isLoading, isAuthenticated, user } = useAuth0();


  useEffect(() => {
    if (isAuthenticated) {
      axios.post('/login', user)
        .then(r => setUserData(r.data))
    }
  }, [isAuthenticated, user]);


  if (isLoading) { return <div>Loading ...</div> }


  function handleChangeUserData(newUsername) {
    setUserData({
      ...userData, username: newUsername
    })
  }


  return (
    <div className=" bg-yellow-100 h-screen">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/users/:userId/cities" element={<CitiesList userData={userData} />} />
        <Route exact path="/users/:userId/cities/:cityId" element={<CityDetails userData={userData} />} />
        <Route path="/profile" element={<Profile userData={userData} onUserDataChange={handleChangeUserData} />} />
      </Routes>
    </div>
  );
}

export default App;
