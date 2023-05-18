import React, { useState, useEffect } from 'react'
import axios from "axios"

import CityCard from './CityCard';

const CitiesList = ({ userCitiesData }) => {

  const cityCardsArray = userCitiesData?.map((city) => {
    return <CityCard key={city.id} cityData={city} />
  })

  /// ? waits for data   ... like a ternary? ... once the data is available, then continue to map\
  // const cityCardsArray = userCitiesData ? userCitiesData?.map((city) => {
  //   return <CityCard  key={city.id} cityData ={city} />
  // }) : null

  return (

    <div className='flex sm:flex-row sm:text-left sm:justify-between py-4 px-6'>
      {cityCardsArray}
    </div>
  )
}

export default CitiesList