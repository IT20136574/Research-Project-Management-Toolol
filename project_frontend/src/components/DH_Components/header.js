import React from "react";
import { Component } from 'react';
import 'typeface-quicksand';


export default class Header extends Component {



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
                <a class="navbar-brand" href="#!"><span style={{color: "#5e9693"}}>Reasearch</span><span style={{color: "#fff"}}>Management</span></a>
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
                        <a class="nav-link" href="/topic">Research Topic</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/supervisors">Supervisor</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#!">Reference</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/document">Submissions</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#!">Downloads</a>
                    </li>
                    </ul>
                    <ul class="navbar-nav d-flex flex-row">
                    <li class="nav-item me-3 me-lg-0">
                        <a class="nav-link" href="#!">
                        <i class="fas fa-shopping-cart"></i>
                        </a>
                    </li>
                    <li class="nav-item me-3 me-lg-0">
                        <a class="nav-link" href="#!">
                        <i class="fab fa-twitter"></i>
                        </a>
                    </li>
                    <li class="nav-item me-3 me-lg-0">
                        <a class="nav-link" href="#!">
                        <i class="fab fa-instagram"></i>
                        </a>
                    </li>
                    <div>&nbsp;&nbsp;&nbsp;</div>
                    <li class="nav-item me-3 me-lg-0">
                        <a class="nav-link" href="#!">
                        <img
                        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                        class="rounded-circle"
                        height="35"
                        alt="Black and White Portrait of a Man"
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