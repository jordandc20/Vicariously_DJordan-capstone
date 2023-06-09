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
import { SquaresPlusIcon, LifebuoyIcon, ChevronUpIcon, DocumentPlusIcon } from '@heroicons/react/24/solid'
import Tooltip from './Tooltip.js';
import GoogleMapComponent from './GoogleMapComponent.js';

const CityDetails = () => {
  const [categoryExpanded, setCategoryExpanded] = useState(null)
  const [expandNewCity, setExpandNewCity] = useState(false);
  const [expandNewNote, setExpandNewNote] = useState(false);
  const [cityDetails, setCityDetails] = useState();
  const { isLoading, isAuthenticated } = useAuth0();
  const params = useParams();
  const [userData] = useContext(UserdataContext);
  const [openDetails, setOpenDetails] = useState(true)

  // https://www.skillthrive.com/posts/react-resizable-split-panels
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

  if (!cityDetails) { return (<><LifebuoyIcon className='h-5 animate-spin' /><div>Loading...</div></>) }

  function handleAddLocation(new_location) {
    setCityDetails({
      ...cityDetails, locations: [...cityDetails.locations, new_location],
    })
  }

  function handleAddCityNote(newCityNote) {
    setCityDetails({
      ...cityDetails, city_notes: [newCityNote, ...cityDetails.city_notes],
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
                ...loc, location_notes: [newLocNote, ...loc.location_notes],
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

  function handleToggleActive() {
    setOpenDetails(!openDetails)
  }

  // sort city notes into note-categories
  const note_other = cityDetails?.city_notes.filter(note => note.note_type === 'Other')
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
  if (isLoading) { return (<><LifebuoyIcon className='h-5 animate-spin' /><div>Loading...</div></>) }

  return (
    <div className=' max-h-full h-full flex flex-col my-3  '>
      <div className='flex mt-2 mb-3 justify-center  w-full'>
        <div className='flex h-fit mb-1  z-25 relative '>
          <span className="block absolute shadow -inset-1 -skew-y-6 translate-x-3 bg-opacity-80 bg-amber-500 rounded "></span>
          <span className="block absolute shadow -inset-1 skew-y-3 bg-sky-500 rounded  bg-opacity-80 " ></span>
          <h1 className="h1">{cityDetails?.city_name}</h1>
        </div>
      </div>
      <div>
        <div id='1' className='flex justify-center item-center '>
          <div id='2' className={`w-full md:w-[95%] mx-auto rounded-lg p-3  h-full group  ${openDetails ? 'is-active bg-amber-100 border-2' : 'bg-amber-200'}`}>
            <div id='3' className='flex items-center cursor-pointer group-[.is-active]:border-b-2 group-[.is-active]:pb-2  ' onClick={handleToggleActive}>
              <h2 className='w-full group-[.is-active]:font-bold h2'>About <span className="  underline underline-offset-4 decoration-sky-500 ">{cityDetails?.city_name}</span></h2>
              <ChevronUpIcon className='h-5 w-5 group-[.is-active]:rotate-[180deg] transition duration-300 mr-3 ' />
              {(isAuthenticated && Number(params.userId) === userData.id) && (
                <>
                  <DocumentPlusIcon className="h-6  text-sky-500  hover:scale-110 border-slate-500 group-[.is-active]:border-slate-300 lg:border-l-2 pl-3" onClick={(e) => { e.stopPropagation(); setExpandNewNote(true) }} />
                  <NoteForm show={expandNewNote} type='newCityNote' onFormClose={() => setExpandNewNote(false)} onSubmit={handleAddCityNote} />
                </>
              )}
            </div>
            {cityDetails?.city_notes.length > 0 ? (
              <div id='4' className="overflow-hidden max-h-0 group-[.is-active]:max-h-[20vh] bg-neutral-50 bg-opacity-80 flex flex-wrap md:flex-nowrap h-full w-full justify-between  border-gray-300 border-opacity-40 divide-x overflow-y-auto snap snap-y ">
                <CityNotesContainer cityNotesData={note_comm} type="communication" onDelCityNote={handleDeleteCityNote} onEditCityNote={handleEditCityNote} />
                <CityNotesContainer cityNotesData={note_transp} type="transportation" onDelCityNote={handleDeleteCityNote} onEditCityNote={handleEditCityNote} />
                <CityNotesContainer cityNotesData={note_other} type="other" onDelCityNote={handleDeleteCityNote} onEditCityNote={handleEditCityNote} />
              </div>
            ) : <div>Please add some city notes</div>}
          </div>
        </div>

      </div>
      <div className="flex justify-center mt-4 py-2 items-center">
        <div className='flex-1' />
        <h2 className='h2' >My Places in {cityDetails?.city_name}</h2>
        <div className='flex-1' >
          {(isAuthenticated && Number(params.userId) === userData.id) && (
            <div className="ml-auto items-end h-7 w-7 lg:h-9 lg:w-8 mr-3 ">
              <Tooltip message={"Add New Location"}>
                < SquaresPlusIcon className="hover:rotate-45 transition h-7 w-7 lg:h-9 lg:w-8 mr-3 rounded text-sky-500 border-2 border-amber-400 hover:scale-105" onClick={() => setExpandNewCity(true)} />
                <LocationForm show={expandNewCity} type='newLocation' onFormClose={() => setExpandNewCity(false)} onSubmit={handleAddLocation} />
              </Tooltip>
            </div>
          )}
        </div>
      </div>

      <div className='p-4 grid md:grid-cols-5 gap-3 h-full flex-initial items-start'>
        {cityDetails?.locations.length > 0 ? (
          <>
            <div className='h-[40vh] md:h-full  md:col-span-2'>
              <GoogleMapComponent locations={cityDetails.locations} />
            </div>
            <div className='h-fit max-h-full overflow-y-auto overflow-hidden md:col-span-3 flex-initial  rounded-lg  shadow-md mx-auto w-full ' >
              {shop?.length > 0 && <CategoryContainer locationData={shop} categoryExpanded={categoryExpanded} type="shopping" onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} onEditLocation={handleEditLocation} onEditLocNote={handleEditLocNote} />}
              {mart?.length > 0 && <CategoryContainer locationData={mart} categoryExpanded={categoryExpanded} type="marts" onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} onEditLocation={handleEditLocation} onEditLocNote={handleEditLocNote} />}
              {food?.length > 0 && <CategoryContainer locationData={food} categoryExpanded={categoryExpanded} type="food/drinks" onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} onEditLocation={handleEditLocation} onEditLocNote={handleEditLocNote} />}
              {outdoor?.length > 0 && <CategoryContainer locationData={outdoor} categoryExpanded={categoryExpanded} type="outdoor" onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} onEditLocation={handleEditLocation} onEditLocNote={handleEditLocNote} />}
              {indoor?.length > 0 && <CategoryContainer locationData={indoor} categoryExpanded={categoryExpanded} type="indoor" onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} onEditLocation={handleEditLocation} onEditLocNote={handleEditLocNote} />}
              {acc?.length > 0 && <CategoryContainer locationData={acc} categoryExpanded={categoryExpanded} type="accommodation" onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} onEditLocation={handleEditLocation} onEditLocNote={handleEditLocNote} />}
              {other?.length > 0 && <CategoryContainer locationData={other} categoryExpanded={categoryExpanded} type="other" onDelLocation={handleDeleteLocation} onNewLocNote={handleAddLocNote} onDelLocNote={handleDelLocNote} onEditLocation={handleEditLocation} onEditLocNote={handleEditLocNote} />}
            </div>
          </>) : <div>Please add some locations</div>}
      </div>
    </div>
  )
}

export default CityDetails

// https://iwconnect.com/creating-a-fully-functional-accordion-component-with-react-js-and-tailwindcss/
// https://www.tailwindtoolbox.com/components/accordion