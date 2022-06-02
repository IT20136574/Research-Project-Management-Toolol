import React from "react";
import { Component } from 'react';
import axios from "axios";

export default class groupName extends Component {
    constructor(props){
        super(props);
        this.state={
            group_name:"",
            id:"",
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
            const {group_name} = this.state;
            const data = {group_name};

            axios.post(`http://localhost:8070/studentGroup/grpReg`,data)
            .then(res=>{
                console.log(res.data)
                if(res.data.status){
                    this.setState({
                        id:res.data.id
                    });
                   
                }
                    alert("Group Name Registered")
                    window.location.href= `/grpmem/${this.state.id}`
            }).catch((err)=>{
                alert("Register error",err)
            })
    
      }


  render() {
    return (
        <div style={{marginTop:"5rem"}}>

                <div class="container py-5">
                    <div class="row justify-content-center mb-3">
                        <div class="col-md-12 col-xl-10">

                            <form name="form" onSubmit={this.onSubmit}>

                                <div className="d-flex align-items-center mb-3 pb-1">
                                    <i className="fa fa-users fa-2x me-1" style={{color: "#ff6219"}}></i>
                                    <span className="h2 fw-bold mb-0">Group Registration</span>
                                </div>
                                <br/><br/>
                                <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing:"1px"}}>Group Name</h5>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" name="group_name" id="floatingInput" placeholder="name@example.com" onChange={this.handleInputChange} value={this.setState.group_name}  required/>
                                    <label for="floatingInput">Group name</label>
                                </div>
                                <br/>
                                <div className="pt-1 mb-4">
                                    <button className="btn btn-dark btn-lg btn-block ml-4 mr-4" type="submit">Next</button>
                                </div>


                            </form>
                        </div>
                    </div>
            
        </div>
                 
        </div>
    )
  }
}
