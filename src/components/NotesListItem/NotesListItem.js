import React from 'react'
import './NotesListItem.css';
import parse from 'html-react-parser';

// import data from '../../assets/data.json';

export default function NoteListItem(props) {
    const note = props.data;
    
    return (
        <div className="notes-item">
            <h2 className="notes-item-title">{note.title}</h2>
            <div className="notes-item-detail">
                <h3 className="notes-item-date">{note.lastEditDate}</h3>
                <p className="notes-item-content">{parse(note.htmlContent)}</p>
            </div>
        </div>
    )
}
