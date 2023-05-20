import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal';
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'

import CategoryContainer from './CategoryContainer';
import NewLocationForm from './NewLocationForm';
import CityNotesContainer from './CityNotesContainer';
import NewCityNoteForm from './NewCityNoteForm';

const CityDetails = ({ userData }) => {
  const [categoryExpanded, setCategoryExpanded] = useState(null)
  const [expandNewCity, setExpandNewCity] = useState(false);
  const [expandNewNote, setExpandNewNote] = useState(false);
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


  function handleAddLocation(new_location) {
    setCityDetails({
      ...cityDetails, locations: [...cityDetails.locations, new_location],
    })
  }

  function handleAddCityNote(newCityNote) {
    setCityDetails({
      ...cityDetails, city_notes: [...cityDetails.city_notes, newCityNote],
    })
  }

  function handleAddLocNote(newLocNote) {
    console.log(newLocNote)
    console.log(cityDetails)
    const ud_cityDetails =
    {
      ...cityDetails, locations:
        cityDetails.locations.map(loc => {
          if (loc.id === newLocNote.location_id) {
            return (
              {
                ...loc, location_notes: [...loc.location_notes, newLocNote],
              })
          } else { return loc }
        })
    }
    setCityDetails(ud_cityDetails)
  }

  function handleDeleteLocation(delLocationId) {
    setCityDetails({
      ...cityDetails, locations: cityDetails.locations.filter(location => location.id !== delLocationId),
    }
    )
  }


  function handleDeleteCityNote(delCityNoteId) {
    setCityDetails({
      ...cityDetails, city_notes: cityDetails.city_notes.filter(note => note.id !== delCityNoteId),
    }
    )
  }


  function handleDelLocNote(delLocNoteId) {
    console.log(delLocNoteId)
    console.log(cityDetails)
    const ud_cityDetails =
    {
      ...cityDetails, locations:
        cityDetails.locations.map(
          loc => {
            return (
              {
                ...loc, location_notes: loc.location_notes.filter(note => note.id !== delLocNoteId),
              }
            )
          }
        )
    }
    setCityDetails(ud_cityDetails)
  }






  // sort city notes into note-categories
  const note_other = cityDetails?.city_notes.filter(note => note.note_type === 'Other')
  const note_safety = cityDetails?.city_notes.filter(note => note.note_type === 'Safety')
  const note_transp = cityDetails?.city_notes.filter(note => note.note_type === 'Transportation')
  const note_comm = cityDetails?.city_notes.filter(note => note.note_type === 'Communication')

  // sort locations into location-categories
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
        < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setExpandNewCity(true)}>New Location</button>
        <ReactModal isOpen={expandNewCity} contentLabel="Example Modal" onRequestClose={() => setExpandNewCity(false)}>
          <NewLocationForm user_id={userData.id} city_id={params.cityId} onFormClose={() => setExpandNewCity(false)} onSubmitNew={handleAddLocation} />
        </ReactModal>
      </div>)}
      <details className='bg-white shadow rounded group mb-4' open={categoryExpanded} >
        <summary className='list-none flex flex-wrap items-center cursor-pointer focus-visible:outline-none focus-visible:ring focus-visible:ring-pink-500 rounded group-open:rounded-b-none group-open:z-[1] relative'>
          <h3 className=' flex flex-1 p-4 font-semibold'>General City Notes</h3>
          <div className='flex w-10 items-center justify-center'>
            <div className='border-8 border-transparent border-l-gray-600 ml2 group-open:rotate-90 transition-transform origin-left'></div>
          </div>
        </summary>
        {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
          < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setExpandNewNote(true)}>New City Note</button>
          <ReactModal isOpen={expandNewNote} contentLabel="Example Modal" onRequestClose={() => setExpandNewNote(false)}>
            <NewCityNoteForm city_id={params.cityId} onFormClose={() => setExpandNewNote(false)} onNewNote={handleAddCityNote} />

          </ReactModal>
        </div>)}
        <div>
          {note_comm?.length > 0 && <CityNotesContainer cityNotesData={note_comm} type="communication" userData={userData} onDelCityNote={handleDeleteCityNote} />}
          {note_safety?.length > 0 && <CityNotesContainer cityNotesData={note_safety} type="safety" userData={userData} onDelCityNote={handleDeleteCityNote} />}
          {note_transp?.length > 0 && <CityNotesContainer cityNotesData={note_transp} type="transportation" userData={userData} onDelCityNote={handleDeleteCityNote} />}
          {note_other?.length > 0 && <CityNotesContainer cityNotesData={note_other} type="other" userData={userData} onDelCityNote={handleDeleteCityNote} />}
        </div>
      </details>


      {shop?.length > 0 && <CategoryContainer locationData={shop} categoryExpanded={categoryExpanded} type="shop" userData={userData} onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} />}
      {mart?.length > 0 && <CategoryContainer locationData={mart} categoryExpanded={categoryExpanded} type="mart" userData={userData} onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} />}
      {food?.length > 0 && <CategoryContainer locationData={food} categoryExpanded={categoryExpanded} type="food" userData={userData} onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} />}
      {outdoor?.length > 0 && <CategoryContainer locationData={outdoor} categoryExpanded={categoryExpanded} type="outdoor" userData={userData} onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} />}
      {indoor?.length > 0 && <CategoryContainer locationData={indoor} categoryExpanded={categoryExpanded} type="indoor" userData={userData} onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} />}
      {acc?.length > 0 && <CategoryContainer locationData={acc} categoryExpanded={categoryExpanded} type="acc" userData={userData} onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} />}
      {other?.length > 0 && <CategoryContainer locationData={other} categoryExpanded={categoryExpanded} type="other" userData={userData} onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} />}
    </div>
  )
}

export default CityDetails