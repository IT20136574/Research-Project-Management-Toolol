import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Signup from './components/DH_Components/student/student_Register';
import Login from './components/DH_Components/student/student_login';
import GroupTopic from './components/DH_Components/student_group/grp_topic';
import Members from './components/DH_Components/student_group/grp_members';
import grpReg from './components/DH_Components/student_group/groupName';
import Supervisors from './components/DH_Components/supervisors/supervisors';
import DisplaySupervisors from './components/DH_Components/supervisors/displaySupervisor';
import Home from './components/DH_Components/layouts/home';
import Header from './components/DH_Components/layouts/header';
import DocumentUpload from './components/DH_Components/documents/documentUpload';
import Submissions from './components/DH_Components/documents/submissions';
import DocumentDownload from './components/DH_Components/documents/documentDownload';
import Pannel from './components/DH_Components/supervisors/pannel';


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
              <Route path="/documents" component={DocumentDownload} />
              <Route path="/pannelDetails" component={Pannel} />
            </Switch>
        </Router>
    )
  }
}