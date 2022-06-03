import axios from 'axios';
import React, { Component } from 'react'

export default class RegisterAdmin extends Component {
    constructor(props){
        super(props);
            this.state ={  
                fname : "",
                lname :"",
                username :"",
                pno :"",
                sliitid:"",
                nic :"",
                email :"",
                password :"",
                cpassword :"",
                imageUrl : ""
        }
        this.onFileChange = this.onFileChange.bind(this);
    }

    handleInputChange = (e)=>{
        const{name,value} = e.target;
        this.setState({
           ...this.state,
           [name]:value
        })
     }

    registerAdmin = (e) =>{
        e.preventDefault();
        const{fname, lname, username, pno, nic, email, password, imageUrl,cpassword,sliitid} = this.state
        const newadmin ={
            fname : fname,
            lname : lname,
            username : username,
            sliitid : sliitid,
            pno : pno,
            nic : nic,
            email : email,
            password : password,
            dateCreated: new Date().toString(),
            lastUpdated: new Date().toString(),
            cpassword : cpassword,
            imageUrl : imageUrl
        }
        console.log(newadmin)
        if(password === cpassword){
            axios.post("http://localhost:8070/admin/add",newadmin).then((res)=>{
                if(res.data){
                    this.setState({
                        fname : "",
                        lname :"",
                        username :"",
                        sliitid:"",
                        pno :"",
                        nic :"",
                        email :"",
                        password :"",
                        cpassword :"",
                        imageUrl : "" 
                    })
            
                    alert("admin register successful")
                    window.location.href = '/adminaccount';
                }
        }).catch((err)=>{
            console.log('Admin Account Already Exsist Check Email or Username again');
        })
        }else{
            console.log("Password not match")
          }

    }
    onBack(){
        window.location.href="/adminaccount"
    }
    onFileChange(e) {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = (event) => {
            this.setState({
                imageUrl: event.target.result,
            })
    }
    
}

  render() {
    return (
    <div className='alignMarginN'>
        <div class="container">
            <div class="main-body">
                <nav class="navbar navbar-expand-lg navbar-light bg-light mt-4" style={{width:93.5+"%"}}>
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link " aria-current="page" href="/adminaccount">Profile</a>
                        <a class="nav-link disabled" >Admin Register</a>
                    </div>
                    </div>
                    <form class="d-flex input-group w-auto">
                        <button class="btn btn-primary" onClick={this.adminLogout}>Log Out</button>
                    </form>
                </div>
            </nav>
            <div class="col-md-12">
              <div class="card mb-2 mt-3" style={{width:94+"%"}}>
                <div class="card-body">
                <h4 className="fw-bold mb-1">Admin Registration</h4><br/>
                <form onSubmit={this.registerAdmin}>
                <div className="row">
                        <div className="col-md-6 mb-2">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="fname" id="fname" placeholder="First Name" onChange={this.handleInputChange} value={this.setState.fname}  required="true"/>
                            <label for="floatingInput">First Name</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-2">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="lname" id="lname" placeholder="Last Name" onChange={this.handleInputChange} value={this.setState.lname} required/>
                            <label for="floatingInput">Last Name</label>
                        </div>
                    </div>
                </div>

                <div className="row">
                        <div className="col-md-6 mb-2">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="username" id="username" placeholder="User Name" onChange={this.handleInputChange} value={this.setState.username} required/>
                            <label for="floatingInput">User Name</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-2">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="email" id="email" placeholder="Email" onChange={this.handleInputChange} value={this.setState.email} required/>
                            <label for="floatingInput">Email</label>
                        </div>
                    </div>
                </div>

                <div className="row">
                        <div className="col-md-4 mb-2">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="nic" id="nic" placeholder="NIC"  onChange={this.handleInputChange} value={this.setState.nic} required/>
                            <label for="floatingInput">NIC</label>
                        </div>
                        </div>
                        <div className="col-md-4 mb-2">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="sliitid" id="sliitid" placeholder="Staff ID" onChange={this.handleInputChange} value={this.setState.sliitid} required/>
                            <label for="floatingInput">Staff ID</label>
                        </div>
                    </div>

                    <div className="col-md-4 mb-2">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="pno" id="pno" placeholder="Phone No" onChange={this.handleInputChange} value={this.setState.pno} required/>
                            <label for="floatingInput">Phone No</label>
                        </div>
                    </div>
                </div>

                <div className="row">
                        <div className="col-md-6 mb-2">
                        <div class="form-floating mb-2">
                            <input type="password" class="form-control" name="password" id="password" placeholder="Password"  onChange={this.handleInputChange} value={this.setState.password} required/>
                            <label for="floatingInput">Password</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-2">
                            <input type="password" class="form-control" name="cpassword" id="cpassword" placeholder="Confirm Password" onChange={this.handleInputChange} value={this.setState.cpassword} required/>
                            <label for="floatingInput">Confirm Password</label>
                        </div>
                    </div>
                </div>
                <div>
                <center> <label style={{fontSize : 18+"px"}}>Image :</label> <input type="file"  name="imageUrl"  onChange={this.onFileChange} style={{width:20+"%"}}/></center>
                </div>

                
                <center>
                    <div className='mt-4'>
                        <input class='btn btn-light' type="reset" value="Reset" style={{width: 15+"%"}}/> &nbsp;&nbsp;&nbsp;
                        <input class='btn btn-primary' type="submit" value="Register" style={{width: 15+"%"}}/> 
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