import React, { useState } from 'react';
import { AuthProvider } from '../../contexts/AuthContext';
import { NotesProvider } from '../../contexts/NotesContext';
import Content from '../Content';
import NavBar from '../NavBar';

export default function App() {
    const localStorage = require('local-storage');
    const [isNightMode, setIsNightMode] = useState(localStorage.get('night-mode'));

    function makeNightMode(e) {
      e.preventDefault();
      localStorage.set('night-mode', !localStorage.get('night-mode'));
      setIsNightMode(!isNightMode);
    }

    return (
        <AuthProvider>
          <NavBar isNightMode={isNightMode} makeNightMode={makeNightMode}/>
          <NotesProvider>
            <Content isNightMode={isNightMode} />
          </NotesProvider>
        </AuthProvider>
    );
}