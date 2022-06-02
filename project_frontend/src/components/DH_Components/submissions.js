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
                    <div class="col-md-6 col-lg-6 col-xl-6">

                        <h5>{submissions.submitionTitle}</h5>

                        <p class="text-truncate mb-4 mb-md-0">
                        {submissions.discription}
                        </p>
                    </div>
                    <div style={{marginLeft:"15rem"}} class="col-md-3 col-lg-3 col-xl-3 border-sm-start-none border-start">
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
                        <a href={`/document/${submissions._id}`}><button class="btn btn-primary btn-sm" type="button">Add submission</button></a>
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
