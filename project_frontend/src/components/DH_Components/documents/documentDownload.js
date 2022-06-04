import React, { Component } from 'react';
import axios from "axios";

export default class documentDownload extends Component {

    constructor(props){
        super(props);
        this.state={
             documents:[],
        }
    }


    displaydocuments(){
        const id = this.props.match.params.data;
      
        axios.get(`http://localhost:8070/submitDocs/getDocs`).then(res =>{
        if(res.data.status){
                this.setState({
                    documents:res.data.documents
                });
    
                console.log(this.state.documents)

            }
    
        })
    }


    
componentDidMount(){
    this.displaydocuments();
}



  render() {
    return (
      <div style={{marginTop:"5rem",backgroundColor:"#eee"}}>


        <div class="container py-5">
            <div class="row justify-content-center mb-3">
            <div class="col-md-12 col-xl-10">

            {this.state.documents.map((documents)=>(
            <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12 col-lg-3 col-xl-2 mb-4 mb-lg-0">
                        <div class="bg-image hover-zoom ripple rounded ripple-surface">
                            <img style={{height:"6rem",width:"2rem"}} src="https://firebasestorage.googleapis.com/v0/b/researchprojectmanagemen-d4b3b.appspot.com/o/MicrosoftTeams-image%20(3).png%20Sat%20Jun%2004%202022%2000%3A20%3A43%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=7051dbb2-3f45-49a1-afa3-87f4739e5a5f"
                            class="w-100" />
                            <a href="#!">
                            <div class="hover-overlay">
                                <div class="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
                            </div>
                            </a>
                        </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-7">
                        <h5>{documents.displaytitle}</h5>

                        <div class="mt-1 mb-0 text-muted small">
                            <span>{documents.docname}</span>
                        </div>


                        <p class="text-truncate mb-4 mb-md-0">
                        {documents.discription}
                        </p>
                        </div>
                        <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">

                        <h6 class="text-success">{documents.type}</h6>
                        <div class="d-flex flex-column mt-4">
                        <a href={documents.fileUrl}><button class="btn btn-outline-primary btn-sm mt-2" type="button">
                            <span><i class="fa fa-download" aria-hidden="true"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;Download Document
                            </button></a>
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
