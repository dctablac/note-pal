import React, { Fragment } from 'react'
import './NotesDisplay.css';

import parse from 'html-react-parser';
import NoteCreate from '../NoteCreate';
import NoteEdit from '../NoteEdit';

export default function NotesDisplay(props) {
    const { noteToDisplay, editing, setEditing, makeRefresh, 
            editNote, cancelEdit, setStatus,
            isHiddenList, setIsHiddenList
          } = props;
    const { title, content, updatedAt } = noteToDisplay ? noteToDisplay : {title: null, content: null, updatedAt: null};
    const numToMonth = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    }

    function formatDate(date) { // 10/22/2021 --> October 22, 2021
        const dateSplit = date.split('/'); // 10/22/2021 --> [10,22,2021]
        const month = numToMonth[dateSplit[0]];
        const day = dateSplit[1];
        const year = dateSplit[2];
        return `${month} ${day}, ${year}`;
    }

    function formatTime(timeInfo) {
        const timeSplit = timeInfo.split(' '); // [9:04:34, PM]
        let time = timeSplit[0];
        time = time.substring(0, time.length - 3); // 9:04:34 --> 9:04
        const abbreviation = timeSplit[1];
        return `${time} ${abbreviation}`;
    }

    function formatUpdatedAt(dateInfo) { // 2021-10-26T23:42:22.335Z --> October 26, 2021 at XX:XX XM
        if (!dateInfo) return '';
        try {
            const dateTime = new Date(dateInfo);
            const date = formatDate(dateTime.toLocaleDateString());
            const time = formatTime(dateTime.toLocaleTimeString());
            return `${date} at ${time}`;
        } catch(err) {
            console.error(err);
        }
    }

    function showNotesList() {
        setIsHiddenList(false);
    }

    function editNoteOnDisplay() {
        setEditing(true);
    }

    return (
        <div className="notes-display">
            { // Icons on mobile or smaller width windows
                isHiddenList && !editing &&
                <div className="notes-display-header">
                    <div className="show-notes-list-arrow" onClick={showNotesList}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                            <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                        </svg>
                        <p>Notes</p>
                    </div>

                    {noteToDisplay && <div className="notes-display-edit-icon" onClick={editNoteOnDisplay}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>  
                    </div>}

                </div>
            }
            { // New Note
                !noteToDisplay && <NoteCreate makeRefresh={makeRefresh} setStatus={setStatus}/>
            }
            { // Edit note
                editing && <NoteEdit note={noteToDisplay} finishEdit={editNote} cancelEdit={cancelEdit} setStatus={setStatus}/>
            }
            { // Display note
                !editing && noteToDisplay && 
                <Fragment>
                    <h3 className="note-display-date">{formatUpdatedAt(updatedAt)}</h3>
                    <h2 className="note-display-title">{title}</h2>
                    <div className="note-display-content">
                        <p>{parse(content.replaceAll('\n', '<br/>'))}</p>
                    </div>
                </Fragment>
            }
        </div>
    )
}
