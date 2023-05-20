import React from 'react'
import axios from "axios"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import { useFormik } from "formik";
import * as yup from "yup";

const EditUsernameForm = ({ user_id, username, onEditUsername }) => {

    console.log(username)
    const formik = useFormik({
        initialValues: {
            username: username
        },
        validationSchema: yup.object({
            username: yup.string().min(8, 'Must be at least 8 characters')
                .max(20, 'Must be less  than 20 characters').required("Must enter a username")
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

            axios.patch(`/users/${user_id}`, values)
                .then(r => onEditUsername(r.data.username))
            // .then(onFormClose())
        },
    });



    return (
        <div className="grid place-items-center  bg-yellow-50 ">

            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
                <h1>Edit Username</h1>
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <input id='username' type="text" name="username" placeholder="username" {...formik.getFieldProps('username')}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div>{formik.errors.username}</div>
                    ) : null}
                    <button type="submit" className="w-full text-white-100 bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>
                    {/* <button type="reset" className="w-full text-white-100 bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " value="Cancel" onClick={() => {
                        // formik.resetForm();
                        // onFormClose()
                    }}>Cancel</button> */}
                </form>

            </div>

        </div>
    )
}



export default withAuthenticationRequired(EditUsernameForm)