import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Signup from './components/DH_Components/student_Register';
import Login from './components/DH_Components/student_login';
import GroupTopic from './components/DH_Components/grp_topic';
import Members from './components/DH_Components/grp_members';
import grpReg from './components/DH_Components/groupName';
import Supervisors from './components/DH_Components/supervisors';
import DisplaySupervisors from './components/DH_Components/displaySupervisor';
import Home from './components/DH_Components/home';
import Header from './components/DH_Components/header';
import DocumentUpload from './components/DH_Components/documentUpload';
import Submissions from './components/DH_Components/submissions';



export default class App extends Component {
  render() {
    return (
        <Router>
          <Header/>
            <Switch>
              <Route path ='/aa' component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/grpTopic" component={GroupTopic} />
              <Route path="/grpmem/:data" component={Members} />
              <Route path="/supervisors" component={Supervisors} />
              <Route path="/grpReg" component={grpReg} />
              <Route path="/displaySupervisor/:id" component={DisplaySupervisors} />
              <Route path="/home" component={Home} />
              <Route path="/document/:id" component={DocumentUpload} />
              <Route path="/submissions" component={Submissions} />
            </Switch>
        </Router>
    )
  }
}