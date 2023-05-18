import React from 'react'
import { useFormik } from "formik";
import * as yup from "yup";

// https://regex101.com/r/V5Y7rn/1/
const NewLocationForm = ({ user_id, city_id, onFormClose }) => {

  const url_regex = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/
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
      avg_cost: yup.number(),
      google_map_url: yup.string().matches(url_regex, 'Enter correct url'),
      website: yup.string().matches(url_regex, 'Enter correct url'),
      date_visited: yup.date().typeError("must be date"),
      rating: yup.string(),
      location_notes: yup.string()
    }),
    onSubmit: values => {
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values, null, 2)
      };
      console.log(requestOptions);
      formik.resetForm()
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
          <input id='location_name' type="text" name="location_name" placeholder="Location Name (foreign name)" {...formik.getFieldProps('location_name')}
          />
          {formik.touched.location_name && formik.errors.location_name ? (
            <div>{formik.errors.location_name}</div>
          ) : null}

          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
          <select id='category' as="select" name="category"  {...formik.getFieldProps('category')}>
            <option value="">Select a Category</option>
            <option value="Shopping">Shopping</option>
            <option value="Mart">Mart</option>
            <option value="FoodDrink">Food/Drink</option>
            <option value="OutdoorActivity">Outdoor Activity</option>
            <option value="IndoorActivity">Indoor Activity</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Other">Other</option>
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div>{formik.errors.category}</div>
          ) : null}

          <label htmlFor="avg_cost" className="block mb-2 text-sm font-medium text-gray-900 ">Average Cost</label>
          <select id='avg_cost' as="select" name="avg_cost"  {...formik.getFieldProps('avg_cost')}>
            <option value="">Select a price level</option>
            <option value="0">free</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
          </select>
          {formik.touched.avg_cost && formik.errors.avg_cost ? (
            <div>{formik.errors.avg_cost}</div>
          ) : null}

          <label htmlFor="google_map_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Google Maps URL</label>
          <input id='google_map_url' type="text" name="google_map_url" placeholder="Google Maps URL" {...formik.getFieldProps('google_map_url')} />
          {formik.touched.google_map_url && formik.errors.google_map_url ? (
            <div>{formik.errors.google_map_url}</div>
          ) : null}

          <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 ">Website</label>
          <input id='website' type="website" name="website" placeholder="Website" {...formik.getFieldProps('website')} />
          {formik.touched.website && formik.errors.website ? (
            <div>{formik.errors.website}</div>
          ) : null}

          <label htmlFor="date_visited" className="block mb-2 text-sm font-medium text-gray-900 ">Date Visited</label>
          <input id='date_visited' type="date_visited" name="date_visited" placeholder="mm/dd/yyyy" {...formik.getFieldProps('date_visited')} />
          {formik.touched.date_visited && formik.errors.date_visited ? (
            <div>{formik.errors.date_visited}</div>
          ) : null}

          <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 ">rating</label>
          <select id='rating' as="select" name="rating"   {...formik.getFieldProps('rating')}>
            <option value="">Select a rating level</option>
            <option value="0">Never Again</option>
            <option value="1">Kinda Bad</option>
            <option value="2">Meh OK</option>
            <option value="3">Pretty Good</option>
            <option value="4">Must Go!</option>
          </select>
          {formik.touched.rating && formik.errors.rating ? (
            <div>{formik.errors.rating}</div>
          ) : null}

          <label htmlFor="location_notes" className="block mb-2 text-sm font-medium text-gray-900 ">location_notes</label>
          <input id='location_notes' type="location_notes" name="location_notes" placeholder="New location_notes" {...formik.getFieldProps('location_notes')} />
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