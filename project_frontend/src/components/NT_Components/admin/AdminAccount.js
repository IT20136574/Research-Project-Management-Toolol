import axios from 'axios'
import React, { Component } from 'react'
import {Modal} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import {FiAlertCircle} from 'react-icons/fi'
import { FiAlertTriangle } from 'react-icons/fi';
export default class AdminAccount extends Component {
    constructor(props){
        super(props)
        this.state ={
        fname: "",
        lname: "",
        username: "",
        pno: "",
        nic: "",
        sliitid: "",
        email: "",
        imageUrl: "",
        show: false,
        show1: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModal1 = this.showModal1.bind(this);
        this.hideModal1 = this.hideModal1.bind(this);
    }
    showModal = () => {
      this.setState({ show: true });
    };
  
    hideModal = () => {
      this.setState({ show: false });
    };

    showModal1 = () => {
      this.setState({ show1: true });
    };
  
    hideModal1 = () => {
      this.setState({ show1: false });
    };

    componentDidMount(){
        this.getAdminDetails()
    }

    async getAdminDetails(){
        try{
            const config = {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                 }
            }   
        await axios.get("http://localhost:8070/admin//profile", config).then((res)=>{
            //console.log(res.data)
            if(res.data.success){
                this.setState({
                    fname: res.data.admin1.fname,
                    lname: res.data.admin1.lname,
                    username: res.data.admin1.username,
                    pno: res.data.admin1.pno,
                    nic: res.data.admin1.nic,
                    sliitid: res.data.admin1.sliitid,
                    email: res.data.admin1.email,
                    imageUrl: res.data.admin1.imageUrl
                })
                //console.log(this.state)
            }
        })
            

        }catch(error){
            console.log(error.message)
        }
        
    }

    async deleteAdmin(){
        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization")
             }
        }
            await axios.delete('http://localhost:8070/admin/delete', config)
            .then((res) => {
              localStorage.removeItem('Authorization')
              window.location="/"
            })
            .catch((err) => {
              console.log(err.message)
            })
        
    }

    adminLogout(){
            localStorage.removeItem('Authorization')
            window.location = "/login"
    }

    adminRegister(){
        window.location.href="/regadmin"
    }

    updateAdmin(){
        window.location.href="/updateadmin/"
    }
  render() {
    return (
      <div className='alignMarginN'>
           {/* <p>imageUrl : <img src={this.state.imageUrl} alt="Profile_Picture"/></p>
          <p>Fname : {this.state.fname}</p>
          <p>Lname : {this.state.lname}</p>
          <p>Username : {this.state.username}</p>
          <p>NIC : {this.state.nic}</p>
          <p>phone No : {this.state.pno}</p>
          <p>SliitID : {this.state.sliitid}</p>
          <p>email : {this.state.email}</p><br/>
          <button onClick={this.adminRegister}>Admin Register</button> &nbsp;
          <button onClick={this.updateAdmin}>Edit</button> &nbsp;
          <button onClick={this.deleteAdmin}>Delete</button> &nbsp;
          <button onClick={this.adminLogout}>Admin Logout</button>  */}
          <div class="container">
            <div class="main-body">
            <nav class="navbar navbar-expand-lg navbar-light bg-light mt-4" style={{width:93.5+"%",boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link disabled" aria-current="page">Profile</a>
                    <a class="nav-link" href="/regadmin">Admin Register</a>
                </div>
                </div>
                <form class="d-flex input-group w-auto">
                    <Button class="btn btn-primary" onClick={this.showModal}>Log Out</Button>
                </form>
            </div>
            </nav>
            <Modal show={this.state.show} onHide={this.hideModal} >
              {/* <Modal.Header closeButton>
                <Modal.Title>Confirm Logout</Modal.Title>
              </Modal.Header> */}
              <Modal.Body>
                  <center>
                      <FiAlertCircle color="red" fontSize="3em"/><br/>
                      <b>Are you sure?</b><br/>
                      Your will be returned to the login screen.
                  </center>
              </Modal.Body>
              <Modal.Footer >
                  <div className="mx-auto">
                  <Button variant="danger" onClick={this.adminLogout} style={{width: 170+"px"}}>
                          Logout
                      </Button> &nbsp; &nbsp;
                      <Button variant="primary" onClick={this.hideModal} style={{width: 170+"px"}}>
                          Cancel
                      </Button>

                  </div>
              </Modal.Footer>
            </Modal> 

            <Modal show={this.state.show1} onHide={this.hideModal1} >
             <Modal.Body>
               <center>
               <FiAlertTriangle color="red" fontSize="3em" /><br/>
                <b>Are you sure?</b><br/>
                 Do you really want to delete this file.<br/>
                 This file cannot be restore

                 </center>
                </Modal.Body>
                <Modal.Footer >
                 <div className="mx-auto">
                 <Button variant="danger" onClick={this.deleteAdmin}  style={{width: 170+"px"}}>
                  Delete
                 </Button> &nbsp; &nbsp;
                  <Button variant="success" onClick={this.hideModal1} style={{width: 170+"px"}}>
                  Cancel
                  </Button>
                  </div>
                  </Modal.Footer>
                  </Modal>

          <div class="row gutters-sm">
            <div class="col-md-4 mb-3 mt-3">
              <div class="card mt-3" style={{width:90+"%", boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center mt-3">
                    <img src={this.state.imageUrl} alt="Profile_Picture" class="rounded-circle" width="150"/>
                    <div class="mt-3">
                      <h4>{this.state.fname} {this.state.lname}</h4>
                      <p class="text-secondary mb-1">{this.state.username}</p>
                      <p class="text-muted font-size-sm">{this.state.email}</p>
                      <br/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 mt-3">
              <div class="card mb-2 mt-3" style={{width:90+"%", boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
                <div class="card-body">
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
                      <h6 class="mb-0">User Name</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    {this.state.username}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">SLIIT ID</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    {this.state.sliitid}
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
                      <h6 class="mb-0">Phone Number</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    {this.state.pno}
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
                </div>
              </div>
            </div>
          </div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light mt-3" style={{width:93.5+"%", boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)",height:80+"px"}}>
            
          <div class="container-fluid">
              <div>
                <div style={{ marginLeft: 19+"rem"}}>
                    <button type="button" class="btn btn-primary" onClick={this.updateAdmin} style={{width:190+"px"}}>Edit Profile</button> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                    <Button type="button" variant="danger" onClick={this.showModal1} style={{width:190+"px"}}>Delete Account</Button> &nbsp;
                </div>
              </div>
            </div>
            </nav>
        </div>
    </div>
          

      </div>
    )
  }
}
