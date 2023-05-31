import React, { Fragment } from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios"
import API_URL from "../apiConfig.js";
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react'


const Delete = ({ onDelete, onFormClose, idToDel, path, name, show }) => {
    const { user, isLoading } = useAuth0();
    const params = useParams();

    function handleDelete() {
        const new_values = {
            val_user_email: user.email,
            user_id: Object.keys(params).length  ? Number(params.userId) : idToDel
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
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onFormClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title className=" leading-6 text-gray-900">
                                   <div className='h3'> Do you want to delete:</div> 
                                    <div className='font-base border-double border-y-2 p-2  border-opacity-70 border-slate-200'>{name}</div>
                                </Dialog.Title>
                                <div className="button-div mt-3">
                                    <button type="submit" className="form-button" onClick={handleDelete}>Yes</button>
                                    <button type="reset" className="form-button" value="Cancel" onClick={onFormClose}>No</button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>

    )
}


export default withAuthenticationRequired(Delete)