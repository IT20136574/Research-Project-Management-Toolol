import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import UserManagementPage from './components/NT_Components/admin_Layouts/UserManagementPage';
import Studentmanagement from './components/NT_Components/user-management/student-management/Studentmanagement';
import DisplayStudentDetails from './components/NT_Components/user-management/student-management/DisplayStudentDetails';
import AdminLogin from './components/NT_Components/admin/AdminLogin';
import AdminAccount from './components/NT_Components/admin/AdminAccount';
import RegisterAdmin from './components/NT_Components/admin/RegisterAdmin';
import UpdateAdmin from './components/NT_Components/admin/UpdateAdmin';
import ShowGroup from './components/NT_Components/asign-panel-member/ShowGroup';
import AddPanelMember from './components/NT_Components/asign-panel-member/AddPanalMember'
import DocumentUpload from './components/NT_Components/document-presentation/DocumentUpload';
import DocumentPage from './components/NT_Components/document-presentation/DocumentPage';
import UpdateDocument from './components/NT_Components/document-presentation/UpdateDocument';
import Sidebar from './components/NT_Components/admin_Layouts/nav-bar/Sidebar';
import Dashboard from './components/NT_Components/admin_Layouts/Dashboard';
import CoSupervisorMgtPage from './components/NT_Components/user-management/staff-management/co-supervisor/CoSupervisorMgtPage';
import UpdateCoSupervisor from './components/NT_Components/user-management/staff-management/co-supervisor/UpdateCoSupervisor';
import DisplayCoSupervisor from './components/NT_Components/user-management/staff-management/co-supervisor/DisplayCoSupervisor';
import UpdateStudentDetails from './components/NT_Components/user-management/student-management/DisplayStudentDetails'
import PanalMemberMgtPage from './components/NT_Components/user-management/staff-management/panal-member/PanalMemberMgtPage';
import UpdatePanelMember from './components/NT_Components/user-management/staff-management/panal-member/UpdatePanelMember';
import DisplayPanalMember from './components/NT_Components/user-management/staff-management/panal-member/DisplayPanalMember';
import DisplaySupervisor from './components/NT_Components/user-management/staff-management/supervisor/DisplaySupervisor';
import SupervisorMgtPage from './components/NT_Components/user-management/staff-management/supervisor/SupervisorMgtPage';
import UpdateSupervisor from './components/NT_Components/user-management/staff-management/supervisor/UpdateSupervisor';
import SubmitionPage from './components/NT_Components/submition-type/SubmitionPage';
import AddSubmition from './components/NT_Components/submition-type/AddSubmition';
import UpdataSubmition from './components/NT_Components/submition-type/UpdataSubmition';
import MarkingSchemaPage from './components/NT_Components/marking-schemas/MarkingSchemaPage';
import AddMarkingSchema from './components/NT_Components/marking-schemas/AddMarkingSchema';
import UpdateMarking from './components/NT_Components/marking-schemas/UpdateMarking';

function App() {
  return (
    <BrowserRouter>
      
      {/* <Switch>
          
      </Switch> */}
        <Sidebar/>
        <Switch>
                <Route path="/" component={AdminLogin} exact/>
                <Route path="/dashboard" component={Dashboard}/>

                {/* Student */}
                <Route path="/student" component={Studentmanagement}/>
                <Route path="/showstudent/:id" component={DisplayStudentDetails}/>
                <Route path="/updatestudent/:id" component={UpdateStudentDetails}/>

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
                <Route path="/showcoSup/:id" component={DisplayCoSupervisor}/>
                <Route path="/updatecoSup/:id" component={UpdateCoSupervisor}/>

                {/* Supervisor */}
                <Route path="/supervisor/:role" component={SupervisorMgtPage}/>
                <Route path="/showSup/:id" component={DisplaySupervisor}/>
                <Route path="/updateSup/:id" component={UpdateSupervisor}/>

                {/* Panal-Member */}
                <Route path="/panalMember/:role" component={PanalMemberMgtPage}/>
                <Route path="/showpanalMem/:id" component={DisplayPanalMember}/>
                <Route path="/updatepanalMem/:id" component={UpdatePanelMember}/>

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


  );
}

export default App;