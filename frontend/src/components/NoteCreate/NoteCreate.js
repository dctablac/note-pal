import axios from 'axios';
import React, { useState } from 'react';
import './NoteCreate.css';
import parse from 'html-react-parser';

import { useAuth } from '../../contexts/AuthContext';

export default function NoteCreate(props) {
    const { makeRefresh, setStatus } = props;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { currentUser } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();
        if (title === '') {
            return alert('Please enter a title');
        }
        const requestBody = {
            userID: currentUser.uid,
            title: title,
            content: content
        };
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/create`, requestBody)
            .then(() => {
                setStatus('Note created successfully')
                makeRefresh();
            })
            .catch((err) => console.error(err));
    }

    return (
        <div id="note-create">
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="note-create-btns">
                    <button className="create-btn create-save-btn">Create</button>
                </div>
                <input type="text" name="create-title" className="note-create-title" 
                    onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Title"/>
                <textarea name="create-content"
                    className="note-create-content" onChange={(e) => setContent(e.target.value)} 
                    placeholder="Enter your text here" value={parse(content)} />
            </form>
            {/* <div id="Content" className="note-create-content" contentEditable={true}>{content}</div> */}
        </div>
    )
}
