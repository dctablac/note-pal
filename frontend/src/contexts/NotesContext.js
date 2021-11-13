import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const NotesContext = React.createContext();

export function useNotes() {
    return useContext(NotesContext);
}

export function NotesProvider({ children }) {
    const { currentUser } = useAuth();
    const [activeNote, setActiveNote] = useState(0);
    const [deletePending, setDeletePending] = useState(false);
    const [editPending, setEditPending] = useState(false);
    const [isHiddenList, setIsHiddenList] = useState(false);
    const [notesList, setNotesList] = useState(null);
    const [noteToDisplay, setNoteToDisplay] = useState(null);
    const [status, setStatus] = useState('');

    function createNote(requestBody) {
        return axios.post(`${process.env.REACT_APP_BACKEND_URL}/create`, requestBody);
    }

    function getNotes() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/read/${currentUser.uid}`)
            .then((res) => {
                setNotesList(res.data.notes);
                setActiveNote(0);
                setNoteToDisplay(res.data.notes[0]);
            });
    }

    function deleteNote(note) {
        return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete/${note['_id']}`)
    }

    function editNote(requestBody) {
        return axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update/${noteToDisplay._id}`, requestBody)
    }

    const value = {
        createNote,
        getNotes,
        deleteNote,
        editNote,
        activeNote, setActiveNote,
        deletePending, setDeletePending,
        editPending, setEditPending,
        isHiddenList, setIsHiddenList,
        notesList, setNotesList,
        noteToDisplay, setNoteToDisplay,
        status, setStatus
    }

    return (
        <NotesContext.Provider value={value}>
            { children }
        </NotesContext.Provider>
    )
}
