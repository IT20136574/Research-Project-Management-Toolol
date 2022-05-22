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

        axios.post(`http://localhost:8070/student/regResearchTopic`,config, data)
        .then(res=>{
                alert("Reasearch Topic Registered")
                window.location.reload();
        }).catch((err)=>{
            alert(err)
        })

  }



    render() {
        return (
         
            <div>
                
                <form name="form" onSubmit={this.onSubmit}> 
                               
                               <h1>Reasearch Topic</h1>
                                   <input type="text" name="research_Topic"  placeholder="topic"
                                    onChange={this.handleInputChange} value={this.setState.research_Topic} required/>
             
                                <h1>Field</h1>
                                   <input type="text" name="field"  placeholder="field"
                                    onChange={this.handleInputChange} value={this.setState.field} required/>
             
                                <h1>Tags</h1>
                                   <input type="text" name="tags"  placeholder="tags"
                                    onChange={this.handleInputChange} value={this.setState.tags} required/>
             
                               <br/>                   
                               <center><button type="submit">
                                       Submit
                                   </button></center>
                               
                           </form>     
                         
                        
                            
            </div>     
          
    
        )
    
    }
    
    }