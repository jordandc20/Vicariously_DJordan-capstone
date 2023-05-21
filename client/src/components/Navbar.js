import React from 'react'
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from '../images/vicariously_logo.png'
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';

const Navbar = ({ userData }) => {
  const { isAuthenticated } = useAuth0();


  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full ">
     <NavLink to='/' className="flex items-center">
                    <img src={logo} width={150} height={100} alt='Vicariously logo' />
                </NavLink>

      <div>
        <NavLink className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5" to='/'>Home</NavLink>
      </div>
      {!isAuthenticated && (
        <>
          <div>   <Signup className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5" />  </div>
          <div>     <Login className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5" />  </div>
        </>
      )}
      {isAuthenticated && (
        <>
          <NavLink className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5" to='/profile'>My Profile</NavLink>
          <NavLink className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5" to={"/users/"+userData.id+'/cities'}>My Cities</NavLink>
          <div>       <Logout className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-5" /> </div>
        </>
      )}
    </nav>
  )
}

export default Navbar