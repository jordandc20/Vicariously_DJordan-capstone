import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const About = () => {

    return (
        <div >
            <div className='flex mt-5 mb-6 justify-center  w-full'>
                <div className='flex h-fit mb-1  z-25 relative '>
                    <span class="block absolute shadow -inset-1 -skew-y-6 translate-x-3 bg-opacity-80 bg-amber-500 rounded "></span>
                    <span class="block absolute shadow -inset-1 skew-y-3 bg-sky-500 rounded  bg-opacity-80 " ></span>
                    <h1 className="h1">About Vicariously</h1>
                </div>
            </div>
            <p>Vicariously is the Flatiron Capstone Project of D Jordan</p>
            <p>D Jordan LinkedIn</p>

            <p>home page image fro <a href="https://www.freepik.com/free-vector/modern-world-map-background_1102658.htm">Image by Harryarts</a> on Freepik</p>
            <p><a href="https://www.freepik.com/free-vector/stamped-postcard-frame-with-travel-theme_13311480.htm#query=travel&position=25&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik</p>
        </div>

    )
}

export default About 