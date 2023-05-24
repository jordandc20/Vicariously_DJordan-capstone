import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {

    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()} >This_is_the_Log_In_Button</button>

};


export default Login