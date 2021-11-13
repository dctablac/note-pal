import React from 'react';
import { useNotes } from '../../contexts/NotesContext';
import './NoteDeletePrompt.css';

export default function NoteDeletePrompt() {
    const MESSAGES = require('../../messages.json');
    const { deleteNote, 
            getNotes,
            noteToDisplay,
            setDeletePending, 
            setIsHiddenList, 
            setStatus 
        } = useNotes();

    async function handleDeleteConfirmed() {
        try {
            await deleteNote(noteToDisplay);
            setStatus(MESSAGES.NOTE_DELETE_SUCCESS);
            setIsHiddenList(false);
            setDeletePending(false);
            await getNotes();
        } catch(err) {
            console.error(err);
        }
    }

    function handleDeleteCancelled() {
        setDeletePending(false);
    }

    return (
        <div id="note-delete-prompt-container">
            <div id="note-delete-prompt">
                <p>
                    Are you sure you wish to delete this note?<br/>
                    This action cannot be undone.
                </p>
                <div id="note-delete-prompt-btns">
                    <button className="note-delete-prompt-btn delete-confirm-btn" onClick={handleDeleteConfirmed}>Delete</button>
                    <button className="note-delete-prompt-btn" onClick={handleDeleteCancelled}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
