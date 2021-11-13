import React, { useState } from 'react';
import './NoteCreate.css';
import parse from 'html-react-parser';


import { useAuth } from '../../contexts/AuthContext';
import { useNotes } from '../../contexts/NotesContext';

export default function NoteCreate(props) {
    const MESSAGES = require('../../messages.json');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const { currentUser } = useAuth();
    const { createNote, 
            setStatus, 
            getNotes 
        } = useNotes();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (title === '') {
                return setStatus(MESSAGES.TITLE_REQUIRED);
            }
            const requestBody = {
                userID: currentUser.uid,
                title: title,
                content: content
            };
            await createNote(requestBody);
            setStatus(MESSAGES.NOTE_CREATE_SUCCESS);
            await getNotes();
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div id="note-create">
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="note-create-btns">
                    <button className="create-btn create-save-btn">Create</button>
                </div>
                <input 
                    className="note-create-title" 
                    name="create-title" 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Title"
                    type="text" 
                    value={title} 
                />
                <textarea 
                    className="note-create-content" 
                    name="create-content"
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder="Enter your text here" 
                    value={parse(content)} 
                />
            </form>
            {/* <div id="Content" className="note-create-content" contentEditable={true}>{content}</div> */}
        </div>
    )
}
