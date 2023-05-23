import React, { useState, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router-dom'
import ReactModal from 'react-modal';

import { UserdataContext } from "../context/UserData";
import Delete from './Delete';
import NoteForm from './NoteForm';

const NotesCard = ({ noteData, onDelNote, path ,onEditNote}) => {
    const { isLoading, isAuthenticated } = useAuth0();
    const [isOpen, setIsOpen] = useState(false);
    const [expandEditNote, setExpandEditNote] = useState(false);
    const [userData] = useContext(UserdataContext);
    const params = useParams();

    // render loading message
    if (isLoading) { return <div>Loading ...</div> }

    return (
        <div>
            <div>
                <p key={noteData.id} >{noteData.note_body}</p>
            </div>
            {(isAuthenticated && Number(params.userId) === userData.id) && (
                <div>
                    <div>
                        < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setExpandEditNote(true)}>Edit Note</button>
                        <ReactModal appElement={document.getElementById('root') || undefined} isOpen={expandEditNote} contentLabel="Edit Note Modal" onRequestClose={() => setExpandEditNote(false)}>
                            <NoteForm type={path} noteData={noteData} onFormClose={() => setExpandEditNote(false)} onSubmit={onEditNote} />
                        </ReactModal>
                    </div>

                    <div>
                        < button className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50" onClick={() => setIsOpen(true)}>Delete Note</button>
                        <ReactModal appElement={document.getElementById('root') || undefined} isOpen={isOpen} contentLabel="Delete Note Modal" onRequestClose={() => setIsOpen(false)}>
                            <Delete idToDel={noteData.id} path={path} name={noteData.note_body} onFormClose={() => setIsOpen(false)} onDelete={onDelNote} />
                        </ReactModal>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotesCard

