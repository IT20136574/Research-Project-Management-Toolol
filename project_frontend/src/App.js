import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
// import { ChakraProvider } from '@chakra-ui/react'


import StaffLogin from './components/RS_Components/staff/StaffLogin';
import CoSupervisorHome from './components/RS_Components/staffHomes/CoSupervisorHome';
import PanelMemberHome from './components/RS_Components/staffHomes/PanelMemberHome';
import SupervisorHome from './components/RS_Components/staffHomes/SupervisorHome';
import ChatHome from './components/RS_Components/chatApp/ChatHome';
// import ChatProvider from './Context/ChatProvider';
import ChatPage from './components/RS_Components/chatApp/ChatPage';
import Profile from './components/RS_Components/Profile';
import SupHome from './components/RS_Components/SupHome';
import MarkingSchemes from './components/RS_Components/staffHomes/MarkingSchemes';
import EvaluateMarks from './components/RS_Components/EvaluateMarks';






export default class App extends Component {
  render() {
    return (
       
        <Router>
          {/* <ChatProvider> */}
            <Switch>
            
            {/* <ChakraProvider> */}
            
            <Route path="/home"  component={StaffLogin}/>
            <Route path="/topics"  component={SupervisorHome}/>
            <Route path="/cosupHome"  component={CoSupervisorHome}/>
            <Route path="/panelHome"  component={PanelMemberHome}/>
            <Route path="/profile"  component={Profile}/>
            <Route path="/shome"  component={SupHome}/>
            <Route path="/mark"  component={MarkingSchemes}/>
            <Route path="/eveluate"  component={EvaluateMarks}/>

            <Route path="/chathome"  component={ChatHome}/>
            <Route path="/chats"  component={ChatPage}/>
           
            
            {/* </ChakraProvider> */}
            
            
        {/* <Route path="/topicaccept"  component={DisplaytopicDetails}/> */}

            </Switch>
            {/* </ChatProvider> */}
        </Router>
        
    )
  }
}