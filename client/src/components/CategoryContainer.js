import React, { useState, useContext } from 'react'
import LocationCard from './LocationCard'
import { useAuth0 } from '@auth0/auth0-react'
import { NoSymbolIcon, PencilSquareIcon, ChevronDoubleDownIcon, ChevronDoubleUpIcon,LifebuoyIcon, ChevronUpIcon, DocumentPlusIcon, MinusCircleIcon, PencilIcon } from '@heroicons/react/24/solid'

import { Disclosure } from '@headlessui/react'

const CategoryContainer = ({ locationData, type, categoryExpanded, onDelLocation, onEditLocation, onNewLocNote, onDelLocNote, onEditLocNote }) => {
    const { isLoading } = useAuth0();
    const [noteExpanded, setNoteExpanded] = useState(null)

    const locationCardsArray = locationData.map((location) => {
        return <LocationCard key={location.id} locationData={location} noteExpanded={noteExpanded} onDelLocation={onDelLocation} onNewLocNote={onNewLocNote} onDelLocNote={onDelLocNote} onEditLocation={onEditLocation} onEditLocNote={onEditLocNote} />
    })

    // render loading message
    if (isLoading) { return (<><LifebuoyIcon className='h-5 animate-spin'/><div>Loading...</div></>) }


    return (

        <Disclosure>
            {({ open }) => (
                <>
                    <div className='flex  justify-end items-center'>
                        <Disclosure.Button className="flex grow justify-between  rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span className='capitalize'>{type}</span>
                            <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`} />
                        </Disclosure.Button>
                    </div>
                    <Disclosure.Panel className="flex grow flex-wrap ">
                        {locationCardsArray}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>


    )
}

export default CategoryContainer