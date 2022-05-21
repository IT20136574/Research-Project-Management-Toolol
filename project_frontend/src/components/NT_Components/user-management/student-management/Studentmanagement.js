import React, { Component } from 'react'
import axios from 'axios'
export default class Studentmanagement extends Component {
  constructor(props){
    super(props);

    this.state={
      students:[]
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
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>STudent ID</th>
              <th>Faculty</th>
              <th>Specialization</th>
              <th>Email</th>
              <th>Phone Number</th>
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
                    <td>{students.email}</td>
                    <td>{students.phone}</td>
                    <td>{students.status}</td>
                    <td>
                    &nbsp;<button onClick={()=>{this.onView(students._id)}}>View</button> &nbsp;
                      <button onClick={()=>{this.onUpdate(students._id)}}>Edit</button> &nbsp;
                      <button onClick={()=>{this.onDelete(students._id)}}>Delete</button> &nbsp;
                    </td>
                   </tr>                                  
                ))}
                                        
              </tbody>
        </table>
      </div>
    )
  }
}
