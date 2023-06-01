// import {InformationCircleIcon } from '@heroicons/react/24/solid'


export default function Tooltip({ message, children }) {
    return (
    <div className="group relative ">
        {children}
        <span className="absolute  bottom-8 right-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs w-fit text-white group-hover:scale-100">{message}</span>
    </div>
    )
}