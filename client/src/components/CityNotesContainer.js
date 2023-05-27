import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import NotesCard from './NotesCard';

const CityNotesContainer = ({ cityNotesData, type, onDelCityNote ,onEditCityNote}) => {
    const { isLoading } = useAuth0();

  if (!cityNotesData) { return <div>Loading City Notes...</div> }

    const cityNotesArray = cityNotesData?.map((note) => {
        return <NotesCard key={note.id} path='citynotes' noteData={note} onDelNote={onDelCityNote} onEditNote={onEditCityNote}/>
    })

 // render loading message
    if (isLoading) { return <div>Loading ...</div> }


    return (
        <div className='bg-white shadow rounded group my-1'  >
            <h3 className=' flex flex-1 my-1 mx-2 font-semibold'>{type}</h3>
            <div className='px-2 py-2 text-sm text-gray-500'>
            {cityNotesArray}
            </div>
        </div>
    )
}

export default CityNotesContainer