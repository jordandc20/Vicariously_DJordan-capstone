import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { LifebuoyIcon, NoSymbolIcon, PencilSquareIcon } from '@heroicons/react/24/solid'

import Delete from './Delete';
import { UserdataContext } from "../context/UserData";
import CityForm from './CityForm';

const CityCard = ({ cityData, onDelCity, handleEditCity, currentIndex }) => {
  const [userData] = useContext(UserdataContext);
  const { isLoading, isAuthenticated } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const [expandEditCity, setExpandEditCity] = useState(false);
  const params = useParams();
  const navigate = useNavigate()

  const { city_name, city_notes, country, id, locations, user_id, city_imgs } = cityData;


  if (!cityData)   { return (<><LifebuoyIcon className='h-5 animate-spin'/><div>Loading  city data...</div></>) }

  function handleCityCardClick(e) {
    navigate(`/users/${params.userId}/cities/${id}`)
  }



  // render loading message
  if (isLoading)     { return (<><LifebuoyIcon className='h-5 animate-spin'/><div>Loading...</div></>) }


  return (
    < div className="rounded-lg min-h-fit  flex md:flex-col overflow-hidden shadow-lg border-l-2 border-r-2 border-b-2 border-opacity-20  border-amber-500 hover:scale-105 m-2  cursor-pointer md:pb-2" onClick={handleCityCardClick} >
      <div className=" hidden md:block aspect-w-16 aspect-h-9 w-full relative select-none">
        {(city_imgs && city_imgs.length > 0) && <img src={city_imgs[currentIndex]} alt="google generated city" />}
      </div>

      <div className='flex justify-end min-h-fit  grow cursor-pointer  md:w-full ' >
        <div className=" grow px-6 py-3" >
          <h3 className="text-gray-700 h3  ">{city_name}</h3>
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
      <div className="button-div ">
        <span className="px-2 py-1   h-fit bg-gray-200 rounded-xl  text-sm font-semibold text-gray-700 mb-2 ml-2 mr-1">City notes: {city_notes.length}</span>
        <span className="px-2 py-1  h-fit bg-gray-200 rounded-xl  text-sm font-semibold text-gray-700 mb-2 mr-2 ml-1">Places: {locations.length}</span>
      </div>

    </div>
  )
}

export default CityCard


// https://ndpniraj.com/blogs/responsive-infinite-carousel-slider-using-react-and-tailwind-css
