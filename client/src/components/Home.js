import React, { useEffect, useState } from 'react'

import beach from '../images/sunset.jpg'
import temple from '../images/temple.jpg'
import seoul from '../images/seoul2.jpg'
import cities from '../images/cities.png'
import cityNotes from '../images/city-notes.png'
import { ArrowDownIcon } from '@heroicons/react/24/outline'

const Home = () => {
 
    return (
        <div className="h-full max-h-full overflow-y-scroll no-scrollbar snap snap-y snap-mandatory  ">
            <section className='flex flex-col justify-center justify-items-center py-2 w-full h-screen bg-center bg-cover snap-start'>
                <div className='flex-1' />
                <div className='relative w-full h-[75vh] md:h-[50vh] '>
                    <div className=' w-full h-full py-6 absolute'>
                        <div id='gradient' className='bg-gradient-to-tr from-blue-900 to-transparent  relative w-full h-full opacity-80'>
                            <img src={beach} alt="map" className="absolute w-full h-full object-cover object-bottom   mix-blend-overlay" />
                        </div>
                    </div>
                    <div className='relative h-full flex overflow-x-auto'>
                        <div className='flex-shrink-0 rounded-2xl w-fit ml-[5vw]  border-4 border-black backdrop-filter justify-center backdrop-blur-md flex flex-col '>
                            <div className='bg-slate-100 bg-opacity-30 h-1/2 w-full ml-8 rounded flex flex-col justify-center px-8' >

                                <h1 className='text-black md:text-4xl font-bold  '>Vicariously</h1>
                                <h2 className='text-slate-700 md:text-3xl font-small md:mt-5 '>Document your greatest travel finds</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-1' />
                <ArrowDownIcon class="animate-bounce text-lg  w-7 h-7 mt-auto self-center p-1 font-extrabold bg-white bg-opacity-40 rounded-full shadow-lg border-2 border-slate-200 border-opacity-50  " />
            </section>
            <section className='flex flex-col justify-center justify-items-center py-2 w-full h-screen bg-center bg-cover snap-start'>
                <div className='flex-1' />



                <div className='relative  mx-8 h-[80vh] md:h-[60vh] '>
                    <div className=' w-full h-full pt-6 pb-8 absolute'>
                        <div className='bg-gradient-to-tr from-blue-300 to-amber-300 rounded-2xl  relative w-full h-full opacity-70'>
                        </div>
                    </div>
                    <div className='relative h-full flex overflow-x-auto scrollbar  hover:scroll-auto  space-x-20'>
                    <img src={seoul} alt="map" className=" rounded-2xl w-fit md:w-1/3  border-2 border-black    " />

                        <div className='flex-shrink-0 rounded-2xl w-fit md:w-1/4 ml-[5vw]  border-2 border-black backdrop-filter justify-center backdrop-blur-md flex flex-col '>
                            <div className='bg-slate-100 bg-opacity-30 h-2/3 w-full ml-4 rounded flex flex-col justify-center px-8' >
                                <h1 className='text-black md:text-xl font-bold  '>Keep Track of All the <span className="  underline underline-offset-4 decoration-sky-500 ">Cities</span> You Have Visited</h1>
                            </div>
                        </div>

                        <img src={cities} alt="map" className=" rounded-2xl w-fit md:w-1/3  border-2 border-black    " />
                        <div className='flex-shrink-0 rounded-2xl w-fit md:w-1/4 ml-[5vw]  border-2 border-black backdrop-filter justify-center backdrop-blur-md flex flex-col '>
                            <div className='bg-slate-100 bg-opacity-30 h-2/3 w-full ml-4 rounded flex flex-col justify-center px-8' >
                                <h1 className='text-black md:text-xl font-bold  '>Keep Notes of All the Important Things to Know About that City</h1>
                            </div>
                        </div>
                        <img src={cityNotes} alt="map" className=" rounded-2xl w-fit md:w-1/3  border-2 border-black    " />
                        <div className='flex-shrink-0 rounded-2xl w-fit md:w-1/4 ml-[5vw]  border-2 border-black backdrop-filter justify-center backdrop-blur-md flex flex-col '>
                            <div className='bg-slate-100 bg-opacity-30 h-2/3 w-full ml-4 rounded flex flex-col justify-center px-8' >
                                <h1 className='text-black md:text-xl font-bold  '>Keep Track of All the <span className="  underline underline-offset-4 decoration-sky-500 ">Places</span> you Visited in that City</h1>
                            </div>
                        </div>
                        <img src={temple} alt="map" className=" rounded-2xl w-fit md:w-1/3  border-2 border-black    " />
                        <div className='flex-shrink-0 rounded-2xl w-fit md:w-1/4 ml-[5vw]  border-2 border-black backdrop-filter justify-center backdrop-blur-md flex flex-col '>
                            <div className='bg-slate-100 bg-opacity-30 h-2/3 w-full ml-4 rounded flex flex-col justify-center px-8' >
                                <h1 className='text-black md:text-xl font-bold  '>Keep Notes of All the Important Things to Know About that Place:</h1>
                                <p>Cost | Your Rating | Date Visited | Your Notes | Link | Map </p>
                            </div>
                        </div>
                    </div>

                </div>





                <div className='flex-1' />
                {/* <ArrowDownIcon class="animate-bounce text-lg  w-7 h-7 mt-auto self-center p-1 font-extrabold bg-white bg-opacity-40 rounded-full shadow-lg border-2 border-slate-200 border-opacity-50  " /> */}
            </section>
            {/* <section className='w-full h-full bg-blue-200  snap-start'>sec 2</section> */}
        </div>



        //     <div className='h-96 relative flex items-center '>
        //         <div className=' w-full h-full   absolute'>
        //             <img src={bgimg} alt="map" className="w-full h-full object-fill  absolute mix-blend-overlay " />
        //         </div>
        //         <div className='relative h-60 ml-10 flex-shrink-0  rounded-2xl w-1/2 backdrop-filter backdrop-blur-lg flex items-center'>
        //             <div className='w-80'>
        //                 <h1 className='text-black text-4xl font-bold'>Vicariously</h1>
        //                 <h2 className='text-slate-500 text-3xl font-light mt-5'>Document your greatest travel finds</h2>
        //             </div>
        //         </div>
        //     </div>
    )
}

export default Home

// https://daily-dev-tips.com/posts/making-a-fullscreen-vertical-slider-with-tailwind-and-eleventy/