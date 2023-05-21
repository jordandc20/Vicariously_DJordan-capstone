import React, { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import ReactModal from 'react-modal';

import Delete from './Delete';
import { UserdataContext } from "../context/UserData";

const CityCard = ({ cityData, onDelCity }) => {
  const [userData] = useContext(UserdataContext);
  const { isLoading, isAuthenticated } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate()
  const { city_name, city_notes, country, id, locations, user_id } = cityData;

  console.log(cityData)

  function handleCityCardClick(e) {
    navigate(`/users/${params.userId}/cities/${id}`)
  }
  
 // render loading message
  if (isLoading) { return <div>Loading ...</div> }

  return (
    < div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={handleCityCardClick}>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 capitalize">{country}</div>
        <p className="text-gray-700 text-base capitalize">{city_name}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">locations: ##</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">category1</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">category2</span>
      </div>
      {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
        < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={(e) => {e.stopPropagation(); setIsOpen(true)}}>Delete City</button>
        <ReactModal isOpen={isOpen} contentLabel="Example Modal" onRequestClose={() => setIsOpen(false)}>
          <Delete idToDel={id} path ='cities' name={city_name} onFormClose={() => setIsOpen(false)} onDelete={  onDelCity } />
        </ReactModal>
      </div>)}
    </div >
  )
}

export default CityCard