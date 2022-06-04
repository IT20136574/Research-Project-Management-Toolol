import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'


import StaffLogin from './components/RS_Components/staff/StaffLogin';
import SupervisorHome from './components/RS_Components/staffHomes/SupervisorHome';
import ChatHome from './components/RS_Components/chatApp/ChatHome';
import ChatProvider from './Context/ChatProvider';
import ChatPage from './components/RS_Components/chatApp/ChatPage';
import Profile from './components/RS_Components/staff/Profile';
import SupHome from './components/RS_Components/SupHome';
import MarkingSchemes from './components/RS_Components/staffHomes/MarkingSchemes';
import EvaluateSubmissions from './components/RS_Components/EvaluateSubmissions';
import PanelHome from './components/RS_Components/staffHomes/PanelHome';
import MarkingSchemeForPanel from './components/RS_Components/staffHomes/MarkingSchemeForPanel';
import StaffRegister from './components/RS_Components/staff/StaffRegister';
import PanelMemberTopics from './components/RS_Components/PanelMemberTopics';
import ShowSpecificGroupToPanael from './components/RS_Components/ShowSpecificGroupToPanael';
import StaffUpdate from './components/RS_Components/staff/StaffUpdate';






export default class App extends Component {
  render() {
    return (
       
        <Router>
          {/* <ChatProvider> */}
            <Switch>
            
            

            <Route path="/reg"  component={StaffRegister}/>
            <Route path="/home"  component={StaffLogin}/>
            <Route path="/topics"  component={SupervisorHome}/>
            
            <Route path="/profile"  component={Profile}/>
            <Route path="/shome"  component={SupHome}/>
            <Route path="/mark"  component={MarkingSchemes}/>
            <Route path="/eveluate"  component={EvaluateSubmissions}/>
            <Route path="/phome"  component={PanelHome}/>
            <Route path="/pmark"  component={MarkingSchemeForPanel}/>
            <Route path="/pMtopics"  component={PanelMemberTopics}/>
            <Route path="/group/:id"  component={ShowSpecificGroupToPanael}/>
            <Route path="/update"  component={StaffUpdate}/>


  <ChatProvider>

    <ChakraProvider>

            <Route path="/chathome"  component={ChatHome}/>
            <Route path="/chats"  component={ChatPage}/>
           
            </ChakraProvider>
            
   </ChatProvider>         
      

            </Switch>
            
        </Router>
        
    )
  }
}