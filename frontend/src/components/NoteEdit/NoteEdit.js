import React, { useState } from 'react'
import './NoteEdit.css';
import { useNotes } from '../../contexts/NotesContext';

export default function NoteEdit() {
    const MESSAGES = require('../../messages.json');
    const { editNote, getNotes, noteToDisplay, setEditPending, setStatus } = useNotes();

    const [title, setTitle] = useState(noteToDisplay.title);
    const [content, setContent] = useState(noteToDisplay.content);

    async function handleSubmit(e) {
        e.preventDefault();
        if (title === '') {
            return setStatus(MESSAGES.TITLE_REQUIRED);
        }
        const requestBody = {
            title: title,
            content: content
        };
        try {
            await editNote(requestBody);
            setStatus(MESSAGES.NOTE_EDIT_SUCCESS);
            setEditPending(false);
            await getNotes();
        } catch(err) {
            console.error(err);
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        setEditPending(false);
    }

    return (
        <div id="note-edit">
            <form className="edit-form" onSubmit={handleSubmit}>
                <div className="note-edit-btns">
                    <button className="edit-btn edit-save-btn">Save</button>
                    <button className="edit-btn edit-cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
                <input 
                    type="text" 
                    name="edit-title"
                    className="note-edit-title" 
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title} 
                    placeholder="Title"
                />
                <textarea 
                    name="edit-content"
                    className="note-edit-content" 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder="Enter your text here" 
                    value={content} 
                />
            </form>
            {/* <div id="Content" className="note-create-content" contentEditable={true}>{content}</div> */}
        </div>
    )
}