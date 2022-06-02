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

  

                    <div class="item-wrapper one">

                    <center><h3>
                        <span style={{color:"red"}}><i class="fa fa-upload" aria-hidden="true">&nbsp;&nbsp;</i></span>
                        <span >Upload Submissions</span>
                    </h3></center>
                      
                    <div class="item">
                        
                        <form data-validation="true" action="#" method="post" enctype="multipart/form-data">
                            <div class="item-inner">
                                <div class="item-content">
                            


                                    <div class="image-upload">
                                    <label style={{cursor: "pointer"}} for="file_upload">

                                        <img src="" alt="" class="uploaded-image"/>

                                        <div class="h-100">
                                            <div class="dplay-tbl">
                                                <div class="dplay-tbl-cell">
                                                
                    
                                                    <i class="fa fa-cloud-upload"></i>
                                                    <h5><b>Choose Your File to Upload</b></h5>
                                                    <h6 class="mt-10 mb-70">Or Drop Your File Here</h6>


                                                </div>
                                            </div>
                                        </div>
                                        <input data-required="image" type="file" name="image_name" id="file_upload" class="image-input" data-traget-resolution="image_resolution" value=""/>
                                        
                                        </label>
                                    </div>
                        
                                </div>
                            </div>
                            <center><button style={{padding:"10px 50px"}} class="btn btn-primary btn-sm" type="submit">Upload</button></center>

                        </form>
                    </div>

                    </div>
                            
            </div>     
          
    
        )
    
    }
    
    }