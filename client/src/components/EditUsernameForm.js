import React, { Fragment, useContext } from 'react'

import { toast } from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react'

import axios from "axios"
import { withAuthenticationRequired } from "@auth0/auth0-react";

import { useFormik } from "formik";
import * as yup from "yup";
import API_URL from "../apiConfig.js";
import { UserdataContext } from "../context/UserData";


const EditUsernameForm = ({ onEditUsername, onFormClose, show }) => {
    const [userData] = useContext(UserdataContext);

    const formik = useFormik({
        initialValues: {
            username: userData.username
        },
        validationSchema: yup.object({
            username: yup.string().matches(/^[a-zA-Z0-9]+$/, 'only a-z letters and numbers allowed').min(8, 'Must be at least 8 characters')
                .max(20, 'Must be less  than 20 characters').required("Must enter a username").test("email-include-domain", "No change to username", value => value !== userData.username)

            // .test('Unique Email', 'Email already in use', // <- key, message
            //     function (value) {
            //         return new Promise((resolve, reject) => {
            //             axios.get(`/users/${value}`)
            //                 .then((res) => {
            //                     console.log('sucess')
            //                     resolve(true)
            //                 })
            //                 .catch((error) => {
            //                     console.log(error)
            //                     if (error.response.data.content === "User not found") {
            //                         resolve(false);
            //                     }
            //                 })
            //         })
            //     }
            // )
            ,
        }),
        onSubmit: values => {
            toast.promise(
                axios.patch(`${API_URL}/users/${userData.id}`, values)
                    .then(r => {
                        onEditUsername(r.data.username)
                    })
                    .then(onFormClose()),
                {
                    success: (`Successfully updated: ${values.username}`),
                    loading: 'Loading...',
                    error: (err) => `Error: ${err.message}: ${err.response.data[Object.keys(err.response.data)[0]]}`,
                }
            )
        },
    });



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
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Edit Username
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                                        <input id='username' type="text" name="username" placeholder="username" {...formik.getFieldProps('username')}
                                        />
                                        {formik.touched.username && formik.errors.username ? (
                                            <div>{formik.errors.username}</div>
                                        ) : null}
                                        <div className='button-div'>
                                            <button type="submit" className="form-button">Submit</button>
                                            <button type="reset" className="form-button" value="Cancel" onClick={() => {
                                                onFormClose()
                                            }}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>

    )
}

export default withAuthenticationRequired(EditUsernameForm)
