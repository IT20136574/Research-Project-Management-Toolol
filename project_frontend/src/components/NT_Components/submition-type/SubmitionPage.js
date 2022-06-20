import React, { Component } from 'react'
import {HiRefresh} from "react-icons/hi"
import {RiAddCircleFill} from "react-icons/ri"
import { FiAlertTriangle } from 'react-icons/fi';
import {Modal} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import {toast} from 'react-toastify';

export default class SubmitionPage extends Component {
  constructor(props){
    super(props);
    this.state = {
        submitionTypes : [],
        show: false,
        id:""
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
}
showModal = (id) => {
  this.setState({ 
    show: true,
    id:id
   });

};

hideModal = () => {
  this.setState({ show: false });
};

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

filterData(submitionTypes,searchKey){
  const result = submitionTypes.filter((submitionTypes) =>
      submitionTypes.submitionTitle.toLowerCase().includes(searchKey)||
      submitionTypes.submitionType.toLowerCase().includes(searchKey)
  )
  this.setState({submitionTypes:result})
}

handleSearchArea = (e)=> {
const searchKey = e.currentTarget.value;
axios.get(`http://localhost:8070/submition/getSubmition`).then(res =>{
     if(res.data.success){
            this.filterData(res.data.submitions,searchKey)
         };
     }
 )
}

onDelete(id){
        axios.delete(`http://localhost:8070/submition/deleteSubmition/${id}`).then((res)=>{
          if(res.data){
            this.setState({ show: false });
            toast.error('Delete Successful..!',{position:toast.POSITION.TOP_Right});
            window.setTimeout(function() {
              window.location.reload();
          }, 2000) 
          }
        }).catch((e)=>{
          console.log(e)
        })
  }

onUpdate(id){
    window.location.href=`/updatesubmition/${id}`
}
  render() {
    return (
        <div className='alignMarginN'>
        <div class="container">
            <div class="main-body">
    
            <div class="col-md-12">
              <div class="card mb-2 mt-4" style={{width:94+"%",boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
                <div class="card-body">
                  <center><h3 className="fw-bold mb-0">Submission Types</h3></center>
                  <div className='row mt-3'>
                    <div className="col-md-6 mt-0">
                      <div class="input-group rounded">
                      <a href='/addsubmition'><button class="btn btn-primary"> <span><RiAddCircleFill color="white" fontSize="1.5em"/> &nbsp; Create Submissions Type</span></button></a>
                      <button class="btn btn-info" style={{marginLeft:"0.5rem"}} onClick={()=>{window.location.reload()}} > <span><HiRefresh color="white" fontSize="1.5em"/> &nbsp; Refresh Table</span></button>

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
                        <tr style={{textAlign:"center"}}>
                            <th>No</th>
                            <th>submissions Title</th>
                            <th>Started Date</th>
                            <th>Deadline</th>
                            <th>submissions Type</th>
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
                                                {
                                                    submitionTypes.submitionType === "Presentation" &&
                                                        <div>
                                                            <td><i class="fa fa-file-powerpoint" aria-hidden="true" style={{color:"red", fontSize:"40px"}}></i>  File Type</td>
                                                        </div> 
                                                }

                                                {
                                                    submitionTypes.submitionType === "PDF" &&
                                                        <div>
                                                            <td><i class="fa fa-file-pdf" aria-hidden="true" style={{color:"red", fontSize:"40px"}}></i>  File Type</td>
                                                        </div> 
                                                }

                                                {
                                                    submitionTypes.submitionType === "Word" &&
                                                        <div>
                                                            <td> <i class="fa fa-file-word" aria-hidden="true" style={{color:"blue", fontSize:"40px"}}></i>  File Type</td>
                                                        </div> 
                                                }
                                                                        <td style={{textAlign:"center"}}>
                                                {/* <button type="button" onClick={()=>{this.onUpdate(submitionTypes._id)}} class="btn btn-primary btn-rounded"><i class="fa fa-pencil"></i></button>&nbsp;&nbsp;
                                                <button type="button" onClick={()=>{this.onDelete(submitionTypes._id)}} class="btn btn-danger btn-rounded"><i class="fa fa-trash"></i></button> */}
                                                
                                                <button type="button" onClick={()=>{this.onUpdate(submitionTypes._id)}} class="btn btn-outline-dark btn-floating"><i class="fa fa-pencil" style={{color:"blue"}}></i></button>&nbsp;&nbsp;
                                                <Button type="button" onClick={()=>{this.showModal(submitionTypes._id)}} variant="btn btn-outline-dark btn-floating"><i class="fa fa-trash" style={{color:"red"}}></i></Button>
                                            
                                            </td>
                                          </tr>
                                    ))}
                              </tbody>
                  </table>
                  </div>
                  <Modal show={this.state.show} onHide={this.hideModal} >
                  <Modal.Body>
                    <center>
                    <FiAlertTriangle color="red" fontSize="3em" /><br/>
                      <b>Are you sure?</b><br/>
                      Do you really want to delete this file.<br/>
                      This file cannot be restore

                      </center>
                      </Modal.Body>
                      <Modal.Footer >
                      <div className="mx-auto">
                      <Button variant="danger" onClick={()=>{this.onDelete(this.state.id)}} style={{width: 170+"px"}}>
                        Delete
                      </Button> &nbsp; &nbsp;
                        <Button variant="success" onClick={this.hideModal} style={{width: 170+"px"}}>
                        Cancel
                        </Button>
                        </div>
                      </Modal.Footer>
                    </Modal>
    
                  </div>
                </div>
              </div>
              </div>
          </div>
        </div>
    )
  }
}
