import React, { useState, useContext } from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { LifebuoyIcon } from '@heroicons/react/24/solid'

import EditUsernameForm from "./EditUsernameForm";
import { UserdataContext } from "../context/UserData";
import Delete from './Delete';

const Profile = () => {
    const { user, isLoading, logout } = useAuth0();
    const [showEditUsername, setShowEditUsername] = useState(false)
    const [showDeleteAccnt, setShowDeleteAccnt] = useState(false)
    const [userData, setUserData] = useContext(UserdataContext);



    // render loading message
    if (isLoading) { return (<><LifebuoyIcon className='h-5 animate-spin' /><div>Loading...</div></>) }

    // render username change on frontend
    function handleEditUserData(newUsername) {
        setUserData({
            ...userData, username: newUsername
        })
    }

    // delete user account
    function handleDelUser(id) {
        logout({ logoutParams: { returnTo: window.location.origin } })
    }

    return (
        < div >

            <div className='flex mt-5 mb-5 justify-center  w-full'>
                <div className='flex h-fit mb-1  z-25 relative '>
                    <span className="block absolute shadow -inset-1 -skew-y-6 translate-x-3 bg-opacity-80 bg-amber-500 rounded "></span>
                    <span className="block absolute shadow -inset-1 skew-y-3 bg-sky-500 rounded  bg-opacity-80 " ></span>
                    <h1 className='h1'>Hello {userData.username} !</h1>
                </div>
            </div>
            <div className='grid-col-1 grid  mt-8 mb-5 gap-y-5 justify-center  w-full'>
                <img src={user.picture} alt={user.name} className='h-16 w-16 justify-self-center rounded'/>
                <div className=' flex  items-end'>
                    <p className=' text-gray-700 font-medium  mr-2 '>Username: </p>
                    <p>{userData.username}</p>
                < button onClick={() => { setShowEditUsername(true) }} className="rounded-md ml-3  bg-sky-600 bg-opacity-80 px-1 text-sm font-medium text-white hover:scale-105 hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">Edit Username</button>
                <EditUsernameForm show={showEditUsername} onEditUsername={handleEditUserData} onFormClose={() => setShowEditUsername(false)} />
                </div>
                <div className='flex  items-end'>
                    <p className='text-gray-700 font-medium   mr-2 '>Email: </p>
                    <p>{user.email}</p>
                </div>
                < button onClick={() => { setShowDeleteAccnt(true) }} className="w-fit justify-self-center px-2 rounded-md ml-3 bg-red-500 bg-opacity-90 py-1 text-sm font-medium text-white hover:bg-opacity-100 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">Delete Account</button>
                <Delete show={showDeleteAccnt} path="users" name={userData.username} idToDel={userData.id} onDelete={handleDelUser} onFormClose={() => setShowDeleteAccnt(false)} />
            </div >
        </div>
    )

    

}

export default withAuthenticationRequired(Profile);