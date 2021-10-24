import React from 'react';
import './NotesList.css';

import NotesListItem from '../NotesListItem';

export default function NotesList(props) {
    const { data, showActive, activeNote, userID } = props;

    function renderNoteList() {
        return (
            // TODO: API call to DB for user and their notes
            data.map((note, key) => {
                if (key === activeNote) {
                    return <NotesListItem data={note} onClick={showActive} data-id={key} key={key} className={"notes-item active"}/>
                } else {
                    return <NotesListItem data={note} onClick={showActive} data-id={key} key={key} className={"notes-item"}/>
                }
                
            })
        )
    }

    return (
        <div id="notes-list">
            {
                // TODO: Will need to pass in userID in browser
                renderNoteList(userID)
            }
        </div>
    )
}
