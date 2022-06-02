import React from "react";
import { Component } from 'react';
import axios from "axios";



export default class Member extends Component {

    constructor(props){
      super(props);
      this.state={
           member1_student_id:"",
           groupMembers:[],
           visible:0
      }
  }
  
  handleInputChange = (e) => {
      const {name,value} = e.target;
      this.setState({
          ...this.state,
          [name]:value
      }) 
  } 
  
  onSubmit = (e) =>{
    
  
    e.preventDefault();
        const {member1_student_id} = this.state;
        const data = {member1_student_id};
        console.log(data)

        const id = this.props.match.params.data;

        console.log(id)
        axios.post(`http://localhost:8070/studentGroup/grpReg/${id}`,data)
        .then(res=>{
                alert("Group Member Registered")
                window.location.reload();
        }).catch((err)=>{
            alert("This student already registered in a group...!")
        })

  }



  displaygroupMembers(){
    const id = this.props.match.params.data;
  
    axios.get(`http://localhost:8070/studentGroup/display/${id}`).then(res =>{
    if(res.data.status){
            this.setState({
                groupMembers:res.data.groupMembers
            });

            console.log(this.state.groupMembers)
            const size = this.state.groupMembers.length
            console.log(size)
            if(size <= 4){
                this.setState({visible:4})
                console.log(this.state)
            }
        }

    })
}

onDelete = (id) =>{

    if (window.confirm('Are you sure you wish to remove this member?')) {
        axios.delete(`http://localhost:8070/studentGroup/deleteMem/${id}`).then((res)=>{
                //alert("Delete successful");
                alert('Removed successfully');
                window.location.reload();
                 
        })
    }
    
  }


componentDidMount(){
    this.displaygroupMembers();
}




    render() {
        return (
         
            <div style={{marginTop:"5rem"}}>
                
                {/* <form name="form" onSubmit={this.onSubmit}> 
                               
                               <h1>Student ID</h1>
                                   <input type="text" name="member1_student_id"  placeholder="student id"
                                    onChange={this.handleInputChange} value={this.setState.member1_student_id} required/>
             
       
                
                               <br/>                   
                               <center><button type="submit">
                                       Next
                                   </button></center>
                               
                           </form>      */}

                <div class="container py-5">
                    <div class="row justify-content-center mb-3">
                        <div class="col-md-12 col-xl-10">

                            <form name="form" onSubmit={this.onSubmit}>

                                <div className="d-flex align-items-center mb-3 pb-1">
                                <center><i className="fa fa-users fa-2x me-3" style={{color: "#ff6219"}}></i>
                                    <span className="h2 mb-0">Group Member Registration</span></center>
                                </div>

                                <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing:"1px"}}>Student ID</h5>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" name="member1_student_id" id="floatingInput" placeholder="name@example.com" onChange={this.handleInputChange} value={this.setState.member1_student_id}  required/>
                                    <label for="floatingInput">Student ID</label>
                                </div>

                                <div className="pt-1 mb-4">
                                    <button className="btn btn-dark btn-lg btn-block ml-4 mr-4" type="submit">Next</button>
                                </div>
                            </form>
                        </div>
                    </div>    
                </div>





                         
                            <div>
                    <div class="container py-5">
                    <div>
                        <center><h4>
                        Registerd Group Members
                        </h4></center><br/>
                            
                           
                        </div>
                        {/* <table className="table table-hover" style={{marginTop:'40px', background: "#F0FFFF" }} >
                            <thead>
                                <tr bgcolor="#D5D6EA">
                                <th scope="col">No</th>
                                <th scope="col">student_id</th>
                                <th scope="col">name</th>
                                <th scope="col">email</th>
                                <th scope="col">phone</th>

                                </tr>
                            </thead>  
                            <tbody>
                                {this.state.groupMembers.map((groupMembers,index)=>(
                                   <tr>
                                        <th scope = "row">{index +1}</th>
                                        <td>{groupMembers.student_id}</td>
                                        <td>{groupMembers.name}</td>
                                        <td>{groupMembers.email}</td>
                                        <td>{groupMembers.phone}</td>
                                        <td>
 
                                        <button type="submit" onClick={()=>this.onDelete(groupMembers._id)} >Remove</button>
               
                                        </td>
                                    </tr>
                                   
                                ))}
                            </tbody>
                        </table> */}

<table class="table align-middle mb-0 bg-white">
                        <thead class="bg-light">
                            <tr>
                            <th>Name</th>
                            <th>Student ID</th>
                            <th>Contact</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.groupMembers.map((groupMembers)=>(
                            <tr>
                            <td>
                                <div class="d-flex align-items-center">
                                <img
                                    src={groupMembers.imageUrl}
                                    alt=""
                                    style={{width: "45px", height: "45px"}}
                                    class="rounded-circle"
                                    />
                                <div class="ms-3">
                                    <p class="fw-bold mb-1">{groupMembers.name}</p>
                                    <p class="text-muted mb-0">{groupMembers.email}</p>
                                </div>
                                </div>
                            </td>
                            <td>
                            <span class="badge badge-primary rounded-pill d-inline">{groupMembers.student_id}</span>
                            </td>
                            <td>
                                <p class="fw-normal mb-1">{groupMembers.phone}</p>
                            </td>

                            <td>
                                <button onClick={()=>this.onDelete(groupMembers._id)} type="button" class="bg-dark text-light btn-link btn-sm btn-rounded">
                                Remove
                                </button>
                            </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>



                    </div>
            </div>
                            
            </div>     
          
    
        )
    
    }
    
    }