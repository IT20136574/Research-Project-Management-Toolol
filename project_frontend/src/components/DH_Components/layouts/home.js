import React from "react";
import { Component } from 'react';
import axios from "axios";
import 'typeface-quicksand';


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
        groupMembers:[],
        group_name:"",
        groupSize:"",
        topic:"",
        statusr:"",
        field:"",
        t_status:"",
        p_count:"",
        pStatus:"",
        marks:"",
        pMarks:"",
        dMarks:""
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
    this.displaygroupMembers();
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
                  this.setState({gid:res.data.User.grp_id})  

                  if(res.data.User.status == "Registered"){
                      this.setState({statusr:"Registered"});
                      axios.get(`http://localhost:8070/studentGroup/grpDetails`,config).then(res =>{
                        if(res.data.status){
                                this.setState({groupMembers:res.data.groupDetais.groupMembers});
                                const size = this.state.groupMembers.length;
                                console.log(size);
                                const size2 = res.data.groupDetais.panalmembers.length;
                                this.setState({p_count:size2});
                                const a = parseInt(res.data.groupDetais.Document_Marks);
                                const b = parseInt(res.data.groupDetais.precentation_Marks);
                                const mr = (a+b)/2;

                                this.setState({p_count:size2});
                                this.setState({groupSize:size}); 
                                this.setState({group_name:res.data.groupDetais.group_name});  
                                this.setState({topic:res.data.groupDetais.researchTopic_Info[0].research_Topic});  
                                this.setState({field:res.data.groupDetais.researchTopic_Info[0].field});
                                this.setState({p_count:size2});
                                this.setState({pStatus:res.data.groupDetais.panalmemberstatus});
                                this.setState({t_status:res.data.groupDetais.researchTopic_Status});
                                this.setState({dMarks:res.data.groupDetais.Document_Marks});
                                this.setState({pMarks:res.data.groupDetais.precentation_Marks});
                                this.setState({marks:mr});
                            }
              
                        })
                  }else{
                    this.setState({statusr:"Registered"});
                  }
                  console.log(this.state.gid)
              }

          })
        }catch(error){
            console.log(error);
            alert("Error!");
        }
      }



      displaygroupMembers(){
        console.log(this.state.gid)
    }





    render() {
        return (
      
            <div>

    <header>

  <div id="introCarousel" class="carousel slide carousel-fade shadow-2-strong" data-mdb-ride="carousel">
        <ol class="carousel-indicators">
          <li data-mdb-target="#introCarousel" data-mdb-slide-to="0" class="active"></li>
          <li data-mdb-target="#introCarousel" data-mdb-slide-to="1"></li>
          <li data-mdb-target="#introCarousel" data-mdb-slide-to="2"></li>
        </ol>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
            </div>
          </div>

          <div class="carousel-item">
            <div class="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
              <div class="d-flex justify-content-center align-items-center h-100">
              </div>
            </div>
          </div>

          <div class="carousel-item">
            <div
              class="mask"
              style={{background: "linear-gradient(45deg,rgba(29, 236, 197, 0.7),rgba(91, 14, 214, 0.7) 100%)"}}>
            </div>
          </div>
        </div>
  
        <a class="carousel-control-prev" href="#introCarousel" role="button" data-mdb-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#introCarousel" role="button" data-mdb-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
     
    </header>


    <section class="mt-5">
      <div class="row">
        <div class="col-xl-6 col-md-12 mb-4">
            <div class="cardd">
          <div class="cardd mr-1">
            <div class="cardd-body">
              <div class="d-flex justify-content-between p-md-1">
                <div class="d-flex flex-row">
                  <div class="align-self-center">
                    <i class="fas fa-users text-info fa-3x me-4"></i>
                  </div>
                  <div>
                    <h4>Student Group</h4>
                    <p class="mb-0">Group Name&nbsp;:&nbsp;{this.state.group_name}</p>
                    <p class="mb-0">Members&nbsp;:&nbsp;{this.state.groupSize}</p>
                  </div>
                </div>
                <div class="align-self-center">
                  <h3 class="h1 mb-0">{this.state.statusr}</h3>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div class="col-xl-6 col-md-12 mb-4">
        <div class="cardd">
          <div class="cardd">
            <div class="cardd-body">
              <div class="d-flex justify-content-between p-md-1">
                <div class="d-flex flex-row">
                  <div class="align-self-center">
                    <i
                       class="fas fa-tasks text-warning fa-3x me-4"
                       ></i>
                  </div>
                  <div>
                    <h4>Reasearch Topic</h4>
                    <p class="mb-0">Topic&nbsp;:&nbsp;{this.state.topic}</p>
                    <p class="mb-0">Field&nbsp;:&nbsp;{this.state.field}</p>
                  </div>
                </div>
                <div class="align-self-center">
                  <h3 class="h1 mb-0">{this.state.t_status}</h3>
                </div>
              </div>
            </div>
          </div></div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 col-md-12 mb-4">
        <div class="cardd">
          <div class="cardd">
            <div class="cardd-body">
              <div class="d-flex justify-content-between p-md-1">
                <div class="d-flex flex-row">
                  <div class="align-self-center">
                    <i class="fas fa-user text-info fa-3x me-4"></i>
                  </div>
                  <div>
                    <h4>Research Final Marks</h4>
                    <p class="mb-0">Document Marks&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{this.state.dMarks}</p>
                    <p class="mb-0">Presentation Marks&nbsp;:&nbsp;{this.state.pMarks}</p>
                  </div>
                </div>
                <div class="align-self-center">
                  <h3 class="h1 mb-0">{this.state.marks}%</h3>
                </div>
              </div>
            </div></div>
          </div>
        </div>
        <div class="col-xl-6 col-md-12 mb-4">
        <div class="cardd">
          <div class="cardd">
            <div class="cardd-body">
              <div class="d-flex justify-content-between p-md-1">
                <div class="d-flex flex-row">
                  <div class="align-self-center">
                    <i
                       class="far fa-user text-warning fa-3x me-4"
                       ></i>
                  </div>
                  <div>
                    <h4>Pannel Members</h4>
                    <p class="mb-0">Panel Members&nbsp;:&nbsp;{this.state.p_count}</p>
                  </div>
                </div>
                <div class="align-self-center">
                  <h3 class="h1 mb-0">{this.state.pStatus}</h3>
                  <h3 class="h1 mb-0"> &nbsp; </h3>
                </div>
              </div>
            </div>
          </div></div>
        </div>
      </div>
    </section>
   

    <main class="mt-5">
      <div class="container">

        <hr class="my-5" />

        <section class="text-center">
          <h4 class="mb-3"><strong>Group Members</strong></h4>

          <div class="row justify-content-center">

          {this.state.groupMembers.map((groupMembers)=>(

            <div class="col-lg-3 col-md-6 mb-4">
              <div class="cardd">
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img class="rounded-circle z-depth-1 shadow p-3 mb-3 bg-white rounded" alt="100x100" src={groupMembers.imageUrl} data-holder-rendered="true"/>
                  <a href="#!">
                    <div class="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}></div>
                  </a>
                </div>
                <div class="cardd-body">
                  <h5 class="cardd-title">{groupMembers.name}</h5>
                  <p class="card-text">
                     <span class="font-weight-bold">Student ID</span> : {groupMembers.student_id}<br/>
                     <span class="font-weight-bold">Email</span> : {groupMembers.email}<br/>
                     <span class="font-weight-bold">Mobile</span> : {groupMembers.phone}<br/>
                  </p>
                  
                </div>
              </div>
            </div>
          ))}
          </div>
        </section>

        <hr class="my-5" />

      </div>
    </main>

    <footer class="bg-light text-lg-start">
      <div class="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
        © 2020 Copyright&nbsp;:&nbsp;
        <a class="text-dark" href="https://mdbootstrap.com/">SLIIT</a>
      </div>
    </footer>

                            
            </div>     
          
    
        )
    
    }
    
    }