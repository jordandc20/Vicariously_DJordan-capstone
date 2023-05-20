import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import ReactModal from 'react-modal';
import { useParams, useNavigate } from 'react-router-dom'

import Delete from './Delete';


const LocationCard = ({ locationData, noteExpanded, userData, onDelLocation }) => {
  const { avg_cost, category, city_id, date_visited, google_map_url, id, location_name, location_notes, rating, user_id, website } = locationData;
  const navigate = useNavigate()
  const { isLoading, isAuthenticated } = useAuth0();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const locationNotesArray = location_notes.map((note) => {
    return <p key={note.id}>{note.note_body}</p>
  })

  function handleLocationCardClick(e) {
    console.log(e)
    // navigate(`/cities/${id}`, { state: { cityData } })
  }

  if (isLoading) { return <div>Loading ...</div> }

  return (
    < div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={handleLocationCardClick}>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{location_name}</div>
        {google_map_url && <a className="url" href={google_map_url} target="_blank" rel="noreferrer">Google map</a>}
        <br />
        {website && <a className="url" href={website} target="_blank" rel="noreferrer">website</a>}
      </div>
      {location_notes.length > 0 && <details className='bg-white shadow rounded group mb-4' open={noteExpanded} >
        <summary className='list-none flex flex-wrap items-center cursor-pointer focus-visible:outline-none focus-visible:ring focus-visible:ring-pink-500 rounded group-open:rounded-b-none group-open:z-[1] relative'>
          <h3 className=' flex flex-1 p-4 font-semibold'>Notes</h3>
          <div className='flex w-10 items-center justify-center'>
            <div className='border-8 border-transparent border-l-gray-600 ml2 group-open:rotate-90 transition-transform origin-left'></div>
          </div>
        </summary>
        <div>
          {locationNotesArray}
        </div>
      </details>}
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">locations: ##</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">category1</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">category2</span>
      </div>
      {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
        < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={(e) => { e.stopPropagation(); setIsOpen(true) }}>Delete Location</button>
        <ReactModal isOpen={isOpen} contentLabel="Example Modal" onRequestClose={() => setIsOpen(false)}>
          <Delete idToDel={id} path='locations' name={location_name} onFormClose={() => setIsOpen(false)} onDelete={onDelLocation} />
        </ReactModal>
      </div>)}
    </div >
  )
}

export default LocationCard