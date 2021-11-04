import React, { Fragment } from 'react';
import './NotesList.css';

import NotesListItem from '../NotesListItem';

export default function NotesList(props) {
    const { notes, makeActive, activeNote, 
            handleClick, handleEdit, setDeletePending,
            editing, isHiddenList
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

    return (
        <Fragment>
            <div className={isHiddenList ? "hidden-notes-list" : "notes-list"}>
                {editing && <div className="notes-list-block"></div>}
                <div className="create-note-item" onClick={handleClick}>
                    <p>+ New Note</p>
                </div>
                {notes && renderNoteList()}
            </div>
        </Fragment>
    )
}
