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
      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full ">
         <div className="mb-2 sm:mb-0">
            <NavLink className="text-2xl no-underline text-grey-darkest hover:text-blue-dark" to='/'>Vicariously</NavLink>
         </div>
         <div>
            <NavLink className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5" to='/'>Home</NavLink>
            <NavLink className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5" to='/users/1/cities'>My Cities</NavLink>
         </div>
         <div>

      {!isAuthenticated && (
        <>

          <Signup className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5"  />
          <Login className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5" />
            <NavLink className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5" to='/profile'>My Profile</NavLink>

        </>
      )}
      {isAuthenticated && (
        <>
          <NavLink className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5" to='/profile'>My Profile</NavLink>

          <Logout className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5"  />
        </>
      )}

    </div>
      </nav>
   )
}

export default Navbar