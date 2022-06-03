import axios from 'axios';
import React, { Component } from 'react'

export default class UpdateStudent extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            nic:"",
            student_id:"",
            faculty:"",
            batch:"",
            specialization:"",
            phone:"",
            DOB:"",
            email:"",
            status:"",
            imageUrl:""
 
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
 
        axios.get(`http://localhost:8070/viewRole/stview/${id}`).then((res)=>{
            //console.log(res.data)
            if(res.data.success){
                this.setState({
                    name:res.data.student.name,
                    nic:res.data.student.nic,
                    student_id:res.data.student.student_id,
                    faculty:res.data.student.faculty,
                    batch:res.data.student.batch,
                    specialization:res.data.student.specialization,
                    phone:res.data.student.phone,
                    DOB:res.data.student.DOB,
                    email:res.data.student.email,
                    status:res.data.student.status,
                    imageUrl:res.data.student.imageUrl
                })
            }
        }).catch((e)=>{
            console.log(e)
        })
    }
 
    onSubmit = (e)=>{
 
        e.preventDefault();
        const id = this.props.match.params.id;
       
        const{name, nic, student_id, faculty, batch, specialization, phone, DOB, email, status, imageUrl} = this.state;
        const data = {
            name:name,
            nic:nic,
            student_id:student_id,
            faculty:faculty,
            batch:batch,
            specialization:specialization,
            phone:phone,
            DOB:DOB,
            email:email,
            status:status,
            imageUrl:imageUrl
           
        }
       
        //console.log(data)
        axios.put(`http://localhost:8070/viewRole/updateStudent/${id}`,data).then((res)=>{
           
           if(res.data){      
             
            this.setState({
                name:"",
                nic:"",
                student_id:"",
                faculty:"",
                batch:"",
                specialization:"",
                phone:"",
                DOB:"",
                email:"",
                status:"",
                imageUrl:""
             })
             window.location.href = '/student';  
             console.log("update Successful")
          }
        }).catch((error)=>{
           console.log(error)
        })
     }
 
     onBack(){
         window.location.href="/student"
     }
  render() {
    return (
        <div className='alignMarginN'>
        <div class="container">
            <div class="main-body">
            <div class="col-md-12">
              <div class="card mb-2 mt-3" style={{width:94+"%",boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
                <div class="card-body">
                <h4 className="fw-bold mb-1">Student Update</h4><br/>
                <form onSubmit={this.onSubmit}>
                <div className="row">
                        <div className="col-md-12 mb-3">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleInputChange}  required="true"/>
                            <label for="floatingInput">Name</label>
                        </div>
                        </div>
                </div>
                <div className="row">
                        <div className="col-md-6 mb-3">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="nic" id="nic" placeholder="NIC" value={this.state.nic} onChange={this.handleInputChange} readOnly/>
                            <label for="floatingInput">NIC</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-3">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="sliitid" id="sliitid" placeholder="Student ID" value={this.state.student_id} onChange={this.handleInputChange} required/>
                            <label for="floatingInput">Student ID</label>
                        </div>
                    </div>
                </div>

                <div className="row">
                        <div className="col-md-6 mb-3">
                    
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="phone" id="phone" placeholder="Phone No" value={this.state.phone} onChange={this.handleInputChange} required/>
                            <label for="floatingInput">Phone No</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-3">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="DOB" id="DOB" placeholder="Date Of birth" value={this.state.DOB} onChange={this.handleInputChange} readOnly/>
                            <label for="floatingInput">Date Of birth</label>
                        </div>
                    </div>
                </div>
        

                <div className="row">
                        <div className="col-md-12 mb-3">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} readOnly/>
                            <label for="floatingInput">Email</label>
                        </div>
                    </div>
                </div>

                <div className="row">
                        <div className="col-md-4 mb-3">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="faculty" id="faculty" placeholder="Faculty" value={this.state.faculty} onChange={this.handleInputChange} required/>
                            <label for="floatingInput">Faculty</label>
                        </div>
                        </div>
                        <div className="col-md-4 mb-3">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="batch" id="batch" placeholder="Batch" value={this.state.batch} onChange={this.handleInputChange} required/>
                            <label for="floatingInput">Batch</label>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="specialization" id="specialization" placeholder="Specialization" value={this.state.specialization} onChange={this.handleInputChange} required/>
                            <label for="floatingInput">Specialization</label>
                        </div>
                    </div>
                </div>

                
                <center>
                    <div className='mt-4'>
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
