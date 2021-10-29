import React from 'react';
import './NoteDeletePrompt.css';

export default function DeleteConfirmation(props) {
    const { setDeletePending, handleDeleteConfirm } = props;
    return (
        <div id="note-delete-prompt-container">
            <div id="note-delete-prompt">
                <p>
                    Are you sure you wish to delete this note?<br/>
                    This action cannot be undone.
                </p>
                <div id="note-delete-prompt-btns">
                    <button className="note-delete-prompt-btn delete-confirm-btn" onClick={handleDeleteConfirm}>Delete</button>
                    <button className="note-delete-prompt-btn" onClick={() => {setDeletePending(false)}}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
