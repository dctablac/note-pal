import React, { Fragment, useState } from 'react';
import { AuthProvider } from '../../contexts/AuthContext';
import Content from '../Content';
import NavBar from '../NavBar';

export default function App() {

    const [isNightMode, setIsNightMode] = useState(false);

    function makeNightMode() {
      console.log('Setting night mode');
      if(!isNightMode) {
        setIsNightMode(true);
      } else {
        setIsNightMode(false);
      }
    }

    return (
        <AuthProvider>
        <Fragment>
          <NavBar isNightMode={isNightMode} />
          <Content makeNightMode={makeNightMode} isNightMode={isNightMode} />
        </Fragment>
        </AuthProvider>
    );
}