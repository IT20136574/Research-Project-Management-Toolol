import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Signup from './components/DH_Components/student_Register';


export default class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route path ='/' component={Signup} />
            </Switch>
        </Router>
    )
  }
}