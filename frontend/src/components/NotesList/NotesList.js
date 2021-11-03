import React, { Fragment, useState } from 'react';
import './NotesList.css';

import NotesListItem from '../NotesListItem';

export default function NotesList(props) {
    const { notes, makeActive, activeNote, 
            handleClick, handleEdit, setDeletePending,
            editing 
          } = props;
    const [isHidden, setIsHidden] = useState(false);

    function renderNoteList() {
        return (
            notes.map((note, key) => {
                if (key === activeNote) {
                    return <NotesListItem key={key} data={note} onClick={makeActive} setDeletePending={setDeletePending} handleEdit={handleEdit} data-id={key} className={"notes-item active-note"}/>
                } else {
                    return <NotesListItem key={key} data={note} onClick={makeActive} setDeletePending={setDeletePending} handleEdit={handleEdit} data-id={key} className={"notes-item"}/>
                }
            })
        )
    }

    function hideNotesList() {
        setIsHidden(true);
    }

    return (
        <Fragment>
            <div id="notes-list" className={isHidden ? "notes-list-hidden" : ""}>
                <div className="notes-list-arrow" onClick={hideNotesList}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                        <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                    </svg>
                </div>
                {editing && <div className="notes-list-block"></div>}
                <div className="create-note-item" onClick={handleClick}>
                    <p>+ New Note</p>
                </div>
                {notes && renderNoteList()}
            </div>
        </Fragment>
    )
}
