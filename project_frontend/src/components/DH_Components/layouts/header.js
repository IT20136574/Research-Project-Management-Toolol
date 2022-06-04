import React from "react";
import { Component } from 'react';
import 'typeface-quicksand';
import axios from "axios";

export default class Header extends Component {

    constructor(props){
        super(props);
        this.state={
          group:[],
        }
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

                            this.setState({group:res.data.User});

                
                    }
                    
                 
                    
        
                })
            }catch(error){
                console.log(error);
                alert(error);
            }
            }


            userLogout(){

                if (window.confirm('Are you sure you wish to logout from this Account?')) {
        
                    localStorage.removeItem('Authorization')
        
                    alert("log out complete")
        
                    window.location = "/login"
        
                }
        
            }

    render() {
        return (
      
            <div>

                <header>


                <nav class="navbar navbar-expand-lg navbar-light fixed-top mask-custom shadow-0 ">
                <div class="container">
                <img
                        src="https://firebasestorage.googleapis.com/v0/b/researchprojectmanagemen-d4b3b.appspot.com/o/Final-new-logo-of-SLIIT-1-removebg-preview.png%20Mon%20May%2023%202022%2005%3A00%3A13%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=70ad702b-d614-4ffa-a073-b2607a92c8c2"
                        height="25"
                        alt="Black and White Portrait of a Man"
                        loading="lazy"
                    /><p>  &nbsp;&nbsp; </p>
                <a class="navbar-brand" href="#!"><span style={{color: "#5e9693"}}>Reasearch</span><span style={{color: "#ADD8E6"}}>Management</span></a>
                <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/grpreg">Student Group</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/grpTopic">Research Topic</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/supervisors">Supervisor</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/pannelDetails">Pannel</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/submissions">Submissions</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/documents">Documents</a>
                    </li>
                    </ul>
                    <ul class="navbar-nav d-flex flex-row">

          
                    <li class="nav-item me-3 me-lg-0">
                        <a class="nav-link" href="#!">
                        <button class="btn btn-light" onClick={()=>this.userLogout()}>
                        <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;<span>Log Out</span>
                        </button>
                        </a>
                    </li>

                    



                    <div>&nbsp;&nbsp;&nbsp;</div>
                    <li class="nav-item me-3 me-lg-0">
                        <a class="nav-link" href="#!">
                        <img
                        src={this.state.group.imageUrl}
                        class="rounded-circle"
                        height="35"
                        alt=""
                        loading="lazy"
                    />

                        </a>
                    </li>

                    

                    </ul>
                </div>
                </div>
            </nav>
                
                </header>                          
            </div>     
          
    
        )
    
    }
    
    }