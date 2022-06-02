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
                    alert("Group Member Registered")
                    window.location.href= `/grpmem/${this.state.id}`
            }).catch((err)=>{
                alert("Register error",err)
            })
    
      }


  render() {
    return (
        <div style={{marginTop:"5rem"}}>
                
        <form name="form" onSubmit={this.onSubmit}> 
                       
                       <h1>Group Name</h1>
                           <input type="text" name="group_name"  placeholder="student id"
                            onChange={this.handleInputChange} value={this.setState.group_name} required/>
        
                       <br/>                   
                       <center><a ><button type="submit">
                               Next
                           </button></a></center>
                       
                   </form>     
                 
        </div>
    )
  }
}
