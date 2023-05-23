import React, { useState, useContext } from 'react'
import LocationCard from './LocationCard'
import { useAuth0 } from '@auth0/auth0-react'

import { UserdataContext } from "../context/UserData";

const CategoryContainer = ({ locationData, type, categoryExpanded, onDelLocation, onEditLocation, onNewLocNote, onDelLocNote ,onEditLocNote}) => {
    const { isLoading } = useAuth0();
    const [noteExpanded, setNoteExpanded] = useState(null)
    const [userData] = useContext(UserdataContext);

    const locationCardsArray = locationData.map((location) => {
        return <LocationCard key={location.id} locationData={location} noteExpanded={noteExpanded} onDelLocation={onDelLocation} onNewLocNote={onNewLocNote} onDelLocNote={onDelLocNote} onEditLocation={onEditLocation} onEditLocNote={onEditLocNote}/>
    })

    // render loading message
    if (isLoading) { return <div>Loading ...</div> }


    return (
        <details className='bg-white shadow rounded group mb-4' open={categoryExpanded} >
            <summary className='list-none flex flex-wrap items-center cursor-pointer focus-visible:outline-none focus-visible:ring focus-visible:ring-pink-500 rounded group-open:rounded-b-none group-open:z-[1] relative'>
                <h3 className=' flex flex-1 p-4 font-semibold'>Category Container for {type}</h3>
                <div className='flex w-10 items-center justify-center'>
                    <div className='border-8 border-transparent border-l-gray-600 ml2 group-open:rotate-90 transition-transform origin-left'></div>
                </div>
            </summary>
            < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setNoteExpanded('open')}>Expand All Notes</button>
            < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setNoteExpanded(null)}>Collapse All Notes</button>
            <div>
                {locationCardsArray}
            </div>
        </details>
    )
}

export default CategoryContainer