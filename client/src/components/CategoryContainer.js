import React, { useState } from 'react'
import LocationCard from './LocationCard'

const CategoryContainer = ({ locations, type,expanded }) => {
    console.log({ locations })
    console.log({ type })

    const locationCardsArray = locations.map((location) => {
        return <LocationCard key={location.id} locationData={location} />
    })

    return (
        <details className='bg-white shadow rounded group mb-4' open={expanded} >

            <summary className='list-none flex flex-wrap items-center cursor-pointer focus-visible:outline-none focus-visible:ring focus-visible:ring-pink-500 rounded group-open:rounded-b-none group-open:z-[1] relative'>
                <h3 className=' flex flex-1 p-4 font-semibold'>Category Container for {type}</h3>
                <div className='flex w-10 items-center justify-center'>
                    <div className='border-8 border-transparent border-l-gray-600 ml2 group-open:rotate-90 transition-transform origin-left'></div>
                </div>
            </summary>
            <div>

                {locationCardsArray}
            </div>
        </details>
    )
}

export default CategoryContainer