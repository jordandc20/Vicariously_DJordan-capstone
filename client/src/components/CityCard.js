import React from 'react'
import {Navigate, useNavigate} from 'react-router-dom'

const CityCard = ({ cityData }) => {
  const { city_name, city_notes, country,id, locations } = cityData;
  const navigate = useNavigate()
  function   handleCityCardClick(e){
    navigate(`/users/1/cities/${id}`, {state:{cityData}})
  }

  return (
    < div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={handleCityCardClick}>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{country}</div>
        <p className="text-gray-700 text-base">{city_name}</p>
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