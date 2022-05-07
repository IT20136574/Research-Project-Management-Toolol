import React from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import CoSupervisorHome from './components/RS_Components/staffHomes/CoSupervisorHome';
import PanelMemberHome from './components/RS_Components/staffHomes/PanelMemberHome';
import supervisorHome from './components/RS_Components/staffHomes/supervisorHome';
import StaffLogin from './components/RS_Components/StaffLogin';


import DisplaytopicDetails from './components/RS_Components/topicaccept';




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

  
    <Route path="/" exact component={StaffLogin}/>
    <Route path="/supHome" exact component={supervisorHome}/>
    <Route path="/cosupHome" exact component={CoSupervisorHome}/>
    <Route path="/panelHome" exact component={PanelMemberHome}/>

    <Route path="/topicaccept" exact component={DisplaytopicDetails}/>

  </Switch>
</BrowserRouter>

  );
}

export default App;
