import React from 'react'
import './NotesListItem.css';
import parse from 'html-react-parser';

// import data from '../../assets/data.json';

export default function NoteListItem(props) {
    const note = props.data;
    const showActive = props.onClick;

    return (
        <div className={props.className} onClick={showActive} data-id={props["data-id"]}>
            <h2 className="notes-item-title">{note.title}</h2>
            <div className="notes-item-detail">
                <h3 className="notes-item-date">{note.lastEditDate}</h3>
                <p className="notes-item-content">{parse(note.htmlContent)}</p>
            </div>
        </div>
    )
}
