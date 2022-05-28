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
        axios.post(`http://localhost:8070/student/grpReg/${id}`,data)
        .then(res=>{
                alert("Group Member Registered")
                window.location.reload();
        }).catch((err)=>{
            alert(JSON.stringify(err))
        })

  }



  displaygroupMembers(){
    const id = this.props.match.params.data;
  
    axios.get(`http://localhost:8070/student/display/${id}`).then(res =>{
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
        axios.delete(`http://localhost:8070/student/deleteMem/${id}`).then((res)=>{
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
                
                <form name="form" onSubmit={this.onSubmit}> 
                               
                               <h1>Student ID</h1>
                                   <input type="text" name="member1_student_id"  placeholder="student id"
                                    onChange={this.handleInputChange} value={this.setState.member1_student_id} required/>
             
       
                
                               <br/>                   
                               <center><button type="submit">
                                       Next
                                   </button></center>
                               
                           </form>     
                         
                            <div>
                    <div>
                    <div>
                        <center><h4>
                        Registerd Group Members
                        </h4></center>
                            
                           
                        </div>
                        <table className="table table-hover" style={{marginTop:'40px', background: "#F0FFFF" }} >
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
                        </table>
                    </div>
            </div>
                            
            </div>     
          
    
        )
    
    }
    
    }