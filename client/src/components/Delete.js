import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios"
import API_URL from "../apiConfig.js";
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';


const Delete = ({ onDelete, onFormClose, idToDel, path, name }) => {
    const { user, isLoading } = useAuth0();
    const params = useParams();

    function handleDelete() {

        const new_values = {
            val_user_email: user.email,
            user_id: Number(params.userId)
        }

        toast.promise(
            axios.delete(`${API_URL}/${path}/${idToDel}`, { data: new_values })
                .then(() => {
                    onDelete(idToDel)
                })
                .then(onFormClose()),
            {
                success: `Deleted: ${name}`,
                loading: 'Loading...',
                error: (err) => `Error: ${err.message}: ${err.response.data[Object.keys(err.response.data)[0]]}`,
            }
        )
    }


    if (isLoading) { return <div>Loading ...</div>; }

    return (
        <div className="grid place-items-center  ">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
                <h1>Do you want to delete: {name}</h1>
                <button type="submit" className="form-button" onClick={handleDelete}>Yes</button>
                <button type="reset" className="form-button" value="Cancel" onClick={onFormClose}>No</button>
            </div>
        </div>
    )
}


export default withAuthenticationRequired(Delete)