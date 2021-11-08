import React from 'react';
import './About.css';

export default function About() {
    return (
        <div id="about-page">
            <div className="about-panel">
                <img className="about-img" src="images/note-pal-3.gif" alt="" />
                <div className="about-panel-info">
                    <h2 className="about-panel-title">Create</h2>
                    <p className="about-panel-text">
                        NotePal is a handy application where users can create and save text notes!
                    </p>
                </div>
            </div>
            <div className="about-panel">
                <div className="about-panel-info">
                    <h2 className="about-panel-title">View Anywhere</h2>
                    <p className="about-panel-text">
                        Unlike your standard notepad, NotePal can be accessed online, anywhere, anytime.
                        Try it on your desktop or mobile device!
                    </p>
                </div>
                <img className="about-img" src="images/note-pal-7.gif" alt="" />
            </div>
            <div className="about-panel">
                <img className="about-img" src="images/note-pal-8.gif" alt="" />
                <div className="about-panel-info">
                    <h2 className="about-panel-title">Night Mode</h2>
                    <p className="about-panel-text">
                        For any late night ideas, you can toggle the night mode theme via the moon
                        icon. Happy noting!
                    </p>
                </div>
            </div>
            <footer>
                <p>Made By: Dan Tablac</p>
            </footer>
        </div>
    )
}
