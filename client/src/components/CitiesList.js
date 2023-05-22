import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"
import ReactModal from 'react-modal';
import NewCityForm from './NewCityForm';
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import API_URL from "../apiConfig.js";
import CityCard from './CityCard';
import { UserdataContext } from "../context/UserData";

const CitiesList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const { isLoading, isAuthenticated ,error} = useAuth0();
  const [cities, setCities] = useState()
  const [userData] = useContext(UserdataContext);

  useEffect(() => {
    async function fetchData() {
      const r = await axios.get(`${API_URL}/users/${params.userId}`)
      setCities(r.data.cities)
    }
    fetchData()
  }, [params.userId, setCities]);


  const cityCardsArray = cities?.map((city) => {
    return <CityCard key={city.id} cityData={city} onDelCity={handleDeleteCity} />
  })

  // / ? waits for data   ... like a ternary? ... once the data is available, then continue to map\
  // const cityCardsArray = userCitiesData ? userCitiesData?.map((city) => {
  //   return <CityCard  key={city.id} cityData ={city} />
  // }) : null

  function handleAddCity(newCity) {
    setCities([...cities, newCity])
  }

  function handleDeleteCity(delCityId) {
    setCities(cities => cities.filter(city => city.id !== delCityId))
  }

  // render loading message
  if (isLoading) { return <div>Loading ...</div> }
  if (error) {    return <div>Oops... {error.message}</div>;
  }

  return (
    <div className='flex sm:flex-row sm:text-left sm:justify-between py-4 px-6'>
      {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
        < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setIsOpen(true)}>New City</button>
        <ReactModal  isOpen={isOpen} contentLabel="Example Modal" onRequestClose={() => setIsOpen(false)}>
          <NewCityForm onFormClose={() => setIsOpen(false)} onSubmitNew={handleAddCity} />
        </ReactModal>
      </div>)}
      {cityCardsArray}
    </div>
  )
}

export default CitiesList
