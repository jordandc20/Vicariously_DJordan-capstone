import React, { useState, useEffect } from 'react'
import axios from "axios"
import ReactModal from 'react-modal';
import NewCityForm from './NewCityForm';

import CityCard from './CityCard';

const CitiesList = ({ userCitiesData, user_id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const cityCardsArray = userCitiesData?.map((city) => {
    return <CityCard key={city.id} cityData={city} />
  })

  /// ? waits for data   ... like a ternary? ... once the data is available, then continue to map\
  // const cityCardsArray = userCitiesData ? userCitiesData?.map((city) => {
  //   return <CityCard  key={city.id} cityData ={city} />
  // }) : null

  function handleNewCity(newCity) {
    console.log(newCity)

  }
  function handleFormClose() {
    setIsOpen(false)
  }

  return (

    <div className='flex sm:flex-row sm:text-left sm:justify-between py-4 px-6'>
      <div>
        < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setIsOpen(true)}>New Location</button>
        <ReactModal isOpen={isOpen} contentLabel="Example Modal" onRequestClose={() => setIsOpen(false)}>
          <NewCityForm user_id={user_id} onFormClose={handleFormClose} onSubmitNew={handleNewCity} />
        </ReactModal>
      </div>
      {cityCardsArray}
    </div>
  )
}

export default CitiesList