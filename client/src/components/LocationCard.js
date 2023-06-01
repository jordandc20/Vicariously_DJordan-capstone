import React, { useState, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router-dom'
import { PencilSquareIcon, LifebuoyIcon, ChevronUpIcon, DocumentPlusIcon, MinusCircleIcon, ArrowTopRightOnSquareIcon, FireIcon, FaceFrownIcon, FaceSmileIcon, TrashIcon, HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import Delete from './Delete';
import NoteForm from './NoteForm';
import NotesCard from './NotesCard';
import { UserdataContext } from "../context/UserData";
import LocationForm from './LocationForm';


const LocationCard = ({ locationData, noteExpanded, onDelLocation, onEditLocation, onNewLocNote, onDelLocNote, onEditLocNote }) => {
  const { avg_cost, date_visited, google_map_url, id, location_name, location_notes, rating, website } = locationData;
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
  if (date_visited !== null) {
    date = new Date(date_visited);
    const month_render = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day_render = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    date = `${month_render}/${day_render}/${date.getFullYear()}`
  }
  else { date = date_visited }

  let cost = ''
  switch (avg_cost) {
    case 0:
      cost = "free"
      break;
    case 1:
      cost = "$"
      break;
    case 2:
      cost = "$$"
      break;
    case 3:
      cost = "$$$"
      break;
    default:
      break;
  };



  // render loading message
  if (isLoading) { return (<><LifebuoyIcon className='h-5 animate-spin' /><div>Loading...</div></>) }

  return (
    < div className="w-64 rounded-lg hover:scale-105 m-2 p-2 content-around shadow-md bg-white" >
      <div className='flex  mb-1 '>
        <h3 className=" font-bold">{location_name}</h3>
      </div>
      <div className='flex flex-wrap md:flex-nowrap w-full  md:justify-items-center md:justify-around items-end  mb-2 '>
        {google_map_url && <a className="url flex items-center" href={google_map_url} target="_blank" rel="noreferrer">GoogleMap<ArrowTopRightOnSquareIcon className="h-3" /></a>}
        {website && <a className="url flex items-center" href={website} target="_blank" rel="noreferrer">url<ArrowTopRightOnSquareIcon className="h-3" /></a>}
        {(isAuthenticated && Number(params.userId) === userData.id) && (
          <div className='flex items-end no-wrap pl-2 border-l-2 border-slate-200'>
            <div >
              <PencilSquareIcon className="h-3  lg:h-5   rounded-md text-sky-500  hover:scale-110" onClick={(e) => { e.stopPropagation(); setExpandEditLocation(true) }} />
              <LocationForm show={expandEditLocation} locationData={locationData} type='editLocation' onFormClose={() => setExpandEditLocation(false)} onSubmit={onEditLocation} />
            </div>
            <div >
              <MinusCircleIcon className="h-3 lg:h-5 ml-1   rounded-full text-red-500  hover:scale-110" onClick={(e) => { e.stopPropagation(); setExpandDelLocation(true) }} />
              <Delete show={expandDelLocation} idToDel={id} path='locations' name={location_name} onFormClose={() => setExpandDelLocation(false)} onDelete={onDelLocation} />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap md:flex-nowrap w-full  md:justify-items-center md:justify-around items-end  mb-1 ">
        {rating && <span className="px-1 h-5 items-center bg-gray-200 rounded-xl  text-sm font-semibold text-gray-700 mb-2 mx-auto flex">
          <TrashIcon className={`h-4 rounded-full shadow-sm text-slate-500 bg-transparent  ${ rating === 1 ? ' bg-white fill-red-700 text-white' : ''}`} />
          <FaceFrownIcon className={`h-4 rounded-full shadow-sm text-slate-500 bg-transparent ${rating === 2 ? ' bg-white text-yellow-700 ' : ''}`} />
          <HandThumbDownIcon className={`h-4 rounded-full shadow-sm rotate-45 text-slate-500 bg-transparent ${rating === 3 ? ' bg-white fill-yellow-600 text-white' : ''}`} />
          <HandThumbUpIcon className={`h-4 rounded-full shadow-sm text-slate-500 bg-transparent  rotate-45 ${rating === 3 ? ' bg-white fill-yellow-600 text-white' : ''}`} />
          <FaceSmileIcon className={`h-4 rounded-full shadow-sm text-slate-500 bg-transparent ${rating === 4 ? ' bg-white fill-green-700 text-white ' : ''}`} />
          <FireIcon className={`h-4 rounded-full shadow-sm text-slate-500 bg-transparent ${rating === 5 ? ' bg-white fill-orange-700 text-white' : ''}`} />
        </span>}
        {cost && <span className="px-1  block  bg-gray-200 rounded-xl  text-sm font-semibold text-gray-700 mb-2 mx-auto">{cost}</span>}
        {date && <span className="px-1  block  bg-gray-200 rounded-xl  text-sm  text-gray-700 mb-2 mx-auto">{date}</span>}
      </div>

      <div className="h-fit max-h-full overflow-y-auto overflow-hidden md:col-span-3 flex-initial  rounded-lg  shadow mx-auto w-full">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className={`flex w-full justify-between  ${open ? 'bg-sky-50 border-l-2 border-sky-700' : 'bg-slate-50'}  px-2 py-1 text-left text-sm font-medium text-indigo hover:bg-sky-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 cursor-pointer items-center`}>
                <span>Notes</span>
                <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-cyan-800 transition`} />
                {(isAuthenticated && Number(params.userId) === userData.id) && (
                  <>
                    < DocumentPlusIcon className="h-6 rounded-md text-sky-500 object-scale-down  hover:scale-110" onClick={(e) => { e.stopPropagation(); setOpenNoteForm(true) }} />
                    <NoteForm show={openNoteForm} noteData={{ "location_id": id, }} type='newLocNote' onFormClose={() => setOpenNoteForm(false)} onSubmit={onNewLocNote} />
                  </>
                )}
              </Disclosure.Button>
              <Disclosure.Panel className="overflow-hidden border-l-2 px-1 divide-y bg-neutral-50 bg-opacity-80 border-slate-300 leading-normal flex flex-wrap">
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