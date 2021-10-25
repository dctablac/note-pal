import React, { Fragment } from 'react'
import './NotesDisplay.css';

import parse from 'html-react-parser';

export default function NotesDisplay(props) {
    const { noteToDisplay } = props;
    const { htmlContent, lastEditDate, lastEditTime, title } = noteToDisplay? noteToDisplay : {htmlContent: '', lastEditDate: '', lastEditTime: '', title: ''};

    function formatDate(date) {
        // 10/22/2021 --> October 22, 2021
        if (!date) return '';
        const months = {
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
        try {
            const dateSplit = date.split('/'); // [10, 22, 2021]
            return `${months[dateSplit[0]]} ${dateSplit[1]}, ${dateSplit[2]} at `;
        } catch {
            console.error(`Incorrect date format (MM/DD/YYYY): ${date}`);
        }
    }

    return (
        <div id="notes-display">
            {
                !noteToDisplay && <p className="no-notes-msg">You don't have any notes. Make a new one!</p>
            }
            {
                noteToDisplay && 
                <Fragment>
                    <h3 className="note-display-date">{formatDate(lastEditDate)}{lastEditTime}</h3>
                    <h2 className="note-display-title">{title}</h2>
                    <div className="note-display-content">
                        {parse(htmlContent)}
                    </div>
                </Fragment>
            }
        </div>
    )
}
