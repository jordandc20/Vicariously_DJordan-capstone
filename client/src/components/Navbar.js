import React, { useContext, useState } from 'react'

import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from '../images/vicariously_logo.png'
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import About from './About';
import { UserdataContext } from "../context/UserData";
import { FiMenu } from "react-icons/fi"
const Navbar = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [userData] = useContext(UserdataContext);
  const [openNavMenu, setOpenNavMenu] = useState(false);

  // render loading message
  if (isLoading) { return <div>Loading ...</div> }






  return (
    <header className=" border-b border-gray-300 bg-white shadow-lg py-2">
      <div className='flex flex-wrap items-center justify-between  lg:mx-auto max-w-full pl-[3%]  pr-[1%]  w-full'>
        <NavLink to='/' >
          <img src={logo} width={150} height={100} alt='Vicariously logo' />
        </NavLink>

        < FiMenu className='lg:hidden block h-6 w-6 cursor-pointer' onClick={() => setOpenNavMenu(!openNavMenu)} />
        <nav className={`${openNavMenu ? "block" : "hidden"}  w-full lg:grow lg:flex lg:justify-between lg:items-center lg:mx-auto lg:w-auto`}>
          <div className='w-full lg:flex lg:justify-between lg:items-center  lg:w-auto lg:grow '>

            <div className=' lg:grow  lg:flex lg:justify-center lg:items-center lg:w-auto '>
              <NavLink className="nav-button" to='/' onClick={() => setOpenNavMenu(!openNavMenu)}>Home</NavLink>
              <NavLink className="nav-button" to='/about' onClick={() => setOpenNavMenu(!openNavMenu)}>About</NavLink>
              {isAuthenticated && userData && (
                <>
                  <NavLink className="nav-button" to='/profile' onClick={() => setOpenNavMenu(!openNavMenu)}>My Profile</NavLink>
                  <NavLink className="nav-button" to={"/users/" + userData.id + '/cities'} onClick={() => setOpenNavMenu(!openNavMenu)}>My Cities</NavLink>
                </>)}
            </div>
            <div className=' lg:flex  lg:justify-between lg:w-auto '>

              {!isAuthenticated && (
                <>
                  < Login />
                  < Signup />
                </>
              )}
              {isAuthenticated && userData && (
                <Logout />
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>


  )
}

export default Navbar