import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import NotesCard from './NotesCard';

const CityNotesContainer = ({ cityNotesData, type, userData, onDelCityNote }) => {

    const { isLoading } = useAuth0();

    const cityNotesArray = cityNotesData?.map((note) => {
        return <NotesCard key={note.id} cityNoteData={note} userData={userData} onDelCityNote={onDelCityNote} />
    })


    if (isLoading) { return <div>Loading ...</div> }


    return (
        <div className='bg-white shadow rounded group mb-4'  >
            <h3 className=' flex flex-1 p-4 font-semibold'>{type}</h3>
            {cityNotesArray}
        </div>
    )
}

export default CityNotesContainer