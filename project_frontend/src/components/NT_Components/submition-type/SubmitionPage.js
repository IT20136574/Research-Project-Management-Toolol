import React, { Component } from 'react'
import {HiRefresh} from "react-icons/hi"
import {RiAddCircleFill} from "react-icons/ri"
import axios from 'axios'

export default class SubmitionPage extends Component {
  constructor(props){
    super(props);
    this.state = {
        submitionTypes : []
    }
}

componentDidMount(){
    axios.get("http://localhost:8070/submition/getSubmition").then((res)=>{
        if(res.data.success){
            this.setState({
                submitionTypes : res.data.submitions
            })
        }
    }).catch((e)=>{
        console.log(e)
    })
}

onDelete(id){
    if(window.confirm("Are you sure to delete this?")){
        axios.delete(`http://localhost:8070/submition/deleteSubmition/${id}`).then((res)=>{
          if(res.data){
            console.log("delete success!")
             window.location.reload();
          }
        }).catch((e)=>{
          console.log(e)
        })
    }
}

onUpdate(id){
    window.location.href=`/updatesubmition/${id}`
}
  render() {
    return (
        // <div className='alignMargin'>
        //     <h2>Submition</h2>
        //     <a href='/addsubmition'><button>Add Submition</button></a>
        //     <br/><br/>
        //     <h2>Submition Types</h2>
        //     <DisplaySubmitionTypes/>
        // </div>
        <div className='alignMarginN'>
        <div class="container">
            <div class="main-body">
    
            <div class="col-md-12">
              <div class="card mb-2 mt-4" style={{width:94+"%"}}>
                <div class="card-body">
                  <center><h3 className="fw-bold mb-0">Submition Types</h3></center>
                  <div className='row mt-3'>
                    <div className="col-md-4 mt-0">
                      <div class="input-group rounded">
                      <a href='/addsubmition'><button class="rounded-5"> <span><RiAddCircleFill color="green" fontSize="1.5em"/> Create Submition Type</span></button></a> &nbsp;&nbsp;&nbsp;
                        <button class="rounded-5"> <span><HiRefresh color="green" fontSize="1.5em"/> Reshresh</span></button>
                      </div>
                    </div>
                    <div className="col-md-3 ms-auto mt-0">
                      <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"
                        name="searchQuery" onChange={this.handleSearchArea}></input>
                        <span class="input-group-text border-0" id="search-addon">
                          <i class="fas fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </div>
    
                  <hr className='mt-4' style={{height:3+"px"}}/>

                  <div class="table-wrapper-scroll-y my-custom-scrollbar mt-4">
                    <table class="table table-bordered table-striped mb-0">
                      <thead style={{color:"white", backgroundColor:"#28282B"}}>
                        <tr>
                            <th>No</th>
                            <th>Submition Title</th>
                            <th>Started Date</th>
                            <th>Deadline</th>
                            <th>Submition Type</th>
                            <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                                  {this.state.submitionTypes.map((submitionTypes, index)=>(
                                          <tr>
                                                <td>{index +1}</td>
                                                <td>{submitionTypes.submitionTitle}</td>
                                                <td>{submitionTypes.submitionStartedDate}</td>
                                                <td>{submitionTypes.deadline}</td>
                                                <td>{submitionTypes.submitionType}</td>
                                                <td>
                                            <button onClick={()=>{this.onUpdate(submitionTypes._id)}}>Edit</button> &nbsp;
                                            <button onClick={()=>{this.onDelete(submitionTypes._id)}}>Delete</button> &nbsp;
                                            </td>
                                          </tr>
                                    ))}
                              </tbody>
                  </table>
                  </div>
    
                  </div>
                </div>
              </div>
              </div>
          </div>
        </div>
    )
  }
}
