import React, { useState, useEffect, useContext } from 'react'
import ReactModal from 'react-modal';
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

const CityDetails = () => {
  const [categoryExpanded, setCategoryExpanded] = useState(null)
  const [expandNewCity, setExpandNewCity] = useState(false);
  const [expandNewNote, setExpandNewNote] = useState(false);
  const [cityDetails, setCityDetails] = useState();
  const { isLoading, isAuthenticated } = useAuth0();
  const params = useParams();
  const [userData] = useContext(UserdataContext);

  function fetchCityData() {
    toast.promise(
      axios.get(`${API_URL}/cities/${params.cityId}`)
        .then(r => {
          setCityDetails(r.data)
        }),
      {
        success: `Success`,
        loading: 'Loading...',
        error: (err) => `Error: ${err.message}: ${err.response.data.error}`,
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
      <div>{cityDetails?.city_name}</div>
      < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setCategoryExpanded('open')}>Expand All Categories</button>
      < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setCategoryExpanded(null)}>Collapse All Categories</button>
      {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
        < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setExpandNewCity(true)}>New Location</button>
        <ReactModal appElement={document.getElementById('root') || undefined} isOpen={expandNewCity} contentLabel="New Location Modal" onRequestClose={() => setExpandNewCity(false)}>
          <LocationForm type='newLocation' onFormClose={() => setExpandNewCity(false)} onSubmit={handleAddLocation} />
        </ReactModal>
      </div>)}<div>

        {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
          < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setExpandNewNote(true)}>New City Note</button>
          <ReactModal appElement={document.getElementById('root') || undefined} isOpen={expandNewNote} contentLabel="New City Note Modal" onRequestClose={() => setExpandNewNote(false)}>
            <NoteForm type='newCityNote' onFormClose={() => setExpandNewNote(false)} onSubmit={handleAddCityNote} />
          </ReactModal>
        </div>)}
        <div>

          <details className='bg-white shadow rounded group mb-4' open={categoryExpanded} >
            <summary className='list-none flex flex-wrap items-center cursor-pointer focus-visible:outline-none focus-visible:ring focus-visible:ring-pink-500 rounded group-open:rounded-b-none group-open:z-[1] relative'>
              <h3 className=' flex flex-1 p-4 font-semibold'>General City Notes</h3>
              <div className='flex w-10 items-center justify-center'>
                <div className='border-8 border-transparent border-l-gray-600 ml2 group-open:rotate-90 transition-transform origin-left'></div>
              </div>
            </summary>

            <div>
              {note_comm?.length > 0 && <CityNotesContainer cityNotesData={note_comm} type="communication" onDelCityNote={handleDeleteCityNote} onEditCityNote={handleEditCityNote} />}
              {note_safety?.length > 0 && <CityNotesContainer cityNotesData={note_safety} type="safety" onDelCityNote={handleDeleteCityNote} onEditCityNote={handleEditCityNote} />}
              {note_transp?.length > 0 && <CityNotesContainer cityNotesData={note_transp} type="transportation" onDelCityNote={handleDeleteCityNote} onEditCityNote={handleEditCityNote} />}
              {note_other?.length > 0 && <CityNotesContainer cityNotesData={note_other} type="other" onDelCityNote={handleDeleteCityNote} onEditCityNote={handleEditCityNote} />}
            </div>
          </details>
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