import React, { useState } from 'react'
import ReactModal from 'react-modal';
import { Navigate, useLocation } from 'react-router-dom'
import CategoryContainer from './CategoryContainer';
import NewLocationForm from './NewLocationForm';

const CityDetails = () => {
  const { state } = useLocation();
  const { cityData } = state;
  const { city_name, city_notes, country, id, locations,user_id } = cityData;
  const [categoryExpanded, setCategoryExpanded] = useState(null)
  const [isOpen, setIsOpen] = useState(false);

  function handleFormClose(e) {
    console.log(e)
    setIsOpen(false)
  }


  const outdoor = locations.filter(location => location.category === 'OutdoorActivity')
  const food = locations.filter(location => location.category === 'FoodDrink')
  const mart = locations.filter(location => location.category === 'Mart')
  console.log(outdoor, food, mart)
  return (
    <div>

      <div>{city_name}</div>
      < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setCategoryExpanded('open')}>Expand All Categories</button>
      < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setCategoryExpanded(null)}>Collapse All Categories</button>
      <div>
        < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setIsOpen(true)}>New Location</button>
        <ReactModal isOpen={isOpen} contentLabel="Example Modal" onRequestClose={() => setIsOpen(false)}>
          <NewLocationForm user_id={user_id} city_id={id} onFormClose={handleFormClose} />
        </ReactModal>
      </div>
      {outdoor.length > 0 && <CategoryContainer locations={outdoor} categoryExpanded={categoryExpanded} type="outdoor" />}
      {food.length > 0 && <CategoryContainer locations={food} categoryExpanded={categoryExpanded} type="food" />}
      {mart.length > 0 && <CategoryContainer locations={mart} categoryExpanded={categoryExpanded} type="mart" />}
    </div> 
  )
}

export default CityDetails