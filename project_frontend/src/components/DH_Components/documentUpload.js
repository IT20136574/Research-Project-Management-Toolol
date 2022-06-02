import React from "react";
import { Component } from 'react';
import axios from "axios";




export default class DocumentUpload extends Component {

    constructor(props){
      super(props);
      this.state={

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

  }



    render() {
        return (
         
            <div style={{marginTop:"5rem"}}>

    
                            
            </div>     
          
    
        )
    
    }
    
    }