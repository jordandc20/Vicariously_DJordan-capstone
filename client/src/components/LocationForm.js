import React, { Fragment } from 'react'
import axios from "axios"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react'
import {LifebuoyIcon} from '@heroicons/react/24/solid'

import API_URL from "../apiConfig.js";

// https://regex101.com/r/V5Y7rn/1/
const LocationForm = ({ locationData, onFormClose, onSubmit, type, show }) => {
  const { isLoading, user } = useAuth0();
  const params = useParams();

  const url_regex = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w?[a-zA-Z-_%/@?]+)*([^/\w?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/
  const google_regex = /^(http|https):\/\/(goo\.gl\/maps|www\.google\.com\/maps)/



  let init_vals, header, path, fetch_type
  if (type === "newLocation") {
    init_vals = {
      location_name: '',
      avg_cost: '',
      google_map_url: '',
      website: '',
      date_visited: '',
      rating: '',
      category: 'Other',
      user_id: Number(params.userId),
      city_id: Number(params.cityId)
    }
    header = 'Create New'
    path = 'locations'
    fetch_type = 'post'
  }
  else if (type === "editLocation") {
    const date = new Date(locationData.date_visited);
    const month_render = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day_render = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    init_vals = {
      location_name: locationData.location_name ?? "",
      category: locationData.category ?? "",
      avg_cost: locationData.avg_cost ?? "",
      google_map_url: locationData.google_map_url ?? "",
      website: locationData.website ?? "",
      date_visited: locationData.date_visited !== null ? `${month_render}/${day_render}/${date.getFullYear()}` : locationData.date_visited ?? "",
      rating: locationData.rating ?? "",
      user_id: locationData.user_id ?? "",
      city_id: locationData.city_id ?? ""
    }
    header = 'Edit'
    path = `locations/${locationData.id}`
    fetch_type = 'patch'
  }




  const formik = useFormik({
    initialValues: init_vals,
    validationSchema: yup.object({
      location_name: yup.string().required("Must enter a location name."),
      category: yup.string(),
      avg_cost: yup.number(),
      google_map_url: yup.string().matches(google_regex, 'Enter correct google url syntax, must include http or https'),
      website: yup.string().matches(url_regex, 'Enter correct url'),
      date_visited: yup.string().matches('^(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}$', 'Enter date as mm/dd/yyyy').typeError("must be date"),
      rating: yup.number()
    }),
    onSubmit:  (values, { resetForm }) => {
      const new_values = { ...values }
      Object.keys(new_values).forEach((key) => {
        if (new_values[key] === '') {
          new_values[key] = null;
        }
      })
      if (new_values.date_visited) { new_values.date_visited = new Date(new_values.date_visited) }
      if (new_values.rating) { new_values.rating = parseInt(new_values.rating, 10) }
      if (new_values.avg_cost) { new_values.avg_cost = parseInt(new_values.avg_cost, 10) }
      new_values['val_user_email'] = user.email

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
          .then(()=>
          {resetForm()
            onFormClose()}),
        {
          success: `Success: ${new_values.location_name}`,
          loading: 'Loading...',
          error: (err) => `Error: ${err.message}: ${err.response.data[Object.keys(err.response.data)[0]]}`
        }
      )
    },
  });

  // render loading message
  if (isLoading)     { return (<><LifebuoyIcon className='h-5 animate-spin'/><div>Loading...</div></>) }



  return (


    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onFormClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"                        >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-4 px-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="h3 leading-6 text-gray-900">
                  {header} Location
                </Dialog.Title>

                <form className="pt-2 " onSubmit={formik.handleSubmit}>

                  <div className='pb-3'>
                    <label htmlFor="location_name" className="form-label after:content-['*'] after:text-red-700">Location Name</label>
                    <input  className='form-field w-full'  id='location_name' type="text" name="location_name" placeholder="Enter Location Name" {...formik.getFieldProps('location_name')}
                    />
                    {formik.touched.location_name && formik.errors.location_name ? (
                      <div className='text-red-700'>{formik.errors.location_name}</div>
                    ) : null}
                  </div>
                  <div className='pb-3'>
                    <label htmlFor="category" className="form-label ">Category</label>
                    <select  className='form-field '  id='category' as="select" name="category"  {...formik.getFieldProps('category')}>
                      <option value="Other">Select a Category</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Mart">Mart</option>
                      <option value="FoodDrink">Food/Drink</option>
                      <option value="OutdoorActivity">Outdoor Activity</option>
                      <option value="IndoorActivity">Indoor Activity</option>
                      <option value="Accommodation">Accommodation</option>
                      <option value="Other">Other</option>
                    </select>
                    {formik.touched.category && formik.errors.category ? (
                      <div className='text-red-700'>{formik.errors.category}</div>
                    ) : null}
                  </div>
                  <div className='pb-3'>
                    <label htmlFor="avg_cost" className="form-label ">Average Cost</label>
                    <select  className='form-field '  id='avg_cost' as="select" name="avg_cost"  {...formik.getFieldProps('avg_cost')}>
                      <option value="">Select a price level</option>
                      <option value="0">free</option>
                      <option value="1">$</option>
                      <option value="2">$$</option>
                      <option value="3">$$$</option>
                    </select>
                    {formik.touched.avg_cost && formik.errors.avg_cost ? (
                      <div className='text-red-700'>{formik.errors.avg_cost}</div>
                    ) : null}
                  </div>
                  <div className='pb-3'>
                    <label htmlFor="google_map_url" className="form-label dark:text-white">Google Maps URL</label>
                    <input className='form-field w-full'  id='google_map_url' type="text" name="google_map_url" placeholder="Google Maps link" {...formik.getFieldProps('google_map_url')} />
                    {formik.touched.google_map_url && formik.errors.google_map_url ? (
                      <div className='text-red-700'>{formik.errors.google_map_url}</div>
                    ) : null}
                  </div>
                  <div className='pb-3'>
                    <label htmlFor="website" className="form-label ">Website URL</label>
                    <input className='form-field w-full' id='website' type="website" name="website" placeholder="Website link" {...formik.getFieldProps('website')} />
                    {formik.touched.website && formik.errors.website ? (
                      <div className='text-red-700'>{formik.errors.website}</div>
                    ) : null}
                  </div>
                  <div className='pb-3'>
                    <label htmlFor="date_visited" className="form-label ">Date Visited</label>
                    <input className='form-field ' id='date_visited' type="date_visited" name="date_visited" placeholder="mm/dd/yyyy" {...formik.getFieldProps('date_visited')} />
                    {formik.touched.date_visited && formik.errors.date_visited ? (
                      <div className='text-red-700'>{formik.errors.date_visited}</div>
                    ) : null}
                  </div>
                  <div className='pb-3'>
                    <label htmlFor="rating" className="form-label ">Rating</label>
                    <select  className='form-field '  type='number' id='rating' as="select" name="rating"   {...formik.getFieldProps('rating')}>
                      <option value="">Select a rating level</option>
                      <option value="0">Never Again</option>
                      <option value="1">Kinda Bad</option>
                      <option value="2">Meh OK</option>
                      <option value="3">Pretty Good</option>
                      <option value="4">Must Go!</option>
                    </select>
                    {formik.touched.rating && formik.errors.rating ? (
                      <div className='text-red-700'>{formik.errors.rating}</div>
                    ) : null}
                  </div>
                  <div className='button-div'>

                    <button type="submit" className="form-button">Submit</button>
                    <button type="reset" className="form-button" value="Cancel" onClick={() => {
                      onFormClose()
                    }}>Cancel</button>
                  </div>
                </form>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>

  )
}

export default withAuthenticationRequired(LocationForm)