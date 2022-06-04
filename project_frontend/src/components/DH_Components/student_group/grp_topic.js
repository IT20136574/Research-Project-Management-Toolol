import React from "react";
import { Component } from 'react';
import axios from "axios";



export default class Member extends Component {

    constructor(props){
      super(props);
      this.state={
        research_Topic:"",
        field:"",
        tags:"",
        statusr:"",
        group:[]
      }
  }
  
  handleInputChange = (e) => {
      const {name,value} = e.target;
      this.setState({
          ...this.state,
          [name]:value
      }) 
  } 


  
componentDidMount(){
this.displayx();
}


displayx(){
  try{
        var config = {
            headers: {
            Authorization: localStorage.getItem("Authorization"),
            },
        };


        axios.get(`http://localhost:8070/student/getUser`,config).then(res =>{
        if(res.data.status){
          console.log(res.data)
                if(res.data.User.status == "Registered"){
                    this.setState({statusr:"Registered"});

                    axios.get(`http://localhost:8070/studentGroup/grpDetails`,config).then(res =>{
                      if(res.data.status){
                          console.log(res.data.groupDetais)
                              if(res.data.groupDetais.researchTopic_Status == "Accepted"){
                                  this.setState({statusr:"Accepted"});
                                  this.setState({group:res.data.groupDetais.researchTopic_Info[0]})
                              }
                              else if(res.data.groupDetais.researchTopic_Status == "Rejected"){
                                  this.setState({statusr:"Registered"});
                              }
                          }
                       
                          
          
                      })

                }else{
                    this.setState({statusr:""});
                }
            }
         
            

        })
    }catch(error){
        console.log(error);
        alert("Error!");
    }
    }

  
  onSubmit = (e) =>{

    const config = {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      };
      console.log(config)
    
  
    e.preventDefault();
        const {research_Topic,field,tags} = this.state;
        const data = {research_Topic,field,tags};
        console.log(data)

        axios.post(`http://localhost:8070/studentGroup/regResearchTopic`,config, data)
        .then(res=>{
                alert("Reasearch Topic Registered")
                window.location.reload();
        }).catch((err)=>{
            alert("Group Topic Already Exists!")
        })

  }



    render() {
        return (
         
            <div style={{marginTop:"5rem"}}>


                                              

                <div class="container py-5">
                    <div class="row justify-content-center mb-3">
                        <div class="col-md-12 col-xl-10">

                        {this.state.statusr == "Registered" &&
                                        <form name="form" onSubmit={this.onSubmit}> 
         
         
                                         <div className="d-flex align-items-center mb-3 pb-1">
                                           <center><i className="fa fa-graduation-cap fa-2x me-3" style={{color: "#ff6219"}}></i>
                                               <span className="h2 mb-0">Research Topic Registration</span></center>
                                           </div>
         
                                           <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing:"1px"}}>Research Topic</h5>
         
                                           <div class="form-floating mb-3">
                                               <input type="text" class="form-control" name="research_Topic" id="floatingInput" placeholder="name@example.com" onChange={this.handleInputChange} value={this.setState.research_Topic}  required/>
                                               <label for="floatingInput">Research Topic</label>
                                           </div>
                                           
                                           <div class="form-floating mb-3">
                                             
                                             <select class="form-select" aria-label="Default select example" id="field"  onChange={this.handleInputChange} value={this.setState.field} name="field">
                                                 <option ></option>
                                                 <option value="Single">Single</option>
                                                 <option value="Double">Double</option>
                                                 <option value="Family">Family</option>
                                             </select>
                                             <label for="floatingInput">Reasearch Field</label>
                                             </div>
         
                                           <div class="form-floating mb-3">
                                               <input type="text" class="form-control" name="tags" id="floatingInput" placeholder="name@example.com"  onChange={this.handleInputChange} value={this.setState.tags}  required/>
                                               <label for="floatingInput">Tags</label>
                                           </div>
         

                                           <div className="pt-1 mb-4">
                                               <button className="btn btn-dark btn-lg btn-block ml-4 mr-4" type="submit">Next</button>
                                           </div>  
                                        
                                    </form>   
                        }

                                {this.state.statusr == "" &&
                                  <div><h2>
                                  <h4 style={{color:"red"}}><center>You are not registered in a group...</center></h4>
                                  </h2>
          
                                
                                      <center><div>
                                          Please register in a group...!
                                      </div></center>
                                      
          
                                  </div>   
                                 }



                                {this.state.statusr == "Accepted" &&
                                  <div><h2>
                                  <h4 style={{color:"red"}}><center>Your Research topic has been accepted...</center></h4>
                                  </h2>
          
                      
                                  <center><div><div>
                                Reasearch Topic Status = &nbsp;
                                    <span style={{color:"blue"}} >
                                    {this.state.statusr}
                                    </span>
                                  </div>

                                  <div>
                                Reasearch Topic = &nbsp;
                                <span style={{color:"blue"}} >
                                {this.state.group.research_Topic}
                                </span>
                            </div>
                            </div>
                            </center>
                                      
          
                                  </div>   
                                 }
                
  
                              
                          </div>     
                        </div>
                    </div>    
                </div>

    
        )
    
    }
    
    }