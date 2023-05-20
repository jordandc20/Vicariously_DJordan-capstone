import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactModal from 'react-modal';

import Delete from './Delete';
const NotesCard = ({ cityNoteData, userData, onDelCityNote }) => {
    const { isLoading, isAuthenticated } = useAuth0();
    const [isOpen, setIsOpen] = useState(false);

    const params = useParams();

    return (
        <div>

            <p key={cityNoteData.id} >{cityNoteData.note_body}</p>
            {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
                < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={(e) => { e.stopPropagation(); setIsOpen(true) }}>Delete Note</button>
                <ReactModal isOpen={isOpen} contentLabel="Example Modal" onRequestClose={() => setIsOpen(false)}>
                    <Delete idToDel={cityNoteData.id} path='citynotes' name={cityNoteData.note_body} onFormClose={() => setIsOpen(false)} onDelete={onDelCityNote} />
                </ReactModal>
            </div>)}
        </div>
    )
}

export default NotesCard

