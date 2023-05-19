import React from 'react'

import { useFormik } from "formik";
import * as yup from "yup";

const NewCityForm = ({ user_id, onFormClose, onSubmitNew }) => {


  const formik = useFormik({
    initialValues: {
      city_name: '',
      country: '',
      user_id: user_id
    },
    validationSchema: yup.object({
      city_name: yup.string().required("Must enter a City name. We suggest entering 'foreign' names in parenthesis."),
      country: yup.string().required("Must enter a Country name.")
    }),
    onSubmit: values => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values, null, 2)
      };
      fetch('/cities', requestOptions)
        .then(r => r.json())
        .then(r => onSubmitNew(r))
        .then(onFormClose())
    },
  });



  return (
    <div className="grid place-items-center  bg-yellow-50 ">

      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
        <h1>Add New City</h1>
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




          <button type="submit" className="w-full text-white-100 bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>
          <button type="reset" className="w-full text-white-100 bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " value="Cancel" onClick={() => {
            // formik.resetForm();
            onFormClose()
          }}>Cancel</button>
        </form>

      </div>

    </div>
  )
}

export default NewCityForm