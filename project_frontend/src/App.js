import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import UserManagementPage from './components/NT_Components/user-management/UserManagementPage';
import Studentmanagement from './components/NT_Components/user-management/student-management/Studentmanagement';
import DisplayStudentDetails from './components/NT_Components/user-management/student-management/DisplayStudentDetails';
import UpdateStudentDetails from './components/NT_Components/user-management/student-management/UpdateStudentDetails';
import StaffManagement from './components/NT_Components/user-management/staff-management/StaffManagement';
import DisplayStaffMember from './components/NT_Components/user-management/staff-management/DisplayStaffMember';
import UpdateStaffMember from './components/NT_Components/user-management/staff-management/UpdateStaffMember';
import AdminLogin from './components/NT_Components/admin/AdminLogin';
import AdminAccount from './components/NT_Components/admin/AdminAccount';
import RegisterAdmin from './components/NT_Components/admin/RegisterAdmin';
import UpdateAdmin from './components/NT_Components/admin/UpdateAdmin';
import ShowGroup from './components/NT_Components/user-management/asign-panel-member/ShowGroup';
import AddPanelMember from './components/NT_Components/user-management/asign-panel-member/AddPanalMember'
function App() {
  return (
    <BrowserRouter>
      <Switch>
             <Route path="/" component={AdminLogin} exact/>  
             <div>
              <Route path="/adminpage" component={UserManagementPage}/>
              <Route path="/student" component={Studentmanagement}/>
              <Route path="/showstudent/:id" component={DisplayStudentDetails}/>
              <Route path="/updatestudent/:id" component={UpdateStudentDetails}/>
              <Route path="/staff/:role" component={StaffManagement}/>
              <Route path="/showstaff/:id" component={DisplayStaffMember}/>
              <Route path="/updatestaff/:id" component={UpdateStaffMember}/>
              <Route path="/adminaccount" component={AdminAccount}/>
              <Route path="/regadmin" component={RegisterAdmin}/>
              <Route path="/updateadmin" component={UpdateAdmin}/>
              <Route path="/showgroups/:status" component={ShowGroup}/>
              <Route path="/addpanel/:id" component={AddPanelMember}/>
              
              
             </div>
      </Switch>
    </BrowserRouter>


  );
}

export default App;