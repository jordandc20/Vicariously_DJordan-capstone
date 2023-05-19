import React, { useState, useEffect } from 'react'
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
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =useAuth0();

  console.log(user)
console.log(isAuthenticated)
console.log(isLoading)



  useEffect(() => {
    async function fetchData() {
      const r = await axios.get('/users/1');
      setUserData(r.data)
    }
    fetchData()
  }, [])


if (isLoading) {
  return <div>Loading ...</div>;
}

  function handleAddCity(newCity) {
    setUserData({
      ...userData, cities: [...userData.cities, newCity],
    })
  }

  return (
    <div className=" bg-yellow-100 h-screen">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/users/:userId/cities" element={<CitiesList userCitiesData={userData.cities} user_id={userData.id} onAddNewCity={handleAddCity} />} />
        <Route exact path="/users/:userId/cities/:cityId" element={<CityDetails userCitiesData={userData.cities}/>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
