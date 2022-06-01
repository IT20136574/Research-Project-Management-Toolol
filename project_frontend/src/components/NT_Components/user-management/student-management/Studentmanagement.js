import React, { Component } from 'react'
import axios from 'axios'
import * as AiIcons from 'react-icons/ai';
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
    window.location.href=`/updatestudent/${id}`
  }

  render() {
    return (
      <div className='alignMargin'>
        <div>
            <h2>{this.state.header} Management</h2>
        </div>
        <div class="table-wrapper-scroll-y my-custom-scrollbar">

        <table class="table table-bordered table-striped mb-0" style={{width:80+"%"}}>
          <thead className="table-dark">
          <tr>
              <th>No</th>
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
                    <td>
                    &nbsp;<button class="btn btn-light" onClick={()=>{this.onView(students._id)}}><AiIcons.AiFillEye color="green" fontSize="1.5em"/></button> &nbsp;
                      <button class="btn btn-light" onClick={()=>{this.onUpdate(students._id)}}><AiIcons.AiFillEdit  fontSize="1.5em"/></button> &nbsp;
                      <button class="btn btn-light" onClick={()=>{this.onDelete(students._id)}}><AiIcons.AiFillDelete color="red" fontSize="1.5em"/></button> &nbsp;
                    </td>
                   </tr>                                  
                ))}

          </tbody>
        </table>

        </div>
      </div>
    )
  }
}
