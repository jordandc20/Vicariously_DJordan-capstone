
import React, { Fragment, useRef, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios"
import { useParams } from 'react-router-dom'
import { MagnifyingGlassIcon, LifebuoyIcon } from '@heroicons/react/24/solid'


import { useFormik } from "formik";
import * as yup from "yup";
import API_URL from "../apiConfig.js";
import { toast } from 'react-hot-toast'

const CityAutofill = ({ locationData, type, onFormClose, onSubmit, show }) => {
    const { user, isLoading } = useAuth0();
    // const params = useParams();
    const autoCompleteRef = useRef();
    const inputRef = useRef();

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
            city_imgs: '',
            user_id: user_id
        },
        validationSchema: yup.object({
            city_name: yup.string().required("Must enter a City name."),
            country: yup.string().required("Must enter a Country name.")
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values, { resetForm }) => {

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
                    .then(() => {
                        resetForm();
                        onFormClose()
                    })
                ,
                {
                    success: (`Success: ${values.city_name}, ${values.country}`),
                    loading: 'Loading...',
                    error: (err) => {
                        if (err.response.data[Object.keys(err.response.data)[0]] && err.response.data[Object.keys(err.response.data)[0]][0].includes('user_city_country_index')) {
                            return `Error: city and country combination already exists for this user`
                        }
                        return `Error: ${err.message}: ${err.response.data[Object.keys(err.response.data)[0]]}`
                    },
                }
            )
        },
    });



    // ########################################################


    const options = {
        fields: ["photos", "place_id", 'address_components'],
        // types: ["(cities)"]
    };
    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            // Get each component of the address from the place details,
            // and then fill-in the corresponding field on the form.
            // place.address_components are google.maps.GeocoderAddressComponent objects
            // which are documented at http://goo.gle/3l5i5Mr
            for (const component of place.address_components) {
                // @ts-ignore remove once typings fixed
                const componentType = component.types[0];

                switch (componentType) {
                    case "locality":
                        document.querySelector("#city_name").value = component.long_name;
                        formik.values.city_name = component.long_name;
                        break;
                    case "administrative_area_level_1": {
                        document.querySelector("#state").value = component.short_name;
                        break;
                    }
                    case "country":
                        document.querySelector("#country").value = component.long_name;
                        formik.values.country = component.long_name;
                        break;
                }
            }

            const city_imgs = []
            if (place.photos.length > 0) {
                const len = (place.photos.length >= 2) ? 2 : place.photos.length
                for (let i = 0; i < len; i++) {
                    city_imgs.push(place.photos[i].getUrl({
                        maxWidth: 600,
                        maxHeight: 400
                    }))
                }
            }


            formik.values.city_imgs = city_imgs;
            ;

        });
    }, []);


    // render loading message
    if (isLoading) { return (<><LifebuoyIcon className='h-5 animate-spin' /><div>Loading...</div></>) }

    return (
        <div>
            <h3 className="h3  leading-6 text-gray-900">
                {header} City
            </h3>
            <form id="address-form" className="py-4" onSubmit={formik.handleSubmit}>
                <div className='py-4 border-b-2 border-opacity-50   border-slate-500 '>
                    <label >
                        <span className="form-label">City Search: </span>
                        <div className='flex form-field w-full items-center '>

                            <MagnifyingGlassIcon className='text-slate-400 h-4 px-1 font-bold ' />
                            <input autoFocus className='bg-transparent w-full'
                                ref={inputRef}
                                id="city-autofill"
                                name="city-autofill"
                                autocomplete="off"
                                placeholder="start typing a city"
                            />
                        </div>
                    </label>
                </div>
                <h3 className="h3 my-3">You entered: </h3>
                <div className='pb-3'>
                    <label htmlFor="city_name" className="form-label after:content-['*'] after:text-red-700">City Name</label>
                    <input className='form-field w-full' id='city_name' type="text" name="city_name" placeholder="City Name" {...formik.getFieldProps('city_name')} />
                    {formik.touched.city_name && formik.errors.city_name ? (
                        <div className='text-red-700'>{formik.errors.city_name}</div>
                    ) : null}
                </div>
                <div className='pb-3'>
                    <label htmlFor="state" className="form-label  ">State/Province Name</label>
                    <input className='form-field w-full' id='state' type="text" name="state" placeholder="State/Province/Locality" {...formik.getFieldProps('state')} />
                </div>
                <div className='pb-3'>   <label htmlFor="country" className="form-label  after:content-['*'] after:text-red-700">Country Name</label>
                    <input className='form-field w-full' id='country' type="text" name="country" placeholder="Country Name" {...formik.getFieldProps('country')} />
                    {formik.touched.country && formik.errors.country ? (
                        <div className='text-red-700'>{formik.errors.country}</div>
                    ) : null}
                </div>
                <div className='button-div'>
                    <button id='cityFormSubmit' type="submit" className="form-button">Submit</button>
                    <button id='cityFormCancel' type="button" className="form-button" value="Cancel" onClick={() => {
                        onFormClose()
                    }}>Cancel</button></div>
            </form>
        </div >
    )
}

export default CityAutofill

  // // https://jsfiddle.net/gh/get/library/pure/googlemaps/js-samples/tree/master/dist/samples/places-autocomplete-addressform/jsfiddle

  //  https://www.telerik.com/blogs/integrating-google-places-autocomplete-api-react-app
  //  https://atomizedobjects.com/blog/react/how-to-use-google-autocomplete-with-react-hooks/

//   https://medium.com/@hamzaqaisrani/using-the-google-maps-places-autocomplete-javascript-api-in-a-react-project-5742bab4abc9

  //     //  var service = new window.google.maps.places.PlacesService(document.createElement("div"))

  //     //  var request = {
  //     //   placeId: "ChIJOwg_06VPwokRYv534QaPC8g"
  //     // };
  //     // service.getDetails(request, function(place, status) {
  //     //   console.log(status)
  //     //   if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  //     //     console.log(place)