import React from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';

import Signup from './components/DH_Components/student_Register';
import Login from './components/DH_Components/student_login';
import Group from './components/DH_Components/grp_topic';
import Members from './components/DH_Components/grp_members';


function App() {
  return (
    // <BrowserRouter>

    //   <Routes>
    //          <Route path="/" element={<Signup />} />
            //  <Route path="/login" element={<Login />} />
            //  <Route path="/grpreg" element={<Group />} />
            //  <Route path="/grpmem/:data" element={<Members />} />
    //   </Routes>

    // </BrowserRouter>

<BrowserRouter>
  <Switch>

    <Route path ='/' component={Signup} exact/>
    <Route path="/login" component={Login} />
    <Route path="/grpreg" component={Group} />
    <Route path="/grpmem/:data" component={Members} />

  </Switch>
</BrowserRouter>

  );
}

export default App;