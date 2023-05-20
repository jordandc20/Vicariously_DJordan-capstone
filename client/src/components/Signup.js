import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
const Signup = () => {
    const { loginWithRedirect } = useAuth0();

    const handleSignUp = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/",
            },
            authorizationParams: {
                screen_hint: "signup",
            },
        });
    };

    return (
        <button className="button__sign-up" onClick={handleSignUp}>
            This_is_the_SignUP_button
        </button>
    );
}

export default Signup