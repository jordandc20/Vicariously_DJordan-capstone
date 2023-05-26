import React, { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { NoSymbolIcon, PencilSquareIcon } from '@heroicons/react/24/solid'

import Delete from './Delete';
import { UserdataContext } from "../context/UserData";
import CityForm from './CityForm';

const CityCard = ({ cityData, onDelCity, handleEditCity }) => {
  const [userData] = useContext(UserdataContext);
  const { isLoading, isAuthenticated } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const [expandEditCity, setExpandEditCity] = useState(false);
  const params = useParams();
  const navigate = useNavigate()
  const { city_name, city_notes, country, id, locations, user_id } = cityData;

  if (!cityData) { return <div>Loading city data...</div> }

  // render loading message
  if (isLoading) { return <div>Loading ...</div> }


  function handleCityCardClick(e) {
    navigate(`/users/${params.userId}/cities/${id}`)
  }


  return (
    < div className="rounded hover:scale-105 m-2 shadow-md bg-amber-50"  onClick={handleCityCardClick} >
        <div className='flex justify-end'>
          <div className=" grow px-6 py-3">
            <h3 className="text-gray-700 text-xl text-base font-bold capitalize ">{city_name}</h3>
            <p className=" text-m mb-2 capitalize">{country}</p>
          </div>
          {(isAuthenticated && Number(params.userId) === userData.id) && (
            <div className='mr-3 mt-1'>
              <div >
                <PencilSquareIcon className="h-5 w-5 lg:h-7 lg:w-7 mb-1 rounded-md text-sky-500  hover:scale-110" onClick={(e) => { e.stopPropagation(); setExpandEditCity(true) }} />
                  <CityForm show={expandEditCity} locationData={cityData} type='editCity' onFormClose={() => setExpandEditCity(false)} onSubmit={handleEditCity} />

              </div>
              <div >
                <NoSymbolIcon className="h-5 w-5 lg:h-7 lg:w-7  rounded-full text-red-500  hover:scale-110" onClick={(e) => { e.stopPropagation(); setIsOpen(true) }} />
                  <Delete show={isOpen} idToDel={id} path='cities' name={city_name} onFormClose={() => setIsOpen(false)} onDelete={onDelCity} />
              </div>
            </div>
          )}
        </div>
        <div className="button-div">
          <span className="px-2 py-1 block  bg-gray-200 rounded-xl  text-sm font-semibold text-gray-700 mb-2 ml-2 mr-1">City notes: {city_notes.length}</span>
          <span className="px-2 py-1 block  bg-gray-200 rounded-xl  text-sm font-semibold text-gray-700 mb-2 mr-2 ml-1">Places: {locations.length}</span>
        </div>
      </div>
  )
}

export default CityCard