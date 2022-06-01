import React, { Component } from 'react'
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';

export default class PanalMemberMgtPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            staffMembers:[],
            header : "Panal Member"
        };
    }

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
        <div className='alignMargin'>
          <center>
        <div>
            <h2>{this.state.header} Management</h2>
        </div>
    <table className="table align-middle mb-0 bg-white" style={{width:80+"%"}}>
      <thead className="table-dark">
        <tr>
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
                <td>
                &nbsp;<button class="btn btn-light" onClick={()=>{this.onView(staffMembers._id)}}><AiIcons.AiFillEye color="green" fontSize="1.5em"/></button> &nbsp;
                <button class="btn btn-light" onClick={()=>{this.onUpdate(staffMembers._id)}}><AiIcons.AiFillEdit  fontSize="1.5em"/></button> &nbsp;
                <button class="btn btn-light" onClick={()=>{this.onDelete(staffMembers._id)}}><AiIcons.AiFillDelete color="red" fontSize="1.5em"/></button> &nbsp;
                </td>
               </tr>                                  
            ))}                    
          </tbody>
    </table>
    </center>
  </div>
    )
  }
}
