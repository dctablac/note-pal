import React from 'react';
import './NotesList.css';

import NotesListItem from '../NotesListItem';

export default function NotesList(props) {
    const { notes, makeActive, activeNote, handleClick } = props;

    function renderNoteList() {
        return (
            notes.map((note, key) => {
                if (key === activeNote) {
                    return <NotesListItem key={key} data={note} onClick={makeActive} data-id={key} className={"notes-item active"}/>
                } else {
                    return <NotesListItem key={key} data={note} onClick={makeActive} data-id={key} className={"notes-item"}/>
                }
            })
        )
    }

    return (
        <div id="notes-list">
            <div className="create-note-item" onClick={handleClick}>
                <p>+ New Note</p>
            </div>
            {notes && renderNoteList()}
        </div>
    )
}
