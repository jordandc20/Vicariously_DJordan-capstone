import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import bgimg from '../images/v660-mon-35-travelbadge.jpg'

const Home = () => {

    return (

        <div className='h-96 relative flex items-center '>
            <div className=' w-full h-full   absolute'>
                <img src={bgimg} alt="map" className="w-full h-full object-fill  absolute mix-blend-overlay " />
            </div>
            <div className='relative h-60 ml-10 flex-shrink-0  rounded-2xl w-1/2 backdrop-filter backdrop-blur-lg flex items-center'>
                <div className='w-80'>
                    <h1 className='text-black text-4xl font-bold'>Vicariously</h1>
                    <h2 className='text-slate-500 text-3xl font-light mt-5'>Document your greatest travel finds</h2>
                </div>
            </div>
        </div>
    )
}

export default Home