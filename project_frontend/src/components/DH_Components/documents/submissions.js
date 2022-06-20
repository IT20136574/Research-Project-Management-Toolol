import React, { Component } from 'react';
import axios from "axios";

export default class submissions extends Component {

    constructor(props){
        super(props);
        this.state={
             submissions:[],
        }
    }


    displaysubmissions(){
        const id = this.props.match.params.data;
      
        axios.get(`http://localhost:8070/submitDocs/getSubs`).then(res =>{
        if(res.data.status){
                this.setState({
                    submissions:res.data.submissions
                });
    
                console.log(this.state.submissions)

            }
    
        })
    }


    
componentDidMount(){
    this.displaysubmissions();
}



  render() {
    return (
      <div style={{marginTop:"5rem",backgroundColor:"#eee"}}>


        <div class="container py-5">
            <div class="row justify-content-center mb-3">
            <div class="col-md-12 col-xl-10">

            {this.state.submissions.map((submissions)=>(
                <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                    <div class="row">
                    <div class="col-md-12 col-lg-1 col-xl-2 mb-4 mb-lg-0">
                        <div class="bg-image ripple rounded ripple-surface">
                            <img style={{height:"8rem"}} src="https://firebasestorage.googleapis.com/v0/b/researchprojectmanagemen-d4b3b.appspot.com/o/1285586-middle-removebg-preview%20(1).png%20Sat%20Jun%2004%202022%2000%3A39%3A25%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=b6426fb6-b7b6-4131-ac29-f4d87d5cf80c"
                            class="w-100" />
                            <a href="#!">
                            <div class="hover-overlay">
                                <div class="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
                            </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-5 col-xl-7">

                        <h5>{submissions.submitionTitle}</h5>

                        <p class="text-truncate mb-4 mb-md-0">
                        {submissions.discription}
                        </p>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3 border-sm-start-none border-start">
                        <h6 >                        
                        <span style={{color:"blue"}}>Start Date</span>
                        <span class="text-primary"> &nbsp; - &nbsp;</span>
                        <span>{submissions.submitionStartedDate}</span></h6>

                        <h6>
                        <span style={{color:"red"}}>Deadline</span>
                        <span class="text-primary"> &nbsp; &nbsp;  - &nbsp; </span>
                        <span>{submissions.deadline}</span>
                        </h6>
                        <div class="d-flex flex-column mt-5">
                        <a href={`/document/${submissions._id}`}><button class="btn btn-primary btn-sm" type="button"><span><i class="fa fa-upload" aria-hidden="true"></i></span>&nbsp;&nbsp;&nbsp;Add submission</button></a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            ))}

            </div>
            </div>
            
        </div>
      
      
      </div>
    )
  }
}
