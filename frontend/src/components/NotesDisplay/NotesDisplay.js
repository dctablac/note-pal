import React, { Fragment } from 'react'
import './NotesDisplay.css';

import parse from 'html-react-parser';
import NoteCreate from '../NoteCreate';
import NoteEdit from '../NoteEdit';

export default function NotesDisplay(props) {
    const { noteToDisplay, editing, makeRefresh, 
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

    return (
        <div className={isHiddenList ? "note-display-shift" : "notes-display"}>
            {
                isHiddenList &&
                <div className="show-notes-list-arrow" onClick={showNotesList}>
                    <p>Show List</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                        <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                    </svg>
                </div>
            }
            {
                !noteToDisplay && <NoteCreate makeRefresh={makeRefresh} setStatus={setStatus}/>
            }
            {
                editing && <NoteEdit note={noteToDisplay} finishEdit={editNote} cancelEdit={cancelEdit}/>
            }
            {
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
