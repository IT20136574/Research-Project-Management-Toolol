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
                
                <div class="row d-flex justify-content-center mt-100">
                        
                        <div class="col-md-8">
                            
                            <div class="card">
                    <div class="card-header">
                    <h5>File Upload</h5>
                    </div>
                    <div class="card-block">
                    <form action="#" class="dropzone dz-clickable">

                    <div class="dz-default dz-message"><span>Drop files here to upload</span></div></form>
                    <div class="text-center m-t-20">
                    <button class="btn btn-primary">Upload Now</button>
                    </div>
                    </div>
                    </div>

                            
                            
                        </div>
                        
                        
                    </div>

    
                            
            </div>     
          
    
        )
    
    }
    
    }