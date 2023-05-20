import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal';
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'

import CategoryContainer from './CategoryContainer';
import NewLocationForm from './NewLocationForm';

const CityDetails = ({ userData }) => {
  const [categoryExpanded, setCategoryExpanded] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [cityDetails, setCityDetails] = useState();
  const { isLoading, isAuthenticated } = useAuth0();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const r = await axios.get(`/cities/${params.cityId}`)
      setCityDetails(r.data)
    }
    fetchData()
  }, [params.cityId, setCityDetails]);


  console.log(cityDetails)

  function handleNewLocation(new_location) {
    setCityDetails({
      ...cityDetails, locations: [...cityDetails.locations, new_location],
    })
  }


  const shop = cityDetails?.locations.filter(location => location.category === 'Shopping')
  const mart = cityDetails?.locations.filter(location => location.category === 'Mart')
  const food = cityDetails?.locations.filter(location => location.category === 'FoodDrink')
  const outdoor = cityDetails?.locations.filter(location => location.category === 'OutdoorActivity')
  const indoor = cityDetails?.locations.filter(location => location.category === 'IndoorActivity')
  const acc = cityDetails?.locations.filter(location => location.category === 'Accommodation')
  const other = cityDetails?.locations.filter(location => location.category === 'Other')


  if (isLoading) { return <div>Loading ...</div>; }

  return (
    <div>
      <div>{cityDetails?.city_name}</div>
      < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setCategoryExpanded('open')}>Expand All Categories</button>
      < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setCategoryExpanded(null)}>Collapse All Categories</button>
      {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
        < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setIsOpen(true)}>New Location</button>
        <ReactModal isOpen={isOpen} contentLabel="Example Modal" onRequestClose={() => setIsOpen(false)}>
          <NewLocationForm user_id={userData.id} city_id={params.cityId} onFormClose={() => setIsOpen(false)} onSubmitNew={handleNewLocation} />
        </ReactModal>
      </div>)}
      {shop?.length > 0 && <CategoryContainer locationData={shop} categoryExpanded={categoryExpanded} type="shop" />}
      {mart?.length > 0 && <CategoryContainer locationData={mart} categoryExpanded={categoryExpanded} type="mart" />}
      {food?.length > 0 && <CategoryContainer locationData={food} categoryExpanded={categoryExpanded} type="food" />}
      {outdoor?.length > 0 && <CategoryContainer locationData={outdoor} categoryExpanded={categoryExpanded} type="outdoor" />}
      {indoor?.length > 0 && <CategoryContainer locationData={indoor} categoryExpanded={categoryExpanded} type="indoor" />}
      {acc?.length > 0 && <CategoryContainer locationData={acc} categoryExpanded={categoryExpanded} type="acc" />}
      {other?.length > 0 && <CategoryContainer locationData={other} categoryExpanded={categoryExpanded} type="other" />}
    </div>
  )
}

export default CityDetails