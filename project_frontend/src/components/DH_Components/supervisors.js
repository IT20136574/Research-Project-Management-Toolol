import React from "react";
import { Component } from 'react';
//import { useParams } from 'react-router-dom';
import axios from "axios";



export default class Supervisors extends Component {

    constructor(props){
      super(props);
      this.state={
           supervisors:[],
      }
  }

  
  request(id){
    const config = {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      };


    if (window.confirm('Are you sure you want to request this supervisor?')) {
        axios.post(`http://localhost:8070/sSupervisorGroup/requestSupervisor/${id}`,config).then(res=>{
            console.log(config)
                alert("requested successfully");
                window.location.reload();
        })
    }
    
  }
  


  displaysupervisors(){
      try{
            const config = {
                headers: {
                Authorization: localStorage.getItem("Authorization"),
                },
            };


            axios.get(`http://localhost:8070/sSupervisorGroup/displaySuper`,config).then(res =>{
            if(res.data.status){
                    this.setState({
                        supervisors:res.data.supervisors
                    });
                    console.log(this.state.supervisors)
                }
                console.log(this.supervisors)
                

            })
        }catch(error){
            console.log(error);
            alert("Your group already requested a supervisor!");
        }
        }


componentDidMount(){
    this.displaysupervisors();
}


    render() {
        return (
             
                <div style={{marginTop:"5rem"}}>

                    <div class="container py-5">
                        <center><h4>
                        SUPERVISORS ON YOUR FEILD
                        </h4></center><br/>

                    <table class="table align-middle mb-0 bg-white">
                        <thead class="bg-light">
                            <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Contact</th>
                            <th>Field</th>
                            <th>Description</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.supervisors.map((supervisors)=>(
                            <tr>
                            <td>
                                <div class="d-flex align-items-center">
                                <img
                                    src={supervisors.profileImage}
                                    alt=""
                                    style={{width: "45px", height: "45px"}}
                                    class="rounded-circle"
                                    />
                                <div class="ms-3">
                                    <p class="fw-bold mb-1">{supervisors.fname}</p>
                                    <p class="text-muted mb-0">{supervisors.email}</p>
                                </div>
                                </div>
                            </td>
                            <td>
                            <span class="badge badge-primary rounded-pill d-inline">{supervisors.role}</span>
                            </td>
                            <td>
                                <p class="fw-normal mb-1">{supervisors.phone}</p>
                            </td>

                            <td>
                                <span class="badge badge-success rounded-pill d-inline">{supervisors.field}</span>
                            </td>
                            <td>
                                <p class="fw-normal mb-1">{supervisors.description}</p>
                            </td>
                            <td>
                                <button onClick={()=>this.request(supervisors._id)} type="button" class="bg-dark text-light btn-link btn-sm btn-rounded">
                                Request
                                </button>
                            </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>

                        </div>
            </div>
                            
                
          
    
        )
    
    }
    
    }