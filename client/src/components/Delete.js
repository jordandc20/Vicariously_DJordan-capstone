import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios"
import API_URL from "../apiConfig.js";

const Delete = ({ onDelete, onFormClose, idToDel ,path , name}) => {
    const { user, isAuthenticated, isLoading } = useAuth0();

 
    async function handleYes() {
        try {
            console.log(path)
        const res = await axios.delete(`${API_URL}/${path}/${idToDel}`);
        onFormClose()
        onDelete(idToDel)
    } catch (error) {
        console.log(error)
    }}


    if (isLoading) { return <div>Loading ...</div>; }

    return (
        <div className="grid place-items-center  bg-yellow-50 ">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
                <h1>Do you want to delete:  {name}</h1>
                <button type="submit" className="w-full text-white-100 bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={(e) => { e.stopPropagation(); handleYes() }}>Yes</button>
                <button type="reset" className="w-full text-white-100 bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " value="Cancel" onClick={(e) => {
                    e.stopPropagation();
                    onFormClose()
                }}>No</button>
            </div>
        </div>
    )
}


export default Delete