import React from "react";
import { Component } from 'react';
//import { useParams } from 'react-router-dom';
import axios from "axios";



export default class Supervisors extends Component {

    constructor(props){
      super(props);
      this.state={
           statusr:"",
           supervisors:[],
           gid:"",
      }
  }

componentDidMount(){
    this.displaysupervisors();
}

request(id1,id2){

    if (window.confirm('Are you sure you want to request this supervisor?')) {
        axios.post(`http://localhost:8070/sSupervisorGroup/requestSupervisor/${id1}/${id2}`).then(res=>{
                alert("requested successfully");
                window.location.reload();
        })
    }
    
  }




  displaysupervisors(){
      try{
            var config = {
                headers: {
                Authorization: localStorage.getItem("Authorization"),
                },
            };

            axios.get(`http://localhost:8070/student/getUser`,config).then(res =>{
                if(res.data.status){
                        this.setState({gid:res.data.User.grp_id})  
                        console.log(this.state.gid)
  
                        if(res.data.User.status == "Registered"){
                           
                            axios.get(`http://localhost:8070/studentGroup/grpDetails`,config).then(res =>{
                                if(res.data.status){
                                    console.log(res.data.groupDetais)
                                        if(res.data.groupDetais.researchTopic_Status == "Accepted"){
                                            this.setState({statusr:"Accepted"});
                                            axios.get(`http://localhost:8070/sSupervisorGroup/displayCoSuper`,config).then(res =>{
                                                if(res.data.status){
                                                        this.setState({
                                                            supervisors:res.data.co_supervisors
                                                        });
                                                        console.log(this.state.supervisors)
                                                    }
                                                    console.log(this.supervisors)
                                                    
                                            
                                                })
                                        }else if(res.data.groupDetais.researchTopic_Status == "Requested"){
                                            this.setState({statusr:"Requested"});
                                        }
                                        else if(res.data.groupDetais.researchTopic_Status == "Rejected"){
                                            this.setState({statusr:"Rejected"});
                                        }
                                        else{
                                            this.setState({statusr:""});
                                            axios.get(`http://localhost:8070/sSupervisorGroup/displaySuper`,config).then(res =>{
                                                if(res.data.status){
                                                        this.setState({
                                                            supervisors:res.data.supervisors
                                                        });
                                                        console.log(this.state.supervisors)
                                                    }
                                                    console.log(this.supervisors)
                    
                                                })
                                        }
                                    }
                                 
                                    
                    
                                })
  
 
                        }else if(res.data.User.status == "Not registered.."){
                            this.setState({statusr:"no"});
                        }
                        console.log(this.state.gid)
                    }
                 
                    
        
                })

        }catch(error){
            console.log(error);
            alert("Your group already requested a supervisor!");
        }
        }




    render() {
        return (
             
                <div style={{marginTop:"5rem"}}>

                    <div class="container py-5">

                    {this.state.statusr == "Accepted" &&
                        <div>
                            <h2>
                                <h4><center>CO-SUPERVISORS ON YOUR FIELD</center></h4>
                            </h2>

                            <div className="col-md-3 ms-auto mt-0">
                    
                    <div class="input-group rounded">
                    Reasearch Topic Status = &nbsp;
                    <span style={{color:"blueviolet"}} >
                       {this.state.statusr}
                    </span>
                    </div>
                    </div><br/>
                        
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
                                    <p class="fw-bold mb-1">{supervisors.fname}&nbsp;{supervisors.lname}</p>
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
                                <button onClick={()=>this.request(supervisors._id,this.state.gid)} type="button" class="bg-dark text-light btn-link btn-sm btn-rounded">
                                Request
                                </button>
                            </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                        
                        </div>
                    }


                    
                    {this.state.statusr == "" &&
                        <div><h2>
                        <h4><center>Supervisors On your field</center></h4>
                        </h2><br/>
                        
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
                                    <p class="fw-bold mb-1">{supervisors.fname}&nbsp;{supervisors.lname}</p>
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
                                <button onClick={()=>this.request(supervisors._id,this.state.gid)} type="button" class="bg-dark text-light btn-link btn-sm btn-rounded">
                                Request
                                </button>
                            </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>

                        </div>
                    }



                    {this.state.statusr == "Requested" &&
                        <div><h2>
                        <h4 style={{color:"purple"}}><center>You have Requested a Supervisor.</center></h4>
                        </h2>

                      
                            <center><div>
                                Reasearch Topic Status = &nbsp;
                                <span style={{color:"blue"}} >
                                {this.state.statusr}
                                </span>
                            </div></center>
                            

                        </div>
                    }


                    {this.state.statusr == "Rejected" &&
                        <div><h2>
                        <h4 style={{color:"red"}}><center>Your Research Topic has been Rejected!!!</center></h4>
                        </h2>

                      
                            <center><div>
                                Reasearch Topic Status = &nbsp;
                                <span style={{color:"red"}} >
                                {this.state.statusr}
                                </span>
                            </div></center>
                            

                        </div>
                    }

                    {this.state.statusr == "no" &&
                        <div><h2>
                        <h4 style={{color:"red"}}><center>Your are not registered in a group!!!</center></h4>
                        </h2>
                            

                        </div>
                    }
                    




                        </div>
            </div>
                            
                
          
    
        )
    
    }
    
    }