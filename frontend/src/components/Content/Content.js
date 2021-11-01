import React from 'react';
import './Content.css';
import { Switch, Route } from 'react-router-dom';

import PublicRoute from '../PublicRoute';
import PrivateRoute from '../PrivateRoute';
import Home from '../Home';
import About from '../About';
import Notes from '../Notes';
import Signup from '../Signup';
import Login from '../Login';
import Account from '../Account';
import ForgotPassword from '../ForgotPassword';
import PageNotFound from '../PageNotFound';

export default function Content(props) {
    const { isNightMode, makeNightMode } = props;

    return (
        <div id="content">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <PrivateRoute path="/notes" component={Notes} />
                <PublicRoute path="/signup" restricted={true} component={Signup} />
                <Route path="/account" component={props => <Account isNightMode={isNightMode} makeNightMode={makeNightMode}/>} />
                <PublicRoute path="/forgot-password" restricted={true} component={ForgotPassword}/>
                <PublicRoute path="/login" restricted={true} component={Login} />
                <PrivateRoute path="/" component={PageNotFound} />
            </Switch>
        </div>
    )
}