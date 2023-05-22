import React, { useState, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import ReactModal from 'react-modal';
import { useParams } from 'react-router-dom'

import Delete from './Delete';
import NewLocationNoteForm from './NewLocationNoteForm';
import NotesCard from './NotesCard';
import { UserdataContext } from "../context/UserData";
import LocationForm from './LocationForm';


const LocationCard = ({ locationData, noteExpanded, onDelLocation, onEditLocation, onNewLocNote, onDelLocNote }) => {
  const { avg_cost, category, city_id, date_visited, google_map_url, id, location_name, location_notes, rating, user_id, website } = locationData;
  const { isLoading, isAuthenticated } = useAuth0();
  const params = useParams();
  const [expandDelLocation, setExpandDelLocation] = useState(false);
  const [expandEditLocation, setExpandEditLocation] = useState(false);
  const [expandNewNote, setExpandNewNote] = useState(false);
  const [userData] = useContext(UserdataContext);


  const locationNotesArray = location_notes?.map((note) => {
    return <NotesCard key={note.id} noteData={note} onDelNote={onDelLocNote} path='locationnotes' />
  })


  function handleLocationCardClick(e) {
    console.log(e)
    // navigate(`/cities/${id}`, { state: { cityData } })
  }

  // render loading message
  if (isLoading) { return <div>Loading ...</div> }

  return (
    < div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={handleLocationCardClick}>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{location_name}</div>
        {google_map_url && <a className="url" href={google_map_url} target="_blank" rel="noreferrer">Google map</a>}
        <br />
        {website && <a className="url" href={website} target="_blank" rel="noreferrer">website</a>}
      </div>
      <details className='bg-white shadow rounded group mb-4' open={noteExpanded} >
        <summary className='list-none flex flex-wrap items-center cursor-pointer focus-visible:outline-none focus-visible:ring focus-visible:ring-pink-500 rounded group-open:rounded-b-none group-open:z-[1] relative'>
          <h3 className=' flex flex-1 p-4 font-semibold'>Notes</h3>
          {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
            < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setExpandNewNote(true)}>New Location Note</button>
            <ReactModal appElement={document.getElementById('root') || undefined} isOpen={expandNewNote} contentLabel="New Location Note Modal" onRequestClose={() => setExpandNewNote(false)}>
              <NewLocationNoteForm location_id={id} onFormClose={() => setExpandNewNote(false)} onNewNote={onNewLocNote} />
            </ReactModal>
          </div>)}
          <div className='flex w-10 items-center justify-center'>
            <div className='border-8 border-transparent border-l-gray-600 ml2 group-open:rotate-90 transition-transform origin-left'></div>
          </div>
        </summary>
        <div>
          {locationNotesArray}
        </div>
      </details>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">locations: ##</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">category1</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">category2</span>
      </div>
      {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
        <div>
          < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={(e) => { e.stopPropagation(); setExpandDelLocation(true) }}>Delete Location</button>
          <ReactModal appElement={document.getElementById('root') || undefined} isOpen={expandDelLocation} contentLabel="Delete Location Modal" onRequestClose={() => setExpandDelLocation(false)}>
            <Delete idToDel={id} path='locations' name={location_name} onFormClose={() => setExpandDelLocation(false)} onDelete={onDelLocation} />
          </ReactModal>
        </div>
        <div>
          < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={(e) => { e.stopPropagation(); setExpandEditLocation(true) }}>Edit Location</button>
          <ReactModal appElement={document.getElementById('root') || undefined} isOpen={expandEditLocation} contentLabel="Edit Location Modal" onRequestClose={() => setExpandEditLocation(false)}>
            <LocationForm locationData={locationData} type='editLocation' onFormClose={() => setExpandEditLocation(false)} onSubmit={onEditLocation} />
          </ReactModal>
        </div>
      </div>)}


    </div >
  )
}

export default LocationCard