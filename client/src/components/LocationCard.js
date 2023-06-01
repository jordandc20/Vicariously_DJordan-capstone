import React, { useState, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router-dom'
import { NoSymbolIcon, PencilSquareIcon,LifebuoyIcon, ChevronUpIcon, DocumentPlusIcon, MinusCircleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import { Disclosure } from '@headlessui/react'
import Delete from './Delete';
import NoteForm from './NoteForm';
import NotesCard from './NotesCard';
import { UserdataContext } from "../context/UserData";
import LocationForm from './LocationForm';


const LocationCard = ({ locationData, noteExpanded, onDelLocation, onEditLocation, onNewLocNote, onDelLocNote, onEditLocNote }) => {
  const { avg_cost, city_id, date_visited, google_map_url, id, location_name, location_notes, rating, user_id, website } = locationData;
  const { isLoading, isAuthenticated } = useAuth0();
  const params = useParams();
  const [expandDelLocation, setExpandDelLocation] = useState(false);
  const [expandEditLocation, setExpandEditLocation] = useState(false);
  const [openNoteForm, setOpenNoteForm] = useState(false);
  const [userData] = useContext(UserdataContext);


  const locationNotesArray = location_notes?.map((note) => {
    return <NotesCard key={note.id} noteData={note} onDelNote={onDelLocNote} path='locationnotes' onEditNote={onEditLocNote} />
  })

  let date
  if (date_visited !== null){
   date = new Date(date_visited);
  const month_render = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day_render = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  date = `${month_render}/${day_render}/${date.getFullYear()}` 
  }
  else {date = date_visited}


  // render loading message
  if (isLoading)    { return (<><LifebuoyIcon className='h-5 animate-spin'/><div>Loading...</div></>) }

  return (
    < div className="w-64 rounded hover:scale-105 m-2 shadow-md bg-amber-50" >

      <div className='flex '>
        <div className=" grow px-4 py-3">
          <h3 className="h3 ">{location_name}</h3>
        </div>
        {(isAuthenticated && Number(params.userId) === userData.id) && (
          <div className='mr-3 mt-3 flex'>
            <div >
              <PencilSquareIcon className="h-3  lg:h-5  mb-1 rounded-md text-sky-500  hover:scale-110" onClick={(e) => { e.stopPropagation(); setExpandEditLocation(true) }} />
              <LocationForm show={expandEditLocation} locationData={locationData} type='editLocation' onFormClose={() => setExpandEditLocation(false)} onSubmit={onEditLocation} />
            </div>
            <div >
              <MinusCircleIcon className="h-3 lg:h-5 ml-2   rounded-full bg-red-500 text-white  hover:scale-110" onClick={(e) => { e.stopPropagation(); setExpandDelLocation(true) }} />
              <Delete show={expandDelLocation} idToDel={id} path='locations' name={location_name} onFormClose={() => setExpandDelLocation(false)} onDelete={onDelLocation} />
            </div>
          </div>
        )}
      </div>
      <div className='button-div'>
        {google_map_url && <a className="url flex items-center" href={google_map_url} target="_blank" rel="noreferrer">Google map<ArrowTopRightOnSquareIcon  className="h-3"/></a>}
        <br />
        {website && <a className="url flex items-center" href={website} target="_blank" rel="noreferrer">website<ArrowTopRightOnSquareIcon  className="h-3"/></a>}
      </div>
      <div className="button-div mt-2">
        <span className="px-2 py-1 block  bg-gray-200 rounded-xl  text-sm font-semibold text-gray-700 mb-2 ml-2 mr-1">Rating: {rating}</span>
        <span className="px-2 py-1 block  bg-gray-200 rounded-xl  text-sm font-semibold text-gray-700 mb-2 ml-2 mr-1">Avg. Cost: {avg_cost}</span>
        <span className="px-2 py-1 block  bg-gray-200 rounded-xl  text-sm font-semibold text-gray-700 mb-2 ml-2 mr-1">Date: {date}</span>
      </div>

      <div className="mx-auto  w-full px-2 py-2 max-w-md rounded-2xl bg-white ">
        <Disclosure>
          {({ open }) => (
            <>
              <div className='flex justify-end items-center '>
                <Disclosure.Button className="flex grow justify-between  rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Notes</span>
                  <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`} />
                </Disclosure.Button>
                {(isAuthenticated && Number(params.userId) === userData.id) && (
                  <>
                    < DocumentPlusIcon className="h-6 rounded-md text-sky-500 object-scale-down  hover:scale-110" onClick={(e) => { e.stopPropagation(); setOpenNoteForm(true) }} />
                    <NoteForm show={openNoteForm} noteData={{ "location_id": id, }} type='newLocNote' onFormClose={() => setOpenNoteForm(false)} onSubmit={onNewLocNote} />
                  </>
                )}
              </div>
              <Disclosure.Panel className="px-2 py-2 text-sm text-gray-500">
                {locationNotesArray}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div >
  )
}

export default LocationCard