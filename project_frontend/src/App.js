import React from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';

import Signup from './components/DH_Components/student_Register';
import Login from './components/DH_Components/student_login';
import Group from './components/DH_Components/grp_topic';
import Members from './components/DH_Components/grp_members';
import Supervisors from './components/DH_Components/supervisors';
import DisplaySupervisors from './components/DH_Components/displaySupervisor';



function App() {
  return (
<BrowserRouter>
  <Switch>

    <Route path ='/aa' component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/grpreg" component={Group} />
    <Route path="/grpmem/:data" component={Members} />
    <Route path="/supervisors" component={Supervisors} />
    <Route path="/displaySupervisor/:id" component={DisplaySupervisors} />

  </Switch>
</BrowserRouter>

  );
}

export default App;