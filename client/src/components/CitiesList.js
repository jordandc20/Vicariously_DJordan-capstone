import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"
import { toast } from 'react-hot-toast';

import CityForm from './CityForm';
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import API_URL from "../apiConfig.js";
import CityCard from './CityCard';
import { UserdataContext } from "../context/UserData";
import { SquaresPlusIcon,LifebuoyIcon } from '@heroicons/react/24/solid'

const CitiesList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const { isLoading, isAuthenticated, error } = useAuth0();
  const [cities, setCities] = useState([])
  const [userData] = useContext(UserdataContext);
  const [pageUser, setPageUser] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0);
  let count = 0;


  const startSlider = () => {
    setInterval(() => {
      count = (count + 1) % 10
      setCurrentIndex(count);
    }, 5000);
  };
  useEffect(() => {
    toast.promise(
      axios.get(`${API_URL}/users/${params.userId}`)
        .then(r => {
          r.data.cities.sort((a, b) => (a.city_name > b.city_name) ? 1 : ((b.city_name > a.city_name) ? -1 : 0))
          setCities(r.data.cities)
          setPageUser({ username: r.data.username, travel_style: r.data.travel_style })
        }),
      {
        success: `Success`,
        loading: 'Loading...',
        error: (err) =>
          `Errors: ${err.message}: ${err.response.data[Object.keys(err.response.data)[0]]}`
      }
    )
  }, [params.userId]);

  useEffect(() => {
    startSlider();
  }, []);


  if ( Object.keys(pageUser).length === 0 || !cities)  { return (<><LifebuoyIcon className='h-5 animate-spin'/><div>Loading ...</div></>) }


  let loc_count = 0
  const cityCardsArray = cities.map((city) => {
    loc_count += city.locations.length
    return <CityCard key={city.id} cityData={city} currentIndex={currentIndex} onDelCity={handleDeleteCity} handleEditCity={handleEditCity} />
  })

  function handleAddCity(newCity) {
    setCities([newCity, ...cities])
  }

  function handleDeleteCity(delCityId) {
    setCities(cities => cities.filter(city => city.id !== delCityId))
  }

  function handleEditCity(editedCity) {
    const ud_cities = cities.map(city => {
      if (city.id === editedCity.id) { return editedCity }
      else { return city }
    })
    setCities(ud_cities)
  }

  // render loading message
  if (isLoading) { return (<><LifebuoyIcon className='h-5 animate-spin'/><div>Loading...</div></>) }
  if (error) { return <div>Oops... {error.message}</div>; }

  return (
    <div className=' min-h-full  flex max-w-screen flex-col justify-center -mb-4 '>
      <div className='my-3 flex flex-col'>
        <div className='flex mt-2 mb-5 justify-center  w-full'>
          <div className='flex h-fit mb-1  z-25 relative '>
            <span class="block absolute shadow -inset-1 -skew-y-6 translate-x-3 bg-opacity-80 bg-amber-500 rounded "></span>
            <span class="block absolute shadow -inset-1 skew-y-3 bg-sky-500 rounded  bg-opacity-80 " ></span>
            <h1 className="h1 ">{pageUser.username}'s Cities</h1>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <div className='flex-1' />
          <span className="inline-block bg-gray-200 rounded-bl-xl rounded-tr-xl px-3 py-1 text-sm font-semibold text-gray-700 mx-3 ">Cities Visited: {cities.length}</span>
          <span className="inline-block bg-gray-200 rounded-bl-xl rounded-tr-xl px-3 py-1 text-sm font-semibold text-gray-700 mx-3">Places Visited: {loc_count}</span>
          <div className='flex-1' >
            {(isAuthenticated && Number(params.userId) === userData.id) && (
              <div >
                <SquaresPlusIcon className="ml-auto h-7 w-7 lg:h-9 lg:w-8 mr-3 rounded text-sky-500 border-2 border-amber-400 hover:scale-105 cursor-pointer" onClick={() => setIsOpen(true)} />
                <CityForm show={isOpen} type='newCity' onFormClose={() => setIsOpen(false)} onSubmit={handleAddCity} />
              </div>)}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2   md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-stretch    min-h-full  bg-slate-100 p-6 '>
        {cityCardsArray}
      </div>
    </div>
  )
}

export default CitiesList
