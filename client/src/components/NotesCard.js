import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactModal from 'react-modal';

import Delete from './Delete';
const NotesCard = ({ noteData, userData, onDelNote ,path}) => {
    const { isLoading, isAuthenticated } = useAuth0();
    const [isOpen, setIsOpen] = useState(false);

    const params = useParams();



    return (
        <div>

            <p key={noteData.id} >{noteData.note_body}</p>
            {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
                < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={(e) => { e.stopPropagation(); setIsOpen(true) }}>Delete Note</button>
                <ReactModal isOpen={isOpen} contentLabel="Example Modal" onRequestClose={() => setIsOpen(false)}>
                    <Delete idToDel={noteData.id} path={path} name={noteData.note_body} onFormClose={() => setIsOpen(false)} onDelete={onDelNote} />
                </ReactModal>
            </div>)}
        </div>
    )
}

export default NotesCard

