import React, { Component } from 'react'
import axios from 'axios';
import {HiRefresh} from "react-icons/hi"
import { FiAlertTriangle } from 'react-icons/fi';
import {Modal} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import {toast} from 'react-toastify';
export default class PanalMemberMgtPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            staffMembers:[],
            header : "Panal Member",
            show: false,
            id: ""
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
        const role = this.props.match.params.role

        //console.log(role)
        axios.get(`http://localhost:8070/viewRole/view/${role}`).then(res =>{
                if(res.data.success){
                    this.setState({
                        staffMembers:res.data.selectedStaff
                    });
                    console.log("Data fletch success")
                    //console.log(this.state.staffMembers)
                }else{
                    console.log("Data fletch error")
                }
        }).catch((error)=>{
            console.log(error)
        })
    }

    filterData(staffMembers,searchKey){
      const result = staffMembers.filter((staffMembers) =>
          staffMembers.fname.toLowerCase().includes(searchKey) ||
          staffMembers.staffid.toLowerCase().includes(searchKey) ||
          staffMembers.lname.toLowerCase().includes(searchKey)
      )
      this.setState({staffMembers : result})
    }
    
    handleSearchArea = (e)=> {
    const searchKey = e.currentTarget.value;
    const role = this.props.match.params.role
    axios.get(`http://localhost:8070/viewRole/view/${role}`).then(res =>{
         if(res.data.success){
                this.filterData(res.data.selectedStaff,searchKey)
             };
         }
     )
    }

    onView(id){
        window.location.href=`/showpanalMem/${id}`
    }

    onDelete(id){
          axios.delete(`http://localhost:8070/viewRole/deleteStaff/${id}`).then((res)=>{
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
        window.location.href=`/updatepanalMem/${id}`
    }
  render() {
    return (
      <div className='alignMarginN'>
      <div class="container">
          <div class="main-body">
  
          <div class="col-md-12">
            <div class="card mb-2 mt-4" style={{width:94+"%",boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
              <div class="card-body">
                <center><h3 className="fw-bold mb-0">{this.state.header} Management</h3></center>
                <div className='row mt-3'>
                  <div className="col-md-4 mt-0">
                    <div class="input-group rounded">
                    <button class="btn btn-info" style={{marginLeft:"1rem"}} onClick={()=>{window.location.reload()}} > <span><HiRefresh color="white" fontSize="1.5em"/> &nbsp; Refresh Table</span></button>                    </div>
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
              <th>Full Name</th>
              <th>Staff ID</th>
              <th>Field</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
              </thead>
                <tbody>
                  {this.state.staffMembers.map((staffMembers,index)=>(
                    <tr>
                      <th>{index +1}</th>
                      <td>{staffMembers.fname+" "+ staffMembers.lname}</td>
                      <td>{staffMembers.staffid}</td>
                      <td>{staffMembers.field}</td>
                      <td>{staffMembers.email}</td>
                      <td style={{textAlign:"center"}}>
                      {/* &nbsp;<button onClick={()=>{this.onView(staffMembers._id)}}>View</button> &nbsp;
                        <button onClick={()=>{this.onUpdate(staffMembers._id)}}>Edit</button> &nbsp;
                        <button onClick={()=>{this.onDelete(staffMembers._id)}}>Delete</button> &nbsp; */}
                          <button type="button" onClick={()=>{this.onView(staffMembers._id)}} class="btn btn-outline-dark btn-floating"><i class="fa fa-eye" style={{color:"green"}} ></i></button>&nbsp;&nbsp;
                          <button type="button" onClick={()=>{this.onUpdate(staffMembers._id)}} class="btn btn-outline-dark btn-floating"><i class="fa fa-pencil" style={{color:"blue"}}></i></button>&nbsp;&nbsp;
                          <button type="button" onClick={()=>{this.showModal(staffMembers._id)}} class="btn btn-outline-dark btn-floating"><i class="fa fa-trash" style={{color:"red"}}></i></button>
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
