import React, { useState, useEffect } from 'react'
import './Notes.css';
import axios from 'axios';

import NotesDisplay from '../NotesDisplay';
import NotesList from '../NotesList';
import NoteDeletePrompt from '../NoteDeletePrompt';

import { useAuth } from '../../contexts/AuthContext';
import { NotesProvider } from '../../contexts/NotesContext';

// This will be main notes container. Utilizing NotesList and NotesDisplay components
export default function Notes() {
    const MESSAGES = require('../../messages.json');
    const { currentUser } = useAuth();

    const [activeNote, setActiveNote] = useState(0);
    const [noteList, setNoteList] = useState(null);
    const [noteToDisplay, setNoteToDisplay] = useState(null);
    const [noteCount, setNoteCount] = useState(0);
    const [editing, setEditing] = useState(false);
    const [deletePending, setDeletePending] = useState(false);
    const [status, setStatus] = useState('');
    const [isHiddenList, setIsHiddenList] = useState(false);


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
        setIsHiddenList(true);
    }

    function createNewNote() {
        // Set noteToDisplay to null -> Shows NoteCreate component
        setNoteToDisplay(null);
        setIsHiddenList(true);
    }

    function showEditDisplay(dataID) {
        // Show edit component in display
        setEditing(true);
        setIsHiddenList(true);
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
        noteList[dataID].updatedAt = Date.now()
        setEditing(false);
        setStatus(MESSAGES.NOTE_EDIT_SUCCESS);
        setNoteList([...noteList]);
    }

    function handleDeleteConfirm() {
        deleteNote(activeNote);
        setDeletePending(false);
        setIsHiddenList(false);
        setStatus(MESSAGES.NOTE_DELETE_SUCCESS);
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
        <NotesProvider>
            <div id="notes-page">
                {
                    (status !== '') && 
                    <p className="notes-status">
                        <button className="notes-status-btn" onClick={() => setStatus('')}>X</button>
                        {status}
                    </p>
                }
                    <NotesList notes={noteList} activeNote={activeNote} makeActive={makeActive} 
                            handleClick={createNewNote} handleDelete={(dataID) => deleteNote(dataID)}
                            handleEdit={showEditDisplay} setDeletePending={setDeletePending} editing={editing}
                            isHiddenList={isHiddenList} setIsHiddenList={setIsHiddenList}
                    />
                    <NotesDisplay noteToDisplay={noteToDisplay} editing={editing} 
                                setEditing={setEditing} makeRefresh={() => {setNoteCount(noteCount+1);}}
                                cancelEdit={cancelEdit} editNote={(edits) => editNote(activeNote, edits)}
                                setStatus={(msg) => setStatus(msg)} isHiddenList={isHiddenList} 
                                setIsHiddenList={setIsHiddenList}
                    />
            </div>
            {
                deletePending && 
                <NoteDeletePrompt setDeletePending={setDeletePending} handleDeleteConfirm={handleDeleteConfirm}
                                setStatus={setStatus}
                />
            }
        </NotesProvider>
    )
}
