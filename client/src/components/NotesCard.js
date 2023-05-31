import React, { useState, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router-dom'
import { NoSymbolIcon, PencilSquareIcon, ChevronUpIcon, DocumentPlusIcon, MinusCircleIcon, PencilIcon } from '@heroicons/react/24/solid'

import { UserdataContext } from "../context/UserData";
import Delete from './Delete';
import NoteForm from './NoteForm';

const NotesCard = ({ noteData, onDelNote, path, onEditNote }) => {
    const { isLoading, isAuthenticated } = useAuth0();
    const [isOpen, setIsOpen] = useState(false);
    const [expandEditNote, setExpandEditNote] = useState(false);
    const [userData] = useContext(UserdataContext);
    const params = useParams();

    // render loading message
    if (isLoading) { return <div>Loading ...</div> }

    return (
        <div className='flex justify-start items-baseline'>
            {(isAuthenticated && Number(params.userId) === userData.id) && (
                <div className='flex '>
                    <div>
                        <PencilSquareIcon className="h-3 w-3 mr-1 lg:h-3 lg:w-3   rounded-full bg-transparent text-sky-500 hover:scale-110" onClick={(e) => { e.stopPropagation(); setExpandEditNote(true) }} />
                        <NoteForm show={expandEditNote} type={path} noteData={noteData} onFormClose={() => setExpandEditNote(false)} onSubmit={onEditNote} />
                    </div>
                    <div >
                        <MinusCircleIcon className="h-3 w-3 lg:h-3 lg:w-3  rounded-full bg-red-500 text-white hover:scale-110" onClick={(e) => { e.stopPropagation(); setIsOpen(true) }} />
                        <Delete show={isOpen} idToDel={noteData.id} path={path} name={noteData.note_body} onFormClose={() => setIsOpen(false)} onDelete={onDelNote} />
                    </div>
                </div>
            )} 
            <div className=' mx-2 text-gray-900'>
                <p key={noteData.id}>{noteData.note_body}</p>
            </div>
           
        </div>
    )
}

export default NotesCard

