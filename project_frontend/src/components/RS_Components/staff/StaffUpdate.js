import axios from 'axios'
import React, { Component } from 'react'
import image from "../../../asserts/RS_Assests/SLIIT.png"
import FileBase64 from 'react-filebase64';

export default class StaffUpdate extends Component {
    constructor(props){
        super(props)
        this.state ={
            fname: "",
            lname: "",
            email: "",
            username: "",
            nic : "",
            phone : "",
            staffid : "",
            description : "",
            profileImage : ""
        }
        this.onFileChange = this.onFileChange.bind(this);
    }
    componentDidMount(){
        this.getStaffDetailes()
    }

    onFileChange(e) {
            let files = e.target.files;
            let fileReader = new FileReader();
            fileReader.readAsDataURL(files[0]);
            fileReader.onload = (event) => {
                this.setState({
                    profileImage: event.target.result,
                })
        }
        
    }

    handleInputChange = (e)=>{
        const{name,value} = e.target;
        this.setState({
           ...this.state,
           [name]:value
        })
    }
    
    async getStaffDetailes(){
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
                    nic : res.data.staff1.nic,
                    username : res.data.staff1.username,
                    phone : res.data.staff1.phone,
                    staffid : res.data.staff1.staffid,
                    description : res.data.staff1.description,
                    profileImage:res.data.staff1.profileImage
                })
            }
        })

        }catch(error){
            console.log(error.message)
        }   
    }

    onSubmit = (e) => {
        e.preventDefault();
        const{
            fname,
            lname,
            email,
            username,
            nic,
            phone,
            staffid,
            description,
            profileImage
        } = this.state

       const staffUpdate = {
            fname : fname,
            lname : lname,
            email : email,
            username: username,
            nic : nic,
            phone : phone,
            staffid : staffid,
            description : description,
            profileImage : profileImage
        }

        console.log(staffUpdate)
        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization")
             }
        } 

        axios.put("http://localhost:8070/staff/supdate",staffUpdate, config).then((res)=>{

            if(res.data){
                this.setState({
                    fname : "",
                    lname : "",
                    email : "",
                    username:"",
                    nic : "",
                    phone : "",
                    staffid : "",
                    description : "",
                    profileImage : ""
                })
                alert("update success")
                window.location.href="/profile"
           }
        }).catch((e)=>{
            console.log(e)
        })
    }

    onBack(){
        window.location.href="/profile"
    }



  render() {
    return (
    <div>
        <div>
            <section className="text-center">
            <div className="p-5 bg-image" style={{backgroundImage: `url(${image})`,height: "300px",backgroundSize: 'cover'}}></div>

            <div className="card mx-4 mx-md-5 shadow-5-strong" style={{marginTop: "-130px", background: "hsla(0, 0%, 100%, 0.8)",backdropFilter:` blur(20px)`,marginBottom:"3rem"}}>
                <div className="card-body py-5 px-md-5">

                <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                    <h2 className="fw-bold mb-5">Update Profile</h2>
                    <form  name="form">
                    <div className="row">
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="fname" id="floatingInput" placeholder="First Name" onChange={this.handleInputChange} value={this.state.fname}  required/>
                            <label for="floatingInput">First Name</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="lname" id="floatingInput" placeholder="Last Name" onChange={this.handleInputChange} value={this.state.lname}  required/>
                            <label for="floatingInput">Last Name</label>
                        </div>
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="nic" id="floatingInput" placeholder="NIC" onChange={this.handleInputChange} value={this.state.nic}  required/>
                            <label for="floatingInput">NIC</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="staffid" id="floatingInput" placeholder="staffid" onChange={this.handleInputChange} value={this.state.staffid}  required/>
                            <label for="floatingInput">staffid</label>
                        </div>
                        </div>
                        </div>

                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" name="email" id="floatingInput" placeholder="name@example.com" onChange={this.handleInputChange} value={this.state.email} required/>
                            <label for="floatingInput">Email</label>
                        </div>

                        <div className="row">
                        
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="phone" class="form-control" name="phone" id="floatingInput" placeholder="Phone Number" onChange={this.handleInputChange} value={this.state.phone} required/>
                            <label for="floatingInput">Phone Number</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="description" class="form-control" name="description" id="floatingInput" placeholder="Phone Number" onChange={this.handleInputChange} value={this.state.description} required/>
                            <label for="floatingInput"> description</label>
                        </div>
                        </div>
                        </div>

        

                        <center>
                        <div class="custom-file">
                        <h5><label class="custom-file-label" for="customFileLangHTML">Image : </label></h5><br/>
                        <div class="form-floating mb-3">
                        <input type="file" class="form-control form-control-sm" name="profileImage"  onChange={this.onFileChange} style={{width:30+"%"}} />
                        </div>
                        </div></center>

                        <br/>

                        <div className='mt-4'>
                                <input class='btn btn-secondary' type="button" value="Back" style={{width: 20+"%"}} onClick={this.onBack}/> &nbsp;&nbsp;&nbsp;
                              <input class='btn btn-primary' type="button" value="Update"  style={{width: 20+"%"}} onClick={this.onSubmit}/> 
                           </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </section>

    </div>
    </div>
    )
  }
}
