import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'
import API_URL from "../apiConfig.js";
import CategoryContainer from './CategoryContainer';
import LocationForm from './LocationForm';
import CityNotesContainer from './CityNotesContainer';
import NoteForm from './NoteForm';
import { UserdataContext } from "../context/UserData";
import { toast } from 'react-hot-toast';

import { NoSymbolIcon, PencilSquareIcon, ChevronDoubleDownIcon, ChevronDoubleUpIcon, ChevronUpIcon, DocumentPlusIcon, MinusCircleIcon, PencilIcon } from '@heroicons/react/24/solid'

import { Disclosure } from '@headlessui/react'
import GoogleMapComponent from './GoogleMapComponent.js';

const CityDetails = () => {
  const [categoryExpanded, setCategoryExpanded] = useState(null)
  const [expandNewCity, setExpandNewCity] = useState(false);
  const [expandNewNote, setExpandNewNote] = useState(false);
  const [cityDetails, setCityDetails] = useState();
  const { isLoading, isAuthenticated } = useAuth0();
  const params = useParams();
  const [userData] = useContext(UserdataContext);
  const [mapUrls, setMapUrls] = useState([])


  function fetchCityData() {
    toast.promise(
      axios.get(`${API_URL}/cities/${params.cityId}`)
        .then(r => {
          setCityDetails(r.data)
        }),
      {
        success: `Success`,
        loading: 'Loading...',
        error: (err) => `Error: ${err.message}: ${err.response.data[Object.keys(err.response.data)[0]]}`,
      }
    )
  }

  useEffect(() => { fetchCityData() }, [params.cityId]);

  if (!cityDetails) { return <div>Loading city details...</div> }


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

  function handleEditLocation(locDetails) {
    fetchCityData()
  }


  function handleEditCityNote(ud_citynote) {
    fetchCityData()
  }


  function handleEditLocNote(ud_locnote) {
    fetchCityData()
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
 
  // render loading message
  if (isLoading) { return <div>Loading ...</div>; }

  return (
    <div>
      <GoogleMapComponent locations={cityDetails.locations}/>
      <h1 className="h1">{cityDetails?.city_name}</h1>
      {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
        < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setExpandNewCity(true)}>New Location</button>
        <LocationForm show={expandNewCity} type='newLocation' onFormClose={() => setExpandNewCity(false)} onSubmit={handleAddLocation} />
      </div>)}<div>

        <div>
          <Disclosure>
            {({ open }) => (
              <>
                <div className='flex justify-end items-center '>
                  <Disclosure.Button className="flex grow justify-between  rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>General City Notes</span>
                    <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`} />
                  </Disclosure.Button>
                  {(isAuthenticated && Number(params.userId) === userData.id) && (
                    <>
                      <DocumentPlusIcon className="h-6 rounded-md text-sky-500  hover:scale-110" onClick={(e) => { e.stopPropagation(); setExpandNewNote(true) }} />
                      <NoteForm show={expandNewNote} type='newCityNote' onFormClose={() => setExpandNewNote(false)} onSubmit={handleAddCityNote} />
                    </>
                  )}
                </div>
                <Disclosure.Panel className="flex grow flex-wrap  place-content-around">
                  {note_comm?.length > 0 && <CityNotesContainer cityNotesData={note_comm} type="communication" onDelCityNote={handleDeleteCityNote} onEditCityNote={handleEditCityNote} />}
                  {note_safety?.length > 0 && <CityNotesContainer cityNotesData={note_safety} type="safety" onDelCityNote={handleDeleteCityNote} onEditCityNote={handleEditCityNote} />}
                  {note_transp?.length > 0 && <CityNotesContainer cityNotesData={note_transp} type="transportation" onDelCityNote={handleDeleteCityNote} onEditCityNote={handleEditCityNote} />}
                  {note_other?.length > 0 && <CityNotesContainer cityNotesData={note_other} type="other" onDelCityNote={handleDeleteCityNote} onEditCityNote={handleEditCityNote} />}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
      {shop?.length > 0 && <CategoryContainer locationData={shop} categoryExpanded={categoryExpanded} type="shop" onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} onEditLocation={handleEditLocation} onEditLocNote={handleEditLocNote} />}
      {mart?.length > 0 && <CategoryContainer locationData={mart} categoryExpanded={categoryExpanded} type="mart" onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} onEditLocation={handleEditLocation} onEditLocNote={handleEditLocNote} />}
      {food?.length > 0 && <CategoryContainer locationData={food} categoryExpanded={categoryExpanded} type="food" onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} onEditLocation={handleEditLocation} onEditLocNote={handleEditLocNote} />}
      {outdoor?.length > 0 && <CategoryContainer locationData={outdoor} categoryExpanded={categoryExpanded} type="outdoor" onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} onEditLocation={handleEditLocation} onEditLocNote={handleEditLocNote} />}
      {indoor?.length > 0 && <CategoryContainer locationData={indoor} categoryExpanded={categoryExpanded} type="indoor" onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} onEditLocation={handleEditLocation} onEditLocNote={handleEditLocNote} />}
      {acc?.length > 0 && <CategoryContainer locationData={acc} categoryExpanded={categoryExpanded} type="acc" onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} onEditLocation={handleEditLocation} onEditLocNote={handleEditLocNote} />}
      {other?.length > 0 && <CategoryContainer locationData={other} categoryExpanded={categoryExpanded} type="other" onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} onEditLocation={handleEditLocation} onEditLocNote={handleEditLocNote} />}
    </div>
  )
}

export default CityDetails