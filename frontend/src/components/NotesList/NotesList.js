import React from 'react';
import './NotesList.css';

import NotesListItem from '../NotesListItem';
import { useNotes } from '../../contexts/NotesContext';

export default function NotesList() {
    const { activeNote, setActiveNote, 
            editPending, isHiddenList, setIsHiddenList, 
            setNoteToDisplay, notesList } = useNotes();

    function handleShowCreateNote() {
        setNoteToDisplay(null);
        setIsHiddenList(true);
    }

    function handleMakeActiveNote(e) {
        const newActiveNotesListIndex = parseInt(e.target.getAttribute("notes-list-index"));
        setActiveNote(newActiveNotesListIndex);
        setNoteToDisplay(notesList[newActiveNotesListIndex]);
        setIsHiddenList(true);
    }

    function renderNoteList() {
        return (
            notesList.map((note, key) => {
                if (key === activeNote) {
                    return <NotesListItem 
                                className={"notes-item active-note"}
                                note={note} 
                                key={key} 
                                handleMakeActiveNote={handleMakeActiveNote} 
                                notesListIndex={key} 
                            />
                }
                return <NotesListItem 
                            className={"notes-item"}
                            note={note}
                            key={key}
                            handleMakeActiveNote={handleMakeActiveNote}
                            notesListIndex={key}
                        />
            })
        )
    }

    return (
        <div className={isHiddenList ? "hidden-notes-list" : "notes-list"}>

            {editPending && <div className="notes-list-block"></div>}

            <div className="create-note-item" onClick={handleShowCreateNote}>
                <p>+ New Note</p>
            </div>
            
            {notesList && renderNoteList()}

        </div>
    )
}
