import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


//If using browser switch to browserrouter.
import {
  BrowserRouter as Router,
  Route,
  Switch
  // Link
} from 'react-router-dom';


//Routes
import Home from './Routes/Home/Home.js';
import LoginForm from './Routes/Auth/Login.js';
import RegisterForm from './Routes/Auth/Register.js';
import SettingsManager from './Routes/Settings/Settings.js';

import firebase from 'firebase';

import * as constants from './contstants';

class App extends Component {

  constructor(props) {
    super(props);

    firebase.initializeApp(constants.CONFIG);

    document.title = constants.TITLE;

  }

  render() {
    return (
     
        <div>
          <Router>
          <Switch>
            
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/settings" component={SettingsManager} />
            
            <Route path="/" component={Home} />
          
          </Switch>
          </Router>
        </div>
   
    );
  }
}

export default App;
