import React from 'react'
import './Notes.css';

import NotesDisplay from '../NotesDisplay';
import NotesList from '../NotesList';

// This will be main notes container. Utilizing NotesList and NotesDisplay components
export default function Notes() {
    return (
        <div id="notes-page">
            <div id="note-book">
                <NotesList />
                <NotesDisplay />
            </div>
        </div>
    )
}
