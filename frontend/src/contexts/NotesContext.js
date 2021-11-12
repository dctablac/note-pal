import React, { useContext } from 'react';

const NotesContext = React.createContext();

export function useNotes() {
    return useContext(NotesContext);
}

export function NotesProvider({ children }) {

    function createNote() {

    }

    const value = {
        createNote
    }

    return (
        <NotesContext.Provider value={value}>
            { children }
        </NotesContext.Provider>
    )
}
