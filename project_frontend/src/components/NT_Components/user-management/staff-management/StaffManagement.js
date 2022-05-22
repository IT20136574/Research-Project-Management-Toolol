import axios from 'axios';
import React, { Component } from 'react'

export default class StaffManagement extends Component {
    constructor(props){
        super(props);
        this.state = {
            staffMembers:[],
            header : ""
        };
    }

    componentDidMount(){
        const role = this.props.match.params.role


        switch(role){
            case "co-supervisor" :
                    this.setState({
                        header: "Co-Supervisor"
                    })
                    break
            case "supervisor" :
                this.setState({
                    header: "Supervisor"
                })
                break
            case "panal_member" :
                this.setState({
                    header: "Panal Member"
                })
                break
            default : 
            this.setState({
                header: ""
            })
            break
        }

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

    onView(id,role){
        window.location.href=`/showstaff/${id}`
    }

    onDelete(id){
        if(window.confirm("Are you sure to delete this?")){
          axios.delete(`http://localhost:8070/viewRole/deleteStaff/${id}`).then((res)=>{
            if(res.data){
              console.log("delete success!")
              // window.location.reload();
            }
          }).catch((e)=>{
            console.log(e)
          })
    
        }
      }

    onUpdate(id){
        window.location.href=`/updatestaff/${id}`
    }
    
  render() {
    return (
        <div>
            <div>
                <h2>{this.state.header} Management</h2>
            </div>
        <table border="1">
          <thead>
            <tr>
              <th>No</th>
              <th>Full Name</th>
              <th>Staff ID</th>
              <th>userName</th>
              <th>nic</th>
              <th>Field</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
              <tbody>
                {this.state.staffMembers.map((staffMembers,index)=>(
                  <tr>
                    <th>{index +1}</th>
                    <td>{staffMembers.fname+" "+ staffMembers.lname}</td>
                    <td>{staffMembers.staffid}</td>
                    <td>{staffMembers.username}</td>
                    <td>{staffMembers.nic}</td>
                    <td>{staffMembers.field}</td>
                    <td>{staffMembers.email}</td>
                    <td>{staffMembers.phone}</td>
                    <td>
                    &nbsp;<button onClick={()=>{this.onView(staffMembers._id)}}>View</button> &nbsp;
                      <button onClick={()=>{this.onUpdate(staffMembers._id)}}>Edit</button> &nbsp;
                      <button onClick={()=>{this.onDelete(staffMembers._id)}}>Delete</button> &nbsp;
                    </td>
                   </tr>                                  
                ))}
                                        
              </tbody>
        </table>
      </div>
    )
  }
}
