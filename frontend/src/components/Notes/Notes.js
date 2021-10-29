import React, { useState, useEffect, Fragment } from 'react'
import './Notes.css';
import axios from 'axios';

import NotesDisplay from '../NotesDisplay';
import NotesList from '../NotesList';
import NoteDeletePrompt from '../NoteDeletePrompt';

import { useAuth } from '../../contexts/AuthContext';

// This will be main notes container. Utilizing NotesList and NotesDisplay components
export default function Notes() {
    const { currentUser } = useAuth();

    const [activeNote, setActiveNote] = useState(0);
    const [noteList, setNoteList] = useState(null);
    const [noteToDisplay, setNoteToDisplay] = useState(null);
    const [noteCount, setNoteCount] = useState(0);
    const [editing, setEditing] = useState(false);
    const [deletePending, setDeletePending] = useState(false);
    const [status, setStatus] = useState('');


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/read/${currentUser.uid}`)
            .then(res => {
                setNoteList(res.data.notes);
                setNoteToDisplay(res.data.notes[0]);
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

    function showEditDisplay(dataID) {
        // Show edit component in display
        setEditing(true);
    }

    function cancelEdit() {
        setEditing(false)
    }

    function editNote(dataID, edits) {
        if (!edits) {
            return setEditing(false);
        }
        noteList[dataID].title = edits.title;
        noteList[dataID].content = edits.content;
        setEditing(false);
        setNoteList([...noteList]);
    }

    function handleDeleteConfirm() {
        deleteNote(activeNote);
        setDeletePending(false);
    }

    function deleteNote(dataID) { // Given NoteList id, delete note at that index
        const note = noteList[dataID];
        // Delete note
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete/${note['_id']}`)
            .then(() => {
                let lastElementIndex = noteList.length-1;
                let newNoteList = [...noteList];
                newNoteList.splice(dataID, 1);
                setStatus('Note deleted successfully');
                if (activeNote === lastElementIndex) {
                    setActiveNote(noteList.length-1); // List length shortened, repoint to last element of new list
                } else if (activeNote === 0) {
                    setActiveNote(0); // List length shortened, repoint to first element
                }
                setNoteList(newNoteList);
                setNoteToDisplay(noteList[activeNote+1]);
            })
            .catch((err) => console.error(err));
    }  

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
                <div id="note-book">
                    <NotesList notes={noteList} activeNote={activeNote} makeActive={makeActive} 
                            handleClick={createNewNote} handleDelete={(dataID) => deleteNote(dataID)}
                            handleEdit={showEditDisplay} setDeletePending={setDeletePending}/>
                    <NotesDisplay noteToDisplay={noteToDisplay} editing={editing} 
                                makeRefresh={() => {setNoteCount(noteCount+1);}}
                                cancelEdit={cancelEdit} editNote={(edits) => editNote(activeNote, edits)}
                                setStatus={(msg) => setStatus(msg)}
                    />
                </div>
            </div>
            {
                deletePending && 
                <NoteDeletePrompt 
                    setDeletePending={setDeletePending} 
                    handleDeleteConfirm={handleDeleteConfirm} 
                />
            }
        </Fragment>
    )
}
