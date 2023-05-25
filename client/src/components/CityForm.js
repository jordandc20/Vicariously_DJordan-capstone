import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios"
import { useParams } from 'react-router-dom'


import { useFormik } from "formik";
import * as yup from "yup";
import API_URL from "../apiConfig.js";
import { toast } from 'react-hot-toast';

const CityForm = ({ locationData, type, onFormClose, onSubmit }) => {
  const { user, isLoading } = useAuth0();
  const params = useParams();

  let user_id, header, path, fetch_type, country, city_name
  if (type === "newCity") {
    user_id = Number(params.userId)
    city_name = ''
    country = ''
    header = 'Create New'
    path = 'cities'
    fetch_type = 'post'
  }
  else if (type === "editCity") {
    user_id = locationData.user_id
    city_name = locationData.city_name
    country = locationData.country
    header = 'Edit'
    path = `cities/${locationData.id}`
    fetch_type = 'patch'
  }

  const formik = useFormik({
    initialValues: {
      city_name: city_name,
      country: country,
      user_id: user_id
    },
    validationSchema: yup.object({
      city_name: yup.string().required("Must enter a City name. We suggest entering 'foreign' names in parenthesis."),
      country: yup.string().required("Must enter a Country name.")
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: values => {
      const new_values = { ...values }
      new_values['val_user_email'] = user.email
      toast.promise(
        axios(
          {
            method: fetch_type,
            url: `${API_URL}/${path}`,
            data: new_values
          }
        )
          .then(r => {
            onSubmit(r.data)
          })
          .then(onFormClose())
        ,
        {
          success: (`Success: ${values.city_name}, ${values.country}`),
          loading: 'Loading...',
          error: (err) => {
            if (err.response.data.errors && err.response.data.errors[0].includes('user_city_country_index')) {
              return `Error: city and country combo already exists for this user`
            }
            if (err.response.data.errors) {
              return `Error: ${err.response.data.errors[0]}`
            }
            return `Error: ${err.message}: ${err.response.data.error}`
          },
        }
      )
    },
  });

  // render loading message
  if (isLoading) { return <div>Loading ...</div>; }

  return (
    <div className="grid place-items-center  ">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
        <h1>{header} City</h1>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>

          <label htmlFor="city_name" className="block mb-2 text-sm font-medium text-gray-900 ">City Name</label>
          <input id='city_name' type="text" name="city_name" placeholder="City Name (foreign name)" {...formik.getFieldProps('city_name')}
          />
          {formik.touched.city_name && formik.errors.city_name ? (
            <div>{formik.errors.city_name}</div>
          ) : null}

          <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country Name</label>
          <input id='country' type="text" name="country" placeholder="Country Name" {...formik.getFieldProps('country')} />
          {formik.touched.country && formik.errors.country ? (
            <div>{formik.errors.country}</div>
          ) : null}
          <div className='form-button-div'>
          <button id='cityFormSubmit' type="submit" className="form-button">Submit</button>
          <button id='cityFormCancel' type="reset" className="form-button" value="Cancel" onClick={() => {
            onFormClose()
          }}>Cancel</button></div>
        </form>
      </div>
    </div>
  )
}

export default withAuthenticationRequired(CityForm)