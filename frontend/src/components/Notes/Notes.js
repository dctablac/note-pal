import React, { useEffect, Fragment } from 'react'
import './Notes.css';

import NotesDisplay from '../NotesDisplay';
import NotesList from '../NotesList';
import NoteDeletePrompt from '../NoteDeletePrompt';

import { useNotes } from '../../contexts/NotesContext';

// This will be main notes container. Utilizing NotesList and NotesDisplay components
export default function Notes() {
    const { getNotes, status, setStatus,
            deletePending
    } = useNotes();


    useEffect(() => {
        getNotes(); // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <div id="notes-page">
                {
                    (status !== '') && 
                    <p className="notes-status">
                        <button className="notes-status-btn" onClick={() => setStatus('')}>X</button>
                        {status}
                    </p>
                }
                    <NotesList />
                    <NotesDisplay />
            </div>
            { deletePending && <NoteDeletePrompt /> }
        </Fragment>
    )
}
