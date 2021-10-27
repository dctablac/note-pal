import React, { Fragment } from 'react'
import './NotesDisplay.css';

import parse from 'html-react-parser';
import NoteCreate from '../NoteCreate';

export default function NotesDisplay(props) {
    const { noteToDisplay, makeRefresh } = props;
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

    return (
        <div id="notes-display">
            {
                !noteToDisplay && <NoteCreate makeRefresh={makeRefresh}/>
            }
            {
                noteToDisplay && 
                <Fragment>
                    <h3 className="note-display-date">{formatUpdatedAt(updatedAt)}</h3>
                    <h2 className="note-display-title">{title}</h2>
                    <div className="note-display-content">
                        {parse(content)}
                    </div>
                </Fragment>
            }
        </div>
    )
}
