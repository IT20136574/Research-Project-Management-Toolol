import React from "react";
import { Component } from 'react';
//import { useParams } from 'react-router-dom';
import axios from "axios";



export default class DisplaySupervisors extends Component {

    constructor(props){
      super(props);
      this.state={
           staff:{},
      }
  }
  

  displaysupervisor(){
    const id = this.props.match.params.id;
    axios.get(`http://localhost:8070/student/supervisor/${id}`).then(res =>{
    if(res.data.success){
            this.setState({
                staff:res.data.staff
            });
            
        }
        console.log(this.state.staff)
    })
}


request(){
    const config = {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      };

      //console.log(config)

    const id = this.props.match.params.id;
      
    if (window.confirm('Are you sure you want to request this supervisor?')) {
        axios.post(`http://localhost:8070/student/requestSupervisor/${id}`,config).then(res=>{
            console.log(config)
                alert("requested successfully");
                window.location.reload();
                 
        })
    }
    
  }




componentDidMount(){
    this.displaysupervisor();
}


    render() {
        const {fname,email, phone, field } = this.state.staff;

        return (
             
                <div>
                    <div>
                     <div>
                        <center><h4>
                        staff on your field
                        </h4></center>
                            
                           
                        </div>
                        <p>{fname}</p>
                        <p>{email}</p>
                        <p>{phone}</p>
                        <p>{field}</p>

                        <button type="submit" onClick={()=>this.request()} >Request</button>



                    </div>
            </div>
                            
 
        )
    
    }
    
    }