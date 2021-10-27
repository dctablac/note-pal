import React, { useState, useEffect } from 'react'
import './Notes.css';
import axios from 'axios';

import NotesDisplay from '../NotesDisplay';
import NotesList from '../NotesList';

import { useAuth } from '../../contexts/AuthContext';

// This will be main notes container. Utilizing NotesList and NotesDisplay components
export default function Notes() {
    const { currentUser } = useAuth();

    const [activeNote, setActiveNote] = useState(0);
    const [noteList, setNoteList] = useState(null);
    const [noteToDisplay, setNoteToDisplay] = useState(null);
    const [noteCount, setNoteCount] = useState(0);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/read/${currentUser.uid}`)
            .then(res => {
                setNoteList(res.data.notes);
                setNoteToDisplay(res.data.notes[activeNote]);
            });
    }, [currentUser.uid, noteCount]);

    function makeActive(e) {
        const newActiveNoteKey = parseInt(e.target.getAttribute("data-id"));
        setActiveNote(newActiveNoteKey);
        setNoteToDisplay(noteList[newActiveNoteKey]);
    }

    function createNewNote() {
        // Set noteToDisplay to null -> Shows NoteCreate component
        setNoteToDisplay(null);
    }

    return (
        <div id="notes-page">
            <div id="note-book">
                <NotesList notes={noteList} activeNote={activeNote} makeActive={makeActive} 
                           handleClick={createNewNote} />
                <NotesDisplay noteToDisplay={noteToDisplay} makeRefresh={() => {setActiveNote(0); setNoteCount(noteCount+1);}}/>
            </div>
        </div>
    )
}
