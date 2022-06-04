import axios from 'axios';
import React, { Component } from 'react'
import {toast} from 'react-toastify';
export default class AddSubmition extends Component {
    constructor(props){
        super(props)

        this.state ={
            submitionTitle : "",
            submitionStartedDate : "",
            deadline : "",
            discription : "",
            submitionType :  ""      
        }
    }

    handleInputChange = (e)=>{
        const{name,value} = e.target;
        this.setState({
           ...this.state,
           [name]:value
        })
     }

     onSubmit = (e) => {
        e.preventDefault();
        const{submitionTitle,submitionStartedDate, deadline, discription, submitionType} = this.state
         const NewSubmition = { 
            submitionTitle : submitionTitle,
            submitionStartedDate : submitionStartedDate,
            deadline : deadline,
            discription : discription,
            submitionType : submitionType
            
         }

         axios.post("http://localhost:8070/submition/create",NewSubmition).then((res)=>{
             if(res.data){
                toast.success('Submission Type Created',{position:toast.POSITION.TOP_Right});
                window.setTimeout(function() {
                    window.location.href="/submition";
                }, 3000)   
                 
             }
         }).catch((e)=>{
             console.log(e)
         })
     }
  render() {
    return (
        <div className='alignMarginN'>
        <div class="container">
            <div class="main-body">
            <div class="col-md-12">
              <div class="card mb-2 mt-5" style={{width:94+"%",boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
                <div class="card-body">
                <h4 className="fw-bold mb-1">Create Submission Type</h4><br/>
                <form method='POST' onSubmit={this.onSubmit}>
                <div className="row">
                        <div className="col-md-12 mb-2">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="submitionTitle" id="submitionTitle" placeholder="Submission Title" onChange={this.handleInputChange} value={this.setState.submitionTitle} required="true"/>
                            <label for="floatingInput">Submission Title</label>
                        </div>
                        </div>
                </div>
       

                <div class="form-floating mb-3">
                          <textarea id="floatingInput" name="discription" style={{height: "100px"}} type="text"  class="form-control" placeholder="Description"  onChange={this.handleInputChange} value={this.setState.discription} required/>
                          <label for="floatingInput">Description</label>
                 </div>

                <div className="row">
                        <div className="col-md-4 mb-2">
                        <div class="form-floating mb-2">
                            <input type="date" class="form-control" name="submitionStartedDate" id="submitionStartedDate" placeholder="Started Date" onChange={this.handleInputChange} value={this.setState.submitionStartedDate}   required/>
                            <label for="floatingInput">Started Date</label>
                        </div>
                        </div>
                        <div className="col-md-4 mb-2">
                        <div class="form-floating mb-2">
                            <input type="date" class="form-control" name="deadline" id="deadline" placeholder="Deadline" onChange={this.handleInputChange} value={this.setState.deadline} required/>
                            <label for="floatingInput">Deadline</label>
                        </div>
                    </div>

                    <div className="col-md-4 mb-2">
                        <div class="form-floating mb-2">
                        <select className="form-control" required="required" id="submitionType" placeholder="Submission Type"  name="submitionType" onChange={this.handleInputChange} value={this.setState.submitionType}>
                            <option selected>Submission Type</option>
                            <option value="PDF">PDF</option>
                            <option value="Presentation">Presentaion</option>
                            <option value="Word">Word</option>
                        </select>
                        </div>
                    </div>
                </div>
                
                <center>
                    <div className='mt-4'>
                        <input class='btn btn-warning' type="reset" value="Reset" style={{width: 15+"%"}}/> &nbsp;&nbsp;&nbsp;
                        <input class='btn btn-primary' type="submit" value="Create Submission" style={{width: 15+"%"}}/> 
                    </div>
                </center>
                
                </form>
                  
    
              </div>
            </div>
          </div>


            </div>
        </div>
    </div>
    )
  }
}
