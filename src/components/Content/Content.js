import React from 'react';
import './Content.css';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home';
import About from '../About';

export default function Content() {
    return (
        <div id="content">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </Switch>
        </div>
    )
}