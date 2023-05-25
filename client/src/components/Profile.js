import React, { Fragment, useState, useContext } from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import ReactModal from 'react-modal';
import { Dialog, Transition } from '@headlessui/react'

import EditUsernameForm from "./EditUsernameForm";
import { UserdataContext } from "../context/UserData";

const Profile = () => {
    const { user, isLoading } = useAuth0();
    const [showEditUsername, setShowEditUsername] = useState(false)
    const [userData, setUserData] = useContext(UserdataContext);


    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


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

                < button onClick={(e) => { e.stopPropagation(); setShowEditUsername(true) }} className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">Edit Username</button>
   
                        {/* <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setShowEditUsername(true) }}
                            className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                            Open dialog
                        </button> */}
                    <EditUsernameForm show={showEditUsername} onEditUsername={handleEditUserData} onFormClose={() => setShowEditUsername(false)} />
                <p>email: {user.email}</p>
                <h2>name: {user.name}</h2>
           
                 

            
            </div >        </div>

    )
}



export default withAuthenticationRequired(Profile);