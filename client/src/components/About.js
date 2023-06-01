import React from 'react'
const About = () => {



    return (
        <div >
            <div className='flex mt-5 mb-6 justify-center  w-full'>
                <div className='flex h-fit mb-1  z-25 relative '>
                    <span className="block absolute shadow -inset-1 -skew-y-6 translate-x-3 bg-opacity-80 bg-amber-500 rounded "></span>
                    <span className="block absolute shadow -inset-1 skew-y-3 bg-sky-500 rounded  bg-opacity-80 " ></span>
                    <h1 className="h1">About Vicariously</h1>
                </div>
            </div>
            <div className='px-5'>

                <p>Vicariously is the Flatiron Capstone Project of <span className="  underline underline-offset-4 font-semibold decoration-sky-500 ">Diana Jordan</span>  <button id='cityFormCancel' type="reset" className="inline-flex justify-center rounded border border-transparent  p-2 text-sm font-medium text-white hover:bg-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 bg-[#0077B5]" value="Cancel" onClick={(e) => {
                    e.preventDefault(); window.location.href = 'https://www.linkedin.com/in/diana-c-jordan/'
                }}
                ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg></button></p>

                <p>Technologies Used Include:</p>
                <ul className="list-disc px-10">
                    <li>ReactJs</li>
                    <li>Tailwind</li>
                    <li>auth0/auth0-react</li>
                    <li>headlessui</li>
                    <li>Formik</li>
                    <li>yup</li>
                    <li>heroicons</li>
                    <li>react-google-maps/api</li>
                    <li>axios</li>
                    <li>react-hot-toast</li>
                    <li>Flask</li>
                    <li>gunicorn</li>
                    <li>flask-sqlalchemy</li>
                    <li>PostgreSQL</li>
                </ul>




                {/* <p>home page image fro <a href="https://www.freepik.com/free-vector/modern-world-map-background_1102658.htm">Image by Harryarts</a> on Freepik</p>
                <p><a href="https://www.freepik.com/free-vector/stamped-postcard-frame-with-travel-theme_13311480.htm#query=travel&position=25&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik</p> */}
            </div>
        </div>

    )
}

export default About 