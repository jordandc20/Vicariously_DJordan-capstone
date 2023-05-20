import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const CityCard = ({ cityData }) => {
  const { isLoading} = useAuth0();
  const params = useParams();
  const { city_name, city_notes, country, id, locations, user_id } = cityData;
  const navigate = useNavigate()

  
  function handleCityCardClick(e) {
    navigate(`/users/${params.userId}/cities/${id}`)
  }

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
    </div >
  )
}

export default CityCard