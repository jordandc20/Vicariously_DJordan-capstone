import React, { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import ReactModal from 'react-modal';

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
    < div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50"   >
      <div onClick={handleCityCardClick}>
        <div className="px-6 py-4">
          <h3 className="text-gray-700 text-xl text-base font-bold capitalize ">{city_name}</h3>
          <p className=" text-m mb-2 capitalize">{country}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">locations: {locations.length}</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">city notes: {city_notes.length}</span>
        </div></div>
      {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
        <div>< button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={(e) => { e.stopPropagation(); setExpandEditCity(true) }}>Edit City</button>
          <ReactModal appElement={document.getElementById('root') || undefined} isOpen={expandEditCity} contentLabel="Edit City Modal" onRequestClose={() => setExpandEditCity(false)}>
            <CityForm locationData={cityData} type='editCity' onFormClose={() => setExpandEditCity(false)} onSubmit={handleEditCity} />
          </ReactModal>
        </div>
        <div>
          < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={(e) => { e.stopPropagation(); setIsOpen(true) }}>Delete City</button>
          <ReactModal appElement={document.getElementById('root') || undefined} isOpen={isOpen} contentLabel="Delete City Modal" onRequestClose={() => setIsOpen(false)}>
            <Delete idToDel={id} path='cities' name={city_name} onFormClose={() => setIsOpen(false)} onDelete={onDelCity} />
          </ReactModal>
        </div>
      </div>)}
    </div >
  )
}

export default CityCard