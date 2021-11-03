import React, { Fragment } from 'react';
import './NotesList.css';

import NotesListItem from '../NotesListItem';

export default function NotesList(props) {
    const { notes, makeActive, activeNote, 
            handleClick, handleEdit, setDeletePending,
            editing, isHiddenList, setIsHiddenList
          } = props;

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
        setIsHiddenList(true);
    }

    return (
        <Fragment>
            <div className={isHiddenList ? "hidden-notes-list" : "notes-list"}>
                <div className="hide-notes-list-arrow" onClick={hideNotesList}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                        <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                    </svg>
                    <p>Hide List</p>
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
