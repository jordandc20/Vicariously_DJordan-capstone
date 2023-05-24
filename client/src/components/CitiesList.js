import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"
import ReactModal from 'react-modal';
import { toast } from 'react-hot-toast';

import CityForm from './CityForm';
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import API_URL from "../apiConfig.js";
import CityCard from './CityCard';
import { UserdataContext } from "../context/UserData";

const CitiesList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const { isLoading, isAuthenticated, error } = useAuth0();
  const [cities, setCities] = useState()
  const [userData] = useContext(UserdataContext);

  useEffect(() => {
    toast.promise(
      axios.get(`${API_URL}/users/${params.userId}`)
        .then(r => {
          setCities(r.data.cities)
        }),
      {
        success: `Success`,
        loading: 'Loading...',
        error: (err) => `Error: ${err.message}: ${err.response.data.error}`,
      }
    )
  }, [params.userId]);

  if (!cities) { return <div>Loading cities...</div> }

  const cityCardsArray = cities.map((city) => {
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
    <div className='flex sm:flex-row sm:text-left sm:justify-between py-4 px-6'>
      {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
        < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setIsOpen(true)}>New City</button>
        <ReactModal appElement={document.getElementById('root') || undefined} isOpen={isOpen} contentLabel="New City Modal" onRequestClose={() => setIsOpen(false)}>
          <CityForm type='newCity' onFormClose={() => setIsOpen(false)} onSubmit={handleAddCity} />
        </ReactModal>
      </div>)}
      {cityCardsArray}
    </div>
  )
}

export default CitiesList
