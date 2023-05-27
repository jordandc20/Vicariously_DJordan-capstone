import React, { useState, useContext } from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import EditUsernameForm from "./EditUsernameForm";
import { UserdataContext } from "../context/UserData";

const Profile = () => {
    const { user, isLoading } = useAuth0();
    const [showEditUsername, setShowEditUsername] = useState(false)
    const [userData, setUserData] = useContext(UserdataContext);



    // render loading message
    if (isLoading) { return <div>Loading ...</div>; }

    // render username change on frontend
    function handleEditUserData(newUsername) {
        setUserData({
            ...userData, username: newUsername
        })
    }

    return (
        < div >
            <div>
                <h1>Hello {userData.username} !</h1>
                <img src={user.picture} alt={user.name} />
                <h2>Username: {userData.username}</h2>
                < button onClick={(e) => { e.stopPropagation(); setShowEditUsername(true) }} className="open-dialog-button">Edit Username</button>
                <EditUsernameForm show={showEditUsername} onEditUsername={handleEditUserData} onFormClose={() => setShowEditUsername(false)} />
                <p>email: {user.email}</p>
            </div >
        </div>
    )
}

export default withAuthenticationRequired(Profile);