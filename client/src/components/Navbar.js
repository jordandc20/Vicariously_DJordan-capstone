import React from 'react'
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import Profile from './Profile';

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div>

      {!isAuthenticated && (
        <>
          <Signup />
          <Login />
          <Profile/>

        </>
      )}
      {isAuthenticated && (
        <>
          <Profile/>

          <Logout />
        </>
      )}

    </div>
  )
}

export default Navbar