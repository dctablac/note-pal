import React from 'react';
import './Content.css';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home';
import About from '../About';
import Notes from '../Notes';
import Signup from '../Signup';
import Login from '../Login';

export default function Content() {
    return (
        <div id="content">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/notes" component={Notes} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>
    )
}