import React, { Component } from 'react'
import axios from "axios";

export default class Pannel extends Component {
    constructor(props){
        super(props);
        this.state={
             pannel:[],
             group:[],
        }
    }


    componentDidMount(){
        this.displayPannel();
    }


    displayPannel(){
        try{
              var config = {
                  headers: {
                  Authorization: localStorage.getItem("Authorization"),
                  },
              };
  
              axios.get(`http://localhost:8070/studentGroup/grpDetails`,config).then(res =>{
                  if(res.data.status){
                          this.setState({pannel:res.data.groupDetais.panalmembers})  
                          this.setState({group:res.data.groupDetais}) 
                          console.log(this.state.pannel)

                      }
                  })
  
          }catch(error){
              console.log(error);
          }
        }

  render() {
    return (
      
                <div style={{marginTop:"5rem"}}>

                    <div class="container py-5">
                                  <div><h2>
                        <h4><center>PANNEL MEMBERS ASSIGNED TO YOUR GROUP</center></h4>
                        </h2><br/>
                        
                        <table class="table align-middle mb-0 bg-white">
                        <thead class="bg-light">
                            <tr>
                        
                            <th>Name</th>
                          
                            <th>Staff ID</th>
   
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.pannel.map((pannel)=>(
                            <tr>
                           
                            <td>
                            <p class="fw-bold mb-1">{pannel.fname}&nbsp;{pannel.lname}</p>
                            </td>
                     

                            <td>
                                <span class="badge badge-success rounded-pill d-inline">{pannel.staffid}</span>
                            </td>
               
   
                            </tr>
                            ))}
                        </tbody>
                        </table>

                        </div><br/><br/>

                <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                <div><h2>
                        <h4><center><i style={{color:"purple"}} class="fa fa-commenting" aria-hidden="true"></i>&nbsp;FEEDBACKS</center></h4>
                        </h2><br/>
                </div>

                <div><center>{this.state.group.topicFeedback}</center></div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
