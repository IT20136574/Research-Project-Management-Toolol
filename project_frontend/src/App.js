import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//NT Componennts
import UserManagementPage from './components/NT_Components/admin_Layouts/UserManagementPage';
import Studentmanagement from './components/NT_Components/user-management/student-management/Studentmanagement';
import UpdateStudent from './components/NT_Components/user-management/student-management/UpdateStudent';
import StudentView from './components/NT_Components/user-management/student-management/StudentView';
import SupervisorMgtPage from './components/NT_Components/user-management/staff-management/supervisor/SupervisorMgtPage';
import UpdateSupervisor from './components/NT_Components/user-management/staff-management/supervisor/UpdateSupervisor';
import ViewSupervisor from './components/NT_Components/user-management/staff-management/supervisor/ViewSupervisor'

import UpdateCoSupervisor from './components/NT_Components/user-management/staff-management/co-supervisor/UpdateCoSupervisor';
import CoSupervisorMgtPage from './components/NT_Components/user-management/staff-management/co-supervisor/CoSupervisorMgtPage';
import ViewCoSupervisor from './components/NT_Components/user-management/staff-management/co-supervisor/ViewCoSupervisor';

import AdminLogin from './components/NT_Components/admin/AdminLogin';
import AdminAccount from './components/NT_Components/admin/AdminAccount';
import RegisterAdmin from './components/NT_Components/admin/RegisterAdmin';
import UpdateAdmin from './components/NT_Components/admin/UpdateAdmin';

import PanalMemberMgtPage from './components/NT_Components/user-management/staff-management/panal-member/PanalMemberMgtPage';
import UpdatePanelMem from './components/NT_Components/user-management/staff-management/panal-member/UpdatePanelMem';
import ViewPanelMem from './components/NT_Components/user-management/staff-management/panal-member/ViewPanelMem';


import ShowGroup from './components/NT_Components/asign-panel-member/ShowGroup';
import AddPanelMember from './components/NT_Components/asign-panel-member/AddPanalMember'
import DocumentUpload from './components/NT_Components/document-presentation/DocumentUpload';
import DocumentPage from './components/NT_Components/document-presentation/DocumentPage';
import UpdateDocument from './components/NT_Components/document-presentation/UpdateDocument';
import Sidebar from './components/NT_Components/admin_Layouts/nav-bar/Sidebar';
import Dashboard from './components/NT_Components/admin_Layouts/Dashboard';
import SubmitionPage from './components/NT_Components/submition-type/SubmitionPage';
import AddSubmition from './components/NT_Components/submition-type/AddSubmition';
import UpdataSubmition from './components/NT_Components/submition-type/UpdataSubmition';
import MarkingSchemaPage from './components/NT_Components/marking-schemas/MarkingSchemaPage';
import AddMarkingSchema from './components/NT_Components/marking-schemas/AddMarkingSchema';
import UpdateMarking from './components/NT_Components/marking-schemas/UpdateMarking';



//DH Componennts
import Signup from './components/DH_Components/student/student_Register';
import Login from './components/DH_Components/student/student_login';
import GroupTopic from './components/DH_Components/student_group/grp_topic';
import Members from './components/DH_Components/student_group/grp_members';
import grpReg from './components/DH_Components/student_group/groupName';
import Supervisors from './components/DH_Components/supervisors/supervisors';
import DisplaySupervisors from './components/DH_Components/supervisors/displaySupervisor';
import Home from './components/DH_Components/layouts/home';
import Header from './components/DH_Components/layouts/header';
import DocumentUploadD from './components/DH_Components/documents/documentUpload';
import Submissions from './components/DH_Components/documents/submissions';
import DocumentDownload from './components/DH_Components/documents/documentDownload';
import Pannel from './components/DH_Components/supervisors/pannel';

toast.configure();

function App() {

    return (

      <BrowserRouter>
            <Switch>
              <Route path ='/aa' component={Signup} exact/>
              <Route path="/login" component={Login} />
              <Route path="/grpTopic" component={GroupTopic} />
              <Route path="/grpmem/:data" component={Members} />
              <Route path="/supervisors" component={Supervisors} />
              <Route path="/grpReg" component={grpReg} />
              <Route path="/displaySupervisor/:id" component={DisplaySupervisors} />
              <Route path="/home" component={Home} />
              <Route path="/document/:id" component={DocumentUploadD} />
              <Route path="/submissions" component={Submissions} />
              <Route path="/documents" component={DocumentDownload} />
              <Route path="/pannelDetails" component={Pannel} />
            </Switch>

            <Switch>
            <Route path="/loginN" component={AdminLogin} exact/>
                <Route path="/dashboard" component={Dashboard}/>
 
                {/* Student */}
                <Route path="/student" component={Studentmanagement}/>
                <Route path="/upstudent/:id" component={UpdateStudent}/>
                <Route path="/showstudent/:id" component={StudentView}/>
 
                {/* Admin */}
                <Route path="/adminpage" component={UserManagementPage}/>
                <Route path="/adminaccount" component={AdminAccount}/>
                <Route path="/regadmin" component={RegisterAdmin}/>
                <Route path="/updateadmin" component={UpdateAdmin}/>
 
                {/* Ad Panel Members */}
                <Route path="/showgroups/:status" component={ShowGroup}/>
                <Route path="/addpanel/:id" component={AddPanelMember}/>
 
                {/* Document Upload */}
                <Route path="/DocumentUpload" component={DocumentUpload}/>
                <Route path="/documentPage" component={DocumentPage}/>
                <Route path="/updateDoc/:id" component={UpdateDocument}/>
 
                {/* Co-Supervisor */}
                <Route path="/CoSupervisor/:role" component={CoSupervisorMgtPage}/>
                <Route path="/updatecoSup/:id" component={UpdateCoSupervisor}/>
                <Route path="/viewcoSup/:id" component={ViewCoSupervisor}/>
 
                {/* Supervisor */}
                <Route path="/supervisor/:role" component={SupervisorMgtPage}/>
                <Route path="/upsupervisor/:id" component={UpdateSupervisor}/>
                <Route path="/viewsupervisor/:id" component={ViewSupervisor}/>
 
                {/* Panal-Member */}
                <Route path="/panalMember/:role" component={PanalMemberMgtPage}/>
                <Route path="/showpanalMem/:id" component={ViewPanelMem}/>
                <Route path="/updatepanalMem/:id" component={UpdatePanelMem}/>
 
                {/* Submition Type */}
                <Route path="/submition" component={SubmitionPage}/>
                <Route path="/addsubmition" component={AddSubmition}/>
                <Route path="/updatesubmition/:id" component={UpdataSubmition}/>
 
                {/* Marking Schema */}
                <Route path="/marking" component={MarkingSchemaPage}/>
                <Route path="/Addmarking" component={AddMarkingSchema}/>
                <Route path="/updateMarking/:id" component={UpdateMarking}/>

            </Switch>


          </BrowserRouter>
    )
}

export default App;
