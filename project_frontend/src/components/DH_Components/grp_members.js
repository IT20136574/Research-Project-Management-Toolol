import React from "react";
import { Component } from 'react';
//import { useParams } from 'react-router-dom';
import axios from "axios";



export default class grpRegister extends Component {

    constructor(props){
      super(props);
      this.state={
           member1_student_id:"",
  
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
        axios.post(`http://localhost:8070/student/grpReg/${id}`,data)
        .then(res=>{
                alert("Group Member Registered")
        
        }).catch((err)=>{
            alert(JSON.stringify(err))
        })

  }



    render() {
        return (
         
            <div>
                            <form name="form" onSubmit={this.onSubmit}> 
                               
                                <h1>Student ID</h1>
                                    <input type="text" name="member1_student_id"  placeholder="student id"
                                     onChange={this.handleInputChange} value={this.setState.member1_student_id} required/>
              
        
                 
                                <br/>                   
                                <center><button type="submit">
                                        Next
                                    </button></center>
                                
                            </form>    
                            
                         
                            </div>     
    
        )
    
    }
    
    }