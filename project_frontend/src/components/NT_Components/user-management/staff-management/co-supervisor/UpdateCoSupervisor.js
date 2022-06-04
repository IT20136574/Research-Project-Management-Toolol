import axios from 'axios';
import React, { Component } from 'react'
import {toast} from 'react-toastify';
export default class UpdateCoSupervisor extends Component {
    constructor(props){
        super(props);
        this.state = {
            fname:"",
            lname:"",
            staffid:"",
            email:"",
            username:"",
            nic:"",
            field:"",
            phone:"",
            description:"",
            profileImage:"",
            Role:""
         
 
        }
    }
 
    handleInputChange = (e)=>{
        const{name,value} = e.target;
        this.setState({
           ...this.state,
           [name]:value
        })
     }
 
    componentDidMount(){
        const id = this.props.match.params.id;
 
        axios.get(`http://localhost:8070/viewRole/staffview/${id}`).then((res)=>{
            //console.log(res.data)
            if(res.data.success){
                this.setState({
                    fname:res.data.staff.fname,
                    lname:res.data.staff.lname,
                    email:res.data.staff.email,
                    staffid:res.data.staff.staffid,
                    username:res.data.staff.username,
                    nic:res.data.staff.nic,
                    field:res.data.staff.field,
                    phone:res.data.staff.phone,
                    description:res.data.staff.description,
                    profileImage:res.data.staff.profileImage,
                    Role:res.data.staff.role
                })
                //console.log(this.state)
            }
        }).catch((e)=>{
            console.log(e)
        })
    }
 
    onSubmit = (e)=>{
 
        e.preventDefault();
        const id = this.props.match.params.id;
       
        const{fname,lname,email,username,nic,field,phone,description,profileImage,Role,staffid} = this.state;
        const data = {
            fname:fname,
            lname:lname,
            staffid:staffid,
            email:email,
            username:username,
            nic:nic,
            field:field,
            phone:phone,
            description: description,
            profileImage:profileImage,
            Role:Role
           
        }
        //console.log(data)
       
       
        axios.put(`http://localhost:8070/viewRole/updateStaff/${id}`,data).then((res)=>{
            console.log(res.data)
           if(res.data){      
             
            this.setState({
                fname:"",
                lname:"",
                staffid:"",
                email:"",
                username:"",
                nic:"",
                field:"",
                phone:"",
                description:"",
                profileImage:"",
                Role:""
             })
             toast.success('Updated Successful',{position:toast.POSITION.TOP_Right});
             window.setTimeout(function() {
                window.location.href = '/CoSupervisor/co-supervisor';  
             }, 3000) 
             
          }
        }).catch((error)=>{
           console.log(error)
        })
     }

  render() {
    return (
        <div className='alignMarginN'>
                <div class="container">
                    <div class="main-body">
                    <div class="col-md-12">
                    <div class="card mb-2 mt-3" style={{width:94+"%",boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
                        <div class="card-body">
                        <h4 className="fw-bold mb-1">Supervisor Update</h4><br/>
                        <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" name="fname" id="fname" placeholder="First Name" value={this.state.fname} onChange={this.handleInputChange}  required="true"/>
                                    <label for="floatingInput">First Name</label>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" name="lname" id="lname" placeholder="Last Name" value={this.state.lname} onChange={this.handleInputChange} required="true"/>
                                    <label for="floatingInput">Last Name</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                                <div className="col-md-6 mb-3">
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}  readOnly/>
                                    <label for="floatingInput">Email</label>
                                </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" name="phone" id="phone" placeholder="Phone Number" value={this.state.phone} onChange={this.handleInputChange} required/>
                                    <label for="floatingInput">Phone Number</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                                <div className="col-md-6 mb-3">
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" name="username" id="username" placeholder="User Name" value={this.state.username} onChange={this.handleInputChange} readOnly/>
                                    <label for="floatingInput">User Name</label>
                                </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" name="staffid" id="staffid" placeholder="SLIIT ID" value={this.state.staffid} onChange={this.handleInputChange} required/>
                                    <label for="floatingInput">SLIIT ID</label>
                                </div>
                            </div>
                        </div>

                        
                        <div className="row">
                        <div className="col-md-6 mb-3">
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" name="nic" id="nic" placeholder="NIC" value={this.state.nic} onChange={this.handleInputChange} required/>
                                    <label for="floatingInput">NIC</label>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" name="field" id="field" placeholder="Field" value={this.state.field} onChange={this.handleInputChange} required/>
                                    <label for="floatingInput">Field</label>
                                </div>
                            </div>
                        </div>

                        <div class="form-floating mb-3">
                                <textarea id="floatingInput" name="description" style={{height: "100px"}} type="text"  class="form-control" placeholder="Description" value={this.state.description} onChange={this.handleInputChange} required/>
                                <label for="floatingInput">Description</label>
                        </div>

                        
                        <center>
                            <div className='mt-3'>
                            <a href='/CoSupervisor/co-supervisor'><input class='btn btn-info' type="button" value="Cancel" style={{width: 15+"%"}}/></a> &nbsp;&nbsp;&nbsp;
                                <input class='btn btn-warning' type="reset" value="Reset" style={{width: 15+"%"}}/> &nbsp;&nbsp;&nbsp;
                                <input class='btn btn-primary' type="submit" value="Update" style={{width: 15+"%"}}/> 
                            </div>
                        </center>
                        
                        </form>
                        
            
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}
