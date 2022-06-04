import React, { Component } from 'react'
import { PieChart } from "react-minimal-pie-chart";
import axios from 'axios'
import Logo from "../../../asserts/SLIIT admin.png"
export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state ={
      students:[],
      supervisors:[],
      coSupervisors : [],
      panelMembers : [],
      grouCount:[],
      subCount :[]

    }
  }
  componentDidMount(){
    this.getstudentCount();
    this.getSupCount();
    this.getCoSupCount();
    this.getPmemCount();
    this.getGroupCount()
    this.SubCount();
  }
  getstudentCount(){
    axios.get("http://localhost:8070/viewRole/view").then((res)=>{
      //console.log(res.data)
      if(res.data.success){
        this.setState({
          students : res.data.showStudents
        })
      }
    }).catch((e)=>{
      console.log(e)
    })
  }

  getSupCount(){
    axios.get("http://localhost:8070/viewRole/view/supervisor").then((res)=>{
      //console.log(res.data)
      if(res.data.success){
        this.setState({
          supervisors : res.data.selectedStaff
        })
      }
    }).catch((e)=>{
      console.log(e)
    })
  }

  getCoSupCount(){
    axios.get("http://localhost:8070/viewRole/view/co-supervisor").then((res)=>{
      //console.log(res.data)
      if(res.data.success){
        this.setState({
          coSupervisors : res.data.selectedStaff
        })
      }
    }).catch((e)=>{
      console.log(e)
    })
  }

  getPmemCount(){
    axios.get("http://localhost:8070/viewRole/view/panal_member").then((res)=>{
      //console.log(res.data)
      if(res.data.success){
        this.setState({
          panelMembers : res.data.selectedStaff
        })
      }
    }).catch((e)=>{
      console.log(e)
    })

  }
  getGroupCount(){
    axios.get("http://localhost:8070/panalmember/fletchgroups/Accepted").then((res)=>{
      //console.log(res.data)
      if(res.data.success){
        this.setState({
          grouCount : res.data.selectedgroups
        })
      }
    }).catch((e)=>{
      console.log(e)
    })
  }
  SubCount(){
    axios.get("http://localhost:8070/submition/getSubmition").then((res)=>{
      //console.log(res.data)
      if(res.data.success){
        this.setState({
          subCount : res.data.submitions
        })
      }
    }).catch((e)=>{
      console.log(e)
    })
  }

  render() {
    return (
      <div className='alignMarginN2'>
              <div class="container">
                  <div class="main-body">
                  <div class="col-md-12">
                    <div className='row'>
                      <div className='col'>
                        <div class="card mb-2 mt-4" style={{width:650+"px",boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
                        <div class="card-body">
                        <center><h4 className="fw-bold mb-1">Reserch Management System Users</h4><br/>
                        <PieChart
                        style={{width:200+"px", height:200+"px"}}
                              data={[
                                { title: 'Students', value: this.state.students.length, color: '#52D726' },
                                { title: 'Supervisors', value: this.state.supervisors.length, color: '#FFEC00' },
                                { title: 'Co-Supervisors', value: this.state.coSupervisors.length, color: '#007ED6' },
                                { title: 'Panel-Members', value: this.state.panelMembers.length, color: '#FF0000' },
                              ]}
                            /></center> <br/>

                            <b><p className='d-flex justify-content-center'><i class="fa fa-circle" style={{color : "#52D726"}}></i> &nbsp; - Students &nbsp;&nbsp; <i class="fa fa-circle" style={{color : "#FFEC00"}}></i>&nbsp; - Supervisors &nbsp;&nbsp;<i class="fa fa-circle" style={{color : "#007ED6"}}></i> &nbsp; - Co-Supevisor &nbsp;&nbsp; <i class="fa fa-circle" style={{color : "#FF0000"}}></i> &nbsp; - Panel Members</p></b>


                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div class="card mb-2 mt-4" style={{width:480+"px",boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)" ,height:"173px"}}>
                        <div class="card-body">
                        <div class="d-flex justify-content-between p-md-1">
                        <div class="d-flex flex-row mt-4">
                          <div class="align-self-center">
                            <i
                              class="far fa-clock text-warning fa-3x me-4"
                              ></i>
                          </div>
                          <div>
                            <h4>Pannel Pending</h4>
                            <h4>Group Count</h4>
                          </div>
                        </div>
                        <div class="align-self-center">
                          <h3 class="h1 mb-0">{this.state.grouCount.length}</h3>
                        </div>
                      </div>
                          </div>
                        </div>
                        <div class="card mb-2 mt-4" style={{width:480+"px",boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)" ,height:"173px"}}>
                        <div class="card-body">
                        <div class="d-flex justify-content-between p-md-1">
                        <div class="d-flex flex-row mt-4">
                          <div class="align-self-center">
                            <i
                              class="fa fa-check-circle text-warning fa-3x me-4"
                              ></i>
                          </div>
                          <div>
                            <h4>Active Submission</h4>
                            <h4>Type Count</h4>
                          </div>
                        </div>
                        <div class="align-self-center">
                          <h3 class="h1 mb-0">{this.state.subCount.length}</h3>
                        </div>
                      </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div class="card mb-2 mt-3" style={{ width:97+"%",boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
                        <div class="card-body">
                          <div className='d-flex justify-content-center'>
                            <img src={Logo} height="130px"/>
                          </div>
                          </div>
                        </div>

                    </div>
                  </div>
              </div>
          </div>
    )
  }
}
