import axios from 'axios'
import React, { Component } from 'react'

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state ={
    fname: "",
    email: "",
    lname: "",
    username: "",
    nic: "",
    role: "",
    staffid: "",
    field: "",
    phone: "",
    description: "",
    profileImage: ""
    }
}

componentDidMount(){
  this.getStaffDetails()
}

async getStaffDetails(){
  try{
      const config = {
          headers: {
              Authorization: localStorage.getItem("Authorization")
           }
      }   
  await axios.get("http://localhost:8070/staff/sprofile", config).then((res)=>{
      // console.log(res.data)
      if(res.data.success){
          this.setState({
              fname: res.data.staff1.fname,
              lname: res.data.staff1.lname,
              email: res.data.staff1.email,
              username: res.data.staff1.username,
              nic: res.data.staff1.nic,
              staffid: res.data.staff1.staffid,
              role: res.data.staff1.role,
              field: res.data.staff1.field,
              phone: res.data.staff1.phone,
              profileImage: res.data.staff1.profileImage,
              description: res.data.staff1.description
          })
          console.log(this.state)
      }
  })
      

  }catch(error){
      console.log(error.message)
  }
  
}


staffLogout(){
  if (window.confirm('Are you sure you wish to logout from this Account?')) {
      localStorage.removeItem('Authorization')
      console.log("log out complete")
      window.location = "/home"
  }
}


  render() {
    return (
      <div>
      
      <div class="container mt-4">
      <div class="main-body">


    <nav aria-label="breadcrumb" class="main-breadcrumb">
      <ol class="breadcrumb">
       
      </ol>
    </nav>
   

    <div class="row gutters-sm">
      <div class="col-md-4 mb-3">
        <div class="cardN2">
          <div class="cardN2-body">
            <div class="d-flex flex-column align-items-center text-center">
            <img src={this.state.profileImage} alt="Profile_Picture" class="rounded-circle" width="150"/>
             
              <div class="mt-3">
                <h4>{this.state.username} </h4>
                <p class="text-secondary mb-1">
                {this.state.email}
                </p>
                
                <button class="btn btn-primary" onClick={this.staffLogout} style={{width: 80+"%"}}>Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="cardN2 mb-3">
          <div class="cardN2-body">
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Full Name</h6>
              </div>
              <div class="col-sm-9 text-secondary">
              {this.state.fname} {this.state.lname}
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">NIC</h6>
              </div>
              <div class="col-sm-9 text-secondary">
              {this.state.nic}
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Email</h6>
              </div>
              <div class="col-sm-9 text-secondary">
               {this.state.email}
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">phone No</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {this.state.phone}
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Role</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {this.state.role}
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Field</h6>
              </div>
              <div class="col-sm-9 text-secondary">
               {this.state.field}
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Staff id</h6>
              </div>
              <div class="col-sm-9 text-secondary">
               {this.state.staffid}
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Description</h6>
              </div>
              <div class="col-sm-9 text-secondary">
               {this.state.description}
              </div>
            </div>
            <hr/>
            <center>
            <div class="row">
              <div class="col-sm-12">
             <button class="btn btn-primary" style={{width: 20+"%"}} onClick={this.onUpdate}>Update Profile</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-danger" onClick={this.onDelete} style={{width: 20+"%"}}>Delete Profile</button>
              </div>
            </div></center>
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
