import React, { useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import NotesCard from './NotesCard';
import { UserdataContext } from "../context/UserData";

const CityNotesContainer = ({ cityNotesData, type, onDelCityNote ,onEditCityNote}) => {
    const [userData] = useContext(UserdataContext);
    const { isLoading } = useAuth0();

  if (!cityNotesData) { return <div>Loading City Notes...</div> }

    const cityNotesArray = cityNotesData?.map((note) => {
        return <NotesCard key={note.id} path='citynotes' noteData={note} onDelNote={onDelCityNote} onEditNote={onEditCityNote}/>
    })

 // render loading message
    if (isLoading) { return <div>Loading ...</div> }


    return (
        <div className='bg-white shadow rounded group mb-4'  >
            <h3 className=' flex flex-1 p-4 font-semibold'>{type}</h3>
            {cityNotesArray}
        </div>
    )
}

export default CityNotesContainer