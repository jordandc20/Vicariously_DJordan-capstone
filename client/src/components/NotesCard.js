import React, { useState, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router-dom'
import ReactModal from 'react-modal';

import { UserdataContext } from "../context/UserData";
import Delete from './Delete';

const NotesCard = ({ noteData, onDelNote, path }) => {
    const { isLoading, isAuthenticated } = useAuth0();
    const [isOpen, setIsOpen] = useState(false);
    const [userData] = useContext(UserdataContext);
    const params = useParams();

    // render loading message
    if (isLoading) { return <div>Loading ...</div> }

    return (
        <div>

            <p key={noteData.id} >{noteData.note_body}</p>
            {(isAuthenticated && Number(params.userId) === userData.id) && (<div>
                < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={(e) => { e.stopPropagation(); setIsOpen(true) }}>Delete Note</button>
                <ReactModal appElement={document.getElementById('root') || undefined} isOpen={isOpen} contentLabel="Delete Note Modal" onRequestClose={() => setIsOpen(false)}>
                    <Delete idToDel={noteData.id} path={path} name={noteData.note_body} onFormClose={() => setIsOpen(false)} onDelete={onDelNote} />
                </ReactModal>
            </div>)}
        </div>
    )
}

export default NotesCard

