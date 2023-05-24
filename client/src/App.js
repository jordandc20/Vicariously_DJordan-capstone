import React, { useState, useEffect, useContext } from 'react'
import { Route, Routes ,useLocation} from 'react-router-dom'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home'
import CitiesList from './components/CitiesList';
import CityDetails from './components/CityDetails';
import Navbar from './components/Navbar'
import Profile from './components/Profile';
import { UserdataProvider } from "./context/UserData";
import { toast, ToastBar, Toaster } from 'react-hot-toast';


function App() {
  const location = useLocation();
  useEffect(() => {
    // Dismiss all active toasts
    
    toast.dismiss()
   }, [location])
 
  return (
    <>
    <div><Toaster/></div>
    <div className=" bg-yellow-100 h-screen">
      <UserdataProvider >
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users/:userId/cities" element={<CitiesList />} />
          <Route exact path="/users/:userId/cities/:cityId" element={<CityDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserdataProvider>
    </div>
    </>
  );
}

export default App;
