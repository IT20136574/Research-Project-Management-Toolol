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
  
  


  displaysupervisors(){
    const config = {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      };

      console.log(config);

    axios.get(`http://localhost:8070/student/displaySuper`,config).then(res =>{
    if(res.data.status){
            this.setState({
                supervisors:res.data.supervisors
            });
            console.log(this.state.supervisors)
        }
        console.log(this.supervisors)
        

    })
}




componentDidMount(){
    this.displaysupervisors();

}


    render() {
        return (
             
                <div>
                    <div>
                     <div>
                        <center><h4>
                        Supervisors on your field
                        </h4></center>
                            
                           
                        </div>
                        <table>
                            <thead>
                                <tr bgcolor="#D5D6EA">
                               
                                <th scope="col">Name</th>
                                <th scope="col">Field</th>
                                <th scope="col">Email</th>
                    

                                </tr>
                            </thead>  
                            <tbody>
                                {this.state.supervisors.map((supervisors)=>(
                                   <tr>
                                       <td>{supervisors._id}</td>
                                        
                                        <td>{supervisors.fname}</td>
                                        <td>{supervisors.field}</td>
                                        <td>{supervisors.email}</td>
                                       
                                        <td>
                                        <a href={`/displaySupervisor/${supervisors._id}`}>
                                        <button type="submit" >Select</button>
                                        </a>
                                        
               
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