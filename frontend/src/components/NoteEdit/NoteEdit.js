import React, { useState } from 'react'
import axios from 'axios';
import './NoteEdit.css';

export default function NoteEdit(props) {
    const MESSAGES = require('../../messages.json');
    const { note, finishEdit, setStatus } = props;

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    function handleSubmit(e) {
        e.preventDefault();
        if (title === '') {
            return setStatus(MESSAGES.TITLE_REQUIRED);
        }
        const requestBody = {
            title: title,
            content: content
        };
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update/${note._id}`, requestBody)
            .then(() => {
                finishEdit(requestBody);
            })
            .catch((err) => console.error(err));
    }

    function handleCancel(e) {
        e.preventDefault();
        finishEdit(null);
    }

    return (
        <div id="note-create">
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="note-create-btns">
                    <button className="create-btn create-save-btn">Save</button>
                    <button className="create-btn create-cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
                <input type="text" name="create-title" className="note-create-title" 
                    onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Title"/>
                <textarea name="create-content"
                    className="note-create-content" onChange={(e) => setContent(e.target.value)} 
                    placeholder="Enter your text here" value={content} />
            </form>
            {/* <div id="Content" className="note-create-content" contentEditable={true}>{content}</div> */}
        </div>
    )
}