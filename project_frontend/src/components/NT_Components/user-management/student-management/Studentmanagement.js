import React, { Component } from 'react'
import axios from 'axios'
import * as AiIcons from 'react-icons/ai';
import {HiRefresh} from "react-icons/hi"
import {RiAddCircleFill} from "react-icons/ri"
export default class Studentmanagement extends Component {
  constructor(props){
    super(props);

    this.state={
      students:[],
      header:"Student"
    }
  }

  componentDidMount(){
    axios.get("http://localhost:8070/viewRole/view").then(res=>{
      if(res.data.success){
        this.setState({
          students : res.data.showStudents
        })
        //console.log(this.state.students)
      }
    }).catch((e)=>{
      console.log(e)
    })
  }

  filterData(students,searchKey){
    const result = students.filter((students) =>
        students.name.toLowerCase().includes(searchKey) ||
        students.student_id.toLowerCase().includes(searchKey)
    )
    this.setState({students : result})
  }
  
  handleSearchArea = (e)=> {
  const searchKey = e.currentTarget.value;
  axios.get("http://localhost:8070/viewRole/view").then(res =>{
       if(res.data.success){
              this.filterData(res.data.showStudents,searchKey)
           };
       }
   )
  }

  onDelete(id){
    if(window.confirm("Are you sure to delete this?")){
      axios.delete(`http://localhost:8070/viewRole/deleteStudent/${id}`).then((res)=>{
        if(res.data){
          console.log("delete success!")
          // window.location.reload();
        }
      }).catch((e)=>{
        console.log(e)
      })

    }
  }

  onView(id){
    window.location.href=`/showstudent/${id}`
  }

  onUpdate(id){
    window.location.href=`/upstudent/${id}`
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
                  <button class="btn btn-info" style={{marginLeft:"1rem"}} onClick={()=>{window.location.reload()}} > <span><HiRefresh color="white" fontSize="1.5em"/> &nbsp; Refresh Table</span></button>                  </div>
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
             <th>#No</th>
              <th>Name</th>
              <th>STudent ID</th>
              <th>Faculty</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
              {this.state.students.map((students,index)=>(
                      <tr>
                        <th>{index +1}</th>
                        <td>{students.name}</td>
                        <td>{students.student_id}</td>
                        <td>{students.faculty}</td>
                        <td>{students.specialization}</td>
                        <td>{students.status}</td>
                        <td style={{textAlign:"center"}}>
                        {/* &nbsp;<button onClick={()=>{this.onView(students._id)}}>view</button> &nbsp;
                          <button onClick={()=>{this.onUpdate(students._id)}}>edit</button> &nbsp;
                          <button onClick={()=>{this.onDelete(students._id)}}>delete</button> &nbsp; */}
                            <button type="button" onClick={()=>{this.onView(students._id)}} class="btn btn-outline-dark btn-floating"><i class="fa fa-eye" style={{color:"green"}} ></i></button>&nbsp;&nbsp;
                            <button type="button" onClick={()=>{this.onUpdate(students._id)}} class="btn btn-outline-dark btn-floating"><i class="fa fa-pencil" style={{color:"blue"}}></i></button>&nbsp;&nbsp;
                            <button type="button" onClick={()=>{this.onDelete(students._id)}} class="btn btn-outline-dark btn-floating"><i class="fa fa-trash" style={{color:"red"}}></i></button>
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
