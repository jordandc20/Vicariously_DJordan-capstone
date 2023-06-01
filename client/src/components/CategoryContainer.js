import React, { useState, useContext } from 'react'
import LocationCard from './LocationCard'
import { useAuth0 } from '@auth0/auth0-react'
import { NoSymbolIcon, PencilSquareIcon, ChevronDoubleDownIcon, ChevronDoubleUpIcon, LifebuoyIcon, ChevronUpIcon, DocumentPlusIcon, MinusCircleIcon, PencilIcon } from '@heroicons/react/24/solid'

import { Disclosure } from '@headlessui/react'

const CategoryContainer = ({ locationData, type, categoryExpanded, onDelLocation, onEditLocation, onNewLocNote, onDelLocNote, onEditLocNote }) => {
    const { isLoading } = useAuth0();
    const [noteExpanded, setNoteExpanded] = useState(null)

    const locationCardsArray = locationData.map((location) => {
        return <LocationCard key={location.id} locationData={location} noteExpanded={noteExpanded} onDelLocation={onDelLocation} onNewLocNote={onNewLocNote} onDelLocNote={onDelLocNote} onEditLocation={onEditLocation} onEditLocNote={onEditLocNote} />
    })

    // render loading message
    if (isLoading) { return (<><LifebuoyIcon className='h-5 animate-spin' /><div>Loading...</div></>) }


    return (

        <Disclosure className=''>
            {({ open }) => (
                < >
                    <Disclosure.Button className={`flex w-full justify-between  ${open ? 'bg-sky-50 border-l-2 border-sky-700' : 'bg-amber-50'}  px-4 py-2 text-left text-sm font-medium text-indigo hover:bg-sky-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 cursor-pointer`}>
                        <span className='capitalize'>{type}</span>
                        <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-indigo-500 transition`} />
                    </Disclosure.Button>
                    <Disclosure.Panel className=" overflow-hidden border-l-2 bg-neutral-50 bg-opacity-80 border-slate-300 leading-normal">
                        {locationCardsArray}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>


    )
}

export default CategoryContainer