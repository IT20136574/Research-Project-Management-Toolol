import { Button } from "bootstrap";
import React,{Component} from "react";

export default class NavBar extends Component{


  render(){
      
    return(
      
      <div>

      <header>


      <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div class="container-sm">
          <img
                  src="https://static.sliit.lk/wp-content/uploads/2021/10/24070027/SLIIT.png"
                  height="43"
                  alt="slitt"
                  loading="lazy"
              /><p>  &nbsp;&nbsp; </p>
                     <p style={{color: "#5e9693", fontSize:"22px"}}>STAFF</p><p style={{color: "#fff", fontSize:"20px"}}>Staff</p>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link" style={{ fontSize:"18px"}} href="/shome">Home</a>
                </li> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li class="nav-item">
                    <a class="nav-link" style={{ fontSize:"18px"}} href="/topics">Topics</a>
                </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li class="nav-item">
                    <a class="nav-link" style={{ fontSize:"18px"}} href="/eveluate">Evaluate Documents</a>
                </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li class="nav-item">
                    <a class="nav-link" style={{ fontSize:"18px"}} href="/topic">Project Chat</a>
                </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                <li class="nav-item">
                    <a class="nav-link" style={{ fontSize:"18px"}} href="/mark">Marking Schemes</a>
                </li>
                
                </ul>
                <ul class="navbar-nav d-flex flex-row">
               
               
                
                <div>&nbsp;&nbsp;&nbsp;</div>
                <li class="nav-item me-3 me-lg-0">
                    <a class="nav-link" href="/profile">
                    <img
                    src="https://196034-584727-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2019/04/Dan-Clark-Software-Engineer-Round.jpg"
                    class="rounded-circle"
                    height="43"
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