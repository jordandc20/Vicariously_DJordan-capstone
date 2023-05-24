import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {

    const { isAuthenticated, loginWithPopup, } = useAuth0();
  



    return !isAuthenticated &&(
        <button  onClick={() => loginWithPopup()} >This_is_the_Log_In_Button</button>
    )
};


export default Login