import React from 'react';
import './NotesList.css';

import data from '../../assets/data.json';
import NotesListItem from '../NotesListItem';

export default function NotesList() {
    return (
        <div id="notes-list">
            <NotesListItem data={data.users["1"].notes[0]}/>
            <NotesListItem data={data.users["1"].notes[1]}/>
        </div>
    )
}
