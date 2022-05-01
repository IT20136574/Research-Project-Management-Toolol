import axios from 'axios';
import React, { Component } from 'react'

export default class DisplayStaffMember extends Component {
    constructor(props){
        super(props);
        this.state = {
            fname:"",
            lname:"",
            email:"",
            username:"",
            nic:"",
            field:"",
            phone:"",
            description:"",
            profileImage:"",
            Role:""
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
 
        axios.get(`http://localhost:8070/viewRole/staffview/${id}`).then((res)=>{
            console.log(res.data)
            if(res.data.success){
                this.setState({
                    fname:res.data.staff.fname,
                    lname:res.data.staff.lname,
                    email:res.data.staff.email,
                    username:res.data.staff.username,
                    nic:res.data.staff.nic,
                    field:res.data.staff.field,
                    phone:res.data.staff.phone,
                    description:res.data.staff.description,
                    profileImage:res.data.staff.profileImage,
                    Role:res.data.staff.role
                })
                //console.log(this.state.role)
            }
        }).catch((e)=>{
            console.log(e)
        })
    }

  render() {
    return (
      <div>
          <p>Fname : {this.state.fname}</p>
          <p>Lname : {this.state.lname}</p>
          <p>username : {this.state.username}</p>
          <p>Email : {this.state.email}</p>
          <p>nic : {this.state.nic}</p>
          <p>field : {this.state.field}</p>
          <p>phone : {this.state.phone}</p>
          <p>description : {this.state.description}</p>
          <p>profileImage : {this.state.profileImage}</p>
          <p>profileImage : {this.state.Role}</p>

         <a href={`/staff/${this.state.Role}`}><button>Back</button></a>
      </div>
    )
  }
}
