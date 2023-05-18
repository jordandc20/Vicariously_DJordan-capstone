import React, { useState } from 'react'

import { Navigate, useLocation } from 'react-router-dom'
import CategoryContainer from './CategoryContainer';

const CityDetails = () => {
  const { state } = useLocation();
  const { cityData } = state;
  const { city_name, city_notes, country, id, locations } = cityData;
  const [expanded,setExpanded] = useState(null)


  const outdoor = locations.filter(location => location.category === 'OutdoorActivity')
  const food = locations.filter(location => location.category === 'FoodDrink')
  const mart = locations.filter(location => location.category === 'Mart')
console.log(outdoor, food, mart)
  return (
    <div>

      <div>{city_name}</div>
      < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={()=>setExpanded('open')}>Expand All</button>
      < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={()=>setExpanded(null)}>Collapse All</button>
      {outdoor.length > 0 && <CategoryContainer locations={outdoor} expanded={expanded} type="outdoor" />}
      {food.length > 0 && <CategoryContainer locations={food} expanded={expanded} type="food" />}
      {mart.length > 0 && <CategoryContainer locations={mart} expanded={expanded} type="mart"/>}
    </div>
  )
}

export default CityDetails