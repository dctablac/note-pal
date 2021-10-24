import React, { useState } from 'react'
import './Notes.css';

import data from '../../assets/data.json';

import NotesDisplay from '../NotesDisplay';
import NotesList from '../NotesList';

// This will be main notes container. Utilizing NotesList and NotesDisplay components
export default function Notes() {
    const [activeNote, setActiveNote] = useState(0);
    const userID = "1";

    function showActive(e) {
        setActiveNote(parseInt(e.target.getAttribute("data-id")));
    }

    function hasNotes(userID) {
        // If user has notes, data.users["2"].notes[activeNote]
        return data.users[userID].notes.length > 0;
    }

    // function getNotes(userID) {

    // }

    // TODO: Make userID lookup dynamic
    return (
        <div id="notes-page">
            <div id="note-book">
                <NotesList data={data[userID].notes} showActive={showActive} activeNote={activeNote} userID={userID}/>
                <NotesDisplay noteToDisplay={hasNotes ? data[userID].notes[activeNote] : null} />
            </div>
        </div>
    )
}
