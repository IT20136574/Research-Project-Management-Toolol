import axios from 'axios'
import React, { Component } from 'react'
import {toast} from 'react-toastify';
export default class UpdateAdmin extends Component {
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
        lastUpdated:""
        }
        this.onFileChange = this.onFileChange.bind(this);
    }
    componentDidMount(){
        this.getAdminDetails()
    }

    handleInputChange = (e)=>{
        const{name,value} = e.target;
        this.setState({
           ...this.state,
           [name]:value
        })
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
            if(res.data){
                this.setState({
                    fname: res.data.admin1.fname,
                    lname: res.data.admin1.lname,
                    username: res.data.admin1.username,
                    pno: res.data.admin1.pno,
                    nic: res.data.admin1.nic,
                    sliitid: res.data.admin1.sliitid,
                    email: res.data.admin1.email,
                    imageUrl: res.data.admin1.imageUrl,
                    lastUpdated:res.data.admin1.lastUpdated
                })
                console.log(this.state)
            }
        })

        }catch(error){
                console.log(error.message)
        }
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

    onSubmit =(e)=>{
        e.preventDefault();
        const{fname,  lname, username, pno, nic, email, password, imageUrl,cpassword,sliitid} = this.state
        const updateadmin ={
            fname : fname,
            lname : lname,
            username : username,
            sliitid : sliitid,
            pno : pno,
            nic : nic,
            email : email,
            imageUrl : imageUrl,
            lastUpdated: new Date().toString(),
        }
        console.log(updateadmin)
        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization")
             }
        } 

        axios.put("http://localhost:8070/admin/update",updateadmin, config).then((res)=>{
            if(res.data){
                this.setState({
                    fname : "",
                    lname :"",
                    username :"",
                    sliitid:"",
                    pno :"",
                    nic :"",
                    email :"",
                    imageUrl : "" 
                })
                // console.log("update success")
                toast.success('Update Successful.!',{position:toast.POSITION.TOP_Right});
                window.setTimeout(function() {
                    window.location.href="/adminaccount";
                }, 3000)  
                
           }
        }).catch((e)=>{
            console.log(e)
        })

    }

    onBack(){
        window.location.href="/adminaccount"
    }

  render() {
    return (
    <div className='alignMarginN'>
    <div class="container">
        <div class="main-body">
            <nav class="navbar navbar-expand-lg navbar-light bg-light mt-4" style={{width:93.5+"%", boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link " aria-current="page" href="/adminaccount">Profile</a>
                    <a class="nav-link disabled" >Update Admin</a>
                </div>
                </div>
                <form class="d-flex input-group w-auto">
                    <button class="btn btn-primary" onClick={this.adminLogout}>Log Out</button>
                </form>
            </div>
        </nav>
        <div class="col-md-12">
          <div class="card mb-2 mt-3" style={{width:94+"%", boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
            <div class="card-body">
            <h4 className="fw-bold mb-1">Admin Profile Update</h4><br/>
            <form onSubmit={this.onSubmit}>
            <div className="row">
                    <div className="col-md-6 mb-2">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" name="fname" id="fname" placeholder="First Name" onChange={this.handleInputChange} value={this.state.fname}  required="true"/>
                        <label for="floatingInput">First Name</label>
                    </div>
                    </div>
                    <div className="col-md-6 mb-2">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" name="lname" id="lname" placeholder="Last Name" onChange={this.handleInputChange} value={this.state.lname} required/>
                        <label for="floatingInput">Last Name</label>
                    </div>
                </div>
            </div>

            <div className="row">
                    <div className="col-md-6 mb-2">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" name="username" id="username" placeholder="User Name" onChange={this.handleInputChange} value={this.state.username} readOnly/>
                        <label for="floatingInput">User Name</label>
                    </div>
                    </div>
                    <div className="col-md-6 mb-2">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" name="email" id="email" placeholder="Email" onChange={this.handleInputChange} value={this.state.email} required/>
                        <label for="floatingInput">Email</label>
                    </div>
                </div>
            </div>

            <div className="row">
                    <div className="col-md-4 mb-2">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" name="nic" id="nic" placeholder="NIC"  onChange={this.handleInputChange} value={this.state.nic} required/>
                        <label for="floatingInput">NIC</label>
                    </div>
                    </div>
                    <div className="col-md-4 mb-2">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" name="sliitid" id="sliitid" placeholder="Staff ID" onChange={this.handleInputChange} value={this.state.sliitid} required/>
                        <label for="floatingInput">Staff ID</label>
                    </div>
                </div>

                <div className="col-md-4 mb-2">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" name="pno" id="pno" placeholder="Phone No" onChange={this.handleInputChange} value={this.state.pno} required/>
                        <label for="floatingInput">Phone No</label>
                    </div>
                </div>
            </div>

            <div className='mt-3'>
            <center> <label style={{fontSize : 18+"px"}}>Image :</label> <input type="file"  name="imageUrl"  onChange={this.onFileChange} style={{width:20+"%"}}/></center>
            </div>

                <center>
                    <div className='mt-5'>
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
