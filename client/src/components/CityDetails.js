import React, { useState } from 'react'
import ReactModal from 'react-modal';
import { Navigate, useLocation } from 'react-router-dom'
import CategoryContainer from './CategoryContainer';
import NewLocationForm from './NewLocationForm';

const CityDetails = () => {
  const { state } = useLocation();
  const { city_name, city_notes, country, id, locations,user_id } = state;

  const [locs,setLocs] = useState(locations)
  const [categoryExpanded, setCategoryExpanded] = useState(null)
  const [isOpen, setIsOpen] = useState(false);

  function handleFormClose() {
    setIsOpen(false)
  }
 
function handleNewLocation(new_location){
  setLocs(locs => ([
    ...locs,
    new_location
  ]))

}

  
  const shop = locs.filter(location => location.category === 'Shopping')
  const mart = locs.filter(location => location.category === 'Mart')
  const food = locs.filter(location => location.category === 'FoodDrink')
  const outdoor = locs.filter(location => location.category === 'OutdoorActivity')
  const indoor = locs.filter(location => location.category === 'IndoorActivity')
  const acc = locs.filter(location => location.category === 'Accommodation')
  const other = locs.filter(location => location.category === 'Other')
  return (
    <div>

      <div>{city_name}</div>
      < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setCategoryExpanded('open')}>Expand All Categories</button>
      < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setCategoryExpanded(null)}>Collapse All Categories</button>
      <div>
        < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setIsOpen(true)}>New Location</button>
        <ReactModal isOpen={isOpen} contentLabel="Example Modal" onRequestClose={() => setIsOpen(false)}>
          <NewLocationForm user_id={user_id} city_id={id} onFormClose={handleFormClose} onSubmitNew={handleNewLocation} />
        </ReactModal>
      </div>
      {shop.length > 0 && <CategoryContainer locationData={shop} categoryExpanded={categoryExpanded} type="shop" />}
      {mart.length > 0 && <CategoryContainer locationData={mart} categoryExpanded={categoryExpanded} type="mart" />}
      {food.length > 0 && <CategoryContainer locationData={food} categoryExpanded={categoryExpanded} type="food" />}
      {outdoor.length > 0 && <CategoryContainer locationData={outdoor} categoryExpanded={categoryExpanded} type="outdoor" />}
      {indoor.length > 0 && <CategoryContainer locationData={indoor} categoryExpanded={categoryExpanded} type="indoor" />}
      {acc.length > 0 && <CategoryContainer locationData={acc} categoryExpanded={categoryExpanded} type="acc" />}
      {other.length > 0 && <CategoryContainer locationData={other} categoryExpanded={categoryExpanded} type="other" />}
    </div> 
  )
}

export default CityDetails