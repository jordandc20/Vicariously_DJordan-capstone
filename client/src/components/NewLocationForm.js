import React from 'react'
import { useFormik } from "formik";
import * as yup from "yup";


const NewLocationForm = ({ user_id, city_id, onFormClose }) => {
  const formik = useFormik({
    initialValues: {
      location_name: '',
      category: '',
      avg_cost: '',
      google_map_url: '',
      website: '',
      date_visited: '',
      rating: '',
      location_notes: '',
      user_id: user_id,
      city_id: city_id
    },
    validationSchema: yup.object({
      location_name: yup.string().required("Must enter a location name. We suggest entering 'foreign' names in parenthesis."),
      category: yup.string(),
      avg_cost: yup.number().integer().typeError("Phone number should only contain digits"),
      google_map_url: yup.string().email("Invalid email"),
      website: yup.string(),
      date_visited: yup.string(),
      rating: yup.string(),
      location_notes: yup.string()
    }),
    onSubmit: values => {
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values, null, 2)
      };
      console.log(requestOptions)
      // fetch(`${API_URL}/users/${currentUser.id}`, requestOptions)
      //   .then(r => r.json())
      //   .then(updatedUser => setCurrentUser(updatedUser))
      //   .then(navigate("/account"))
    },
  });



  return (
    <div className="grid place-items-center  bg-yellow-50 ">

      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
        <h1>Add New Location</h1>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>

          <label htmlFor="location_name" className="block mb-2 text-sm font-medium text-gray-900 ">Location Name</label>
          <input id='location_name' type="text" name="location_name" placeholder="Location Name" {...formik.getFieldProps('location_name')}
          />
          {formik.touched.location_name && formik.errors.location_name ? (
            <div>{formik.errors.location_name}</div>
          ) : null}

          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
          <select id='category' as="select" name="category" onChange={formik.handleChange} value={formik.values.category}>
            <option value="Shopping">Shopping</option>
            <option value="OutdoorActivity">Outdoor Activity</option>
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div>{formik.errors.category}</div>
          ) : null}

          <label htmlFor="avg_cost" className="block mb-2 text-sm font-medium text-gray-900 ">avg_cost</label>
          <input id='avg_cost' type="text" name="avg_cost" placeholder="avg_cost Number" onChange={formik.handleChange} value={formik.values.avg_cost} onBlur={formik.handleBlur} />
          {formik.touched.avg_cost && formik.errors.avg_cost ? (
            <div>{formik.errors.avg_cost}</div>
          ) : null}

          <label htmlFor="google_map_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">google_map_url</label>
          <input id='google_map_url' type="text" name="google_map_url" placeholder="google_map_url Address" onChange={formik.handleChange} value={formik.values.google_map_url} />
          {formik.touched.google_map_url && formik.errors.google_map_url ? (
            <div>{formik.errors.google_map_url}</div>
          ) : null}

          <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 ">website</label>
          <input id='website' type="website" name="website" placeholder="New website" onChange={formik.handleChange} value={formik.values.website} />
          {formik.touched.website && formik.errors.website ? (
            <div>{formik.errors.website}</div>
          ) : null}
          <label htmlFor="date_visited" className="block mb-2 text-sm font-medium text-gray-900 ">date_visited</label>
          <input id='date_visited' type="date_visited" name="date_visited" placeholder="New date_visited" onChange={formik.handleChange} value={formik.values.date_visited} />
          {formik.touched.date_visited && formik.errors.date_visited ? (
            <div>{formik.errors.date_visited}</div>
          ) : null}
          <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 ">rating</label>
          <input id='rating' type="rating" name="rating" placeholder="New Password" onChange={formik.handleChange} value={formik.values.rating} />
          {formik.touched.rating && formik.errors.rating ? (
            <div>{formik.errors.rating}</div>
          ) : null}
          <label htmlFor="location_notes" className="block mb-2 text-sm font-medium text-gray-900 ">location_notes</label>
          <input id='location_notes' type="location_notes" name="location_notes" placeholder="New location_notes" onChange={formik.handleChange} value={formik.values.location_notes} />
          {formik.touched.location_notes && formik.errors.location_notes ? (
            <div>{formik.errors.location_notes}</div>
          ) : null}

          <button type="submit" className="w-full text-white-100 bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>
          <button type="reset" className="w-full text-white-100 bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " value="Cancel" onClick={() => {
            formik.resetForm();
            onFormClose()
          }}>Cancel</button>
        </form>

      </div>

    </div>
  )
}

export default NewLocationForm