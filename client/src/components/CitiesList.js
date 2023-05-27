import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"
import { toast } from 'react-hot-toast';

import CityForm from './CityForm';
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import API_URL from "../apiConfig.js";
import CityCard from './CityCard';
import { UserdataContext } from "../context/UserData";
import { SquaresPlusIcon } from '@heroicons/react/24/solid'

const CitiesList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const { isLoading, isAuthenticated, error } = useAuth0();
  const [cities, setCities] = useState([])
  const [userData] = useContext(UserdataContext);
  const [pageUser, setPageUser] = useState({})

  useEffect(() => {
    toast.promise(
      axios.get(`${API_URL}/users/${params.userId}`)
        .then(r => {
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
  if (!cities) { return <div>Loading cities...</div> }

  let loc_count=0
  const cityCardsArray = cities.map((city) => {
    loc_count += city.locations.length
    return <CityCard key={city.id} cityData={city} onDelCity={handleDeleteCity} handleEditCity={handleEditCity} />
  })

  function handleAddCity(newCity) {
    setCities([...cities, newCity])
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
  if (isLoading) { return <div>Loading ...</div> }
  if (error) { return <div>Oops... {error.message}</div>; }

  return (
    <div className=' h-screen '>
      <div className='flex flex-col w-full'>
        <div className='flex justify-center'>
          <h1 className="h1">{pageUser.username}  Cities</h1>
        </div>
        <div className='flex justify-center'>
          <span className="inline-block bg-gray-200 rounded-bl-xl rounded-tr-xl px-3 py-1 text-sm font-semibold text-gray-700 mx-3 ">Cities Visited: {cities.length}</span>
          <span className="inline-block bg-gray-200 rounded-bl-xl rounded-tr-xl px-3 py-1 text-sm font-semibold text-gray-700 mx-3">Places Visited: {loc_count}</span>
        </div>
        {(isAuthenticated && Number(params.userId) === userData.id) && (
          <div className='flex justify-end'>
            <SquaresPlusIcon className="h-7 w-7 lg:h-9 lg:w-8 mr-3 rounded text-sky-500 border-2 border-amber-400 hover:scale-105" onClick={() => setIsOpen(true)} />
              <CityForm show={isOpen} type='newCity' onFormClose={() => setIsOpen(false)} onSubmit={handleAddCity} />
          </div>)}
      </div>
      <div className='flex grow flex-wrap  place-content-around'>
        {cityCardsArray}
      </div>
    </div>
  )
}

export default CitiesList
