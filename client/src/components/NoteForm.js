import React, { Fragment } from 'react'

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios"
import { useParams } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'

import { toast } from 'react-hot-toast';

import { useFormik } from "formik";
import * as yup from "yup";
import API_URL from "../apiConfig.js";
const NoteForm = ({ noteData, onFormClose, onSubmit, type,show }) => {
  const { user, isLoading } = useAuth0();
  const params = useParams();

  // set data for form reuse for new/edit city/location notes
  let init_vals, header, path, fetch_type
  if (type === "newLocNote") {
    init_vals = {
      note_body: '',
      location_id: noteData.location_id
    }
    header = 'Create New Location'
    path = 'locationnotes'
    fetch_type = 'post'
  }
  else if (type === "locationnotes") {
    init_vals = {
      note_body: noteData.note_body,
      city_id: noteData.location_id
    }
    header = 'Edit Location'
    path = `locationnotes/${noteData.id}`
    fetch_type = 'patch'
  }
  else if (type === "newCityNote") {
    init_vals = {
      note_body: '',
      note_type: 'Other',
      city_id: Number(params.cityId)
    }
    header = 'Create New City'
    path = `citynotes`
    fetch_type = 'post'
  }
  else if (type === "citynotes") {
    init_vals = {
      note_body: noteData.note_body,
      note_type: noteData.note_type,
      city_id: noteData.city_id
    }
    header = 'Edit City'
    path = `citynotes/${noteData.id}`
    fetch_type = 'patch'
  }


  const formik = useFormik({
    initialValues: init_vals,
    validationSchema: yup.object({
      note_body: yup.string().required("Must enter a Note").min(3, 'Must be at least 3 characters')
        .max(50, 'Must be less  than 50 characters'),
      note_type: yup.string()

    }),
    onSubmit: values => {
      const new_values = { ...values }
      new_values['val_user_email'] = user.email
      new_values['user_id'] = Number(params.userId)

      toast.promise(
        axios(
          {
            method: fetch_type,
            url: `${API_URL}/${path}`,
            data: new_values
          })
          .then(r => {
            onSubmit(r.data)
          })
          .then(
            onFormClose()),
        {
          success: `Success: ${new_values.note_body}`,
          loading: 'Loading...',
          error: (err) => `Error: ${err.message}: ${err.response.data[Object.keys(err.response.data)[0]]}`,
        }
      )
    },
  });

  // render loading message
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
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {header} Note
                </Dialog.Title>
                <div className="mt-2">
                  <form className="space-y-6" onSubmit={formik.handleSubmit}>

                    <label htmlFor="note_body" className="block mb-2 text-sm font-medium text-gray-900 ">Note Text</label>
                    <input id='note_body' type="text" name="note_body" placeholder="note text" {...formik.getFieldProps('note_body')}
                    />
                    {formik.touched.note_body && formik.errors.note_body ? (
                      <div>{formik.errors.note_body}</div>
                    ) : null}

                    {(type === 'newCityNote' || type === 'citynotes') && (
                      <>
                        <label htmlFor="note_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <select id='note_type' as="select" name="note_type"  {...formik.getFieldProps('note_type')} >
                          <option value="Other">Select a Category</option>
                          <option value="Communication">Communication</option>
                          <option value="Safety">Safety</option>
                          <option value="Transportation">Transportation</option>
                          <option value="Other">Other</option>
                        </select>
                        {formik.touched.note_type && formik.errors.note_type ? (
                          <div>{formik.errors.note_type}</div>
                        ) : null}
                      </>

                    )}
                    <div className='button-div'>

                      <button type="submit" className="form-button">Submit</button>
                      <button type="reset" className="form-button" value="Cancel" onClick={() => {
                        // formik.resetForm();
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

export default withAuthenticationRequired(NoteForm)