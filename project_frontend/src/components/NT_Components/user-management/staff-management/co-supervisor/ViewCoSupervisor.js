import axios from 'axios';
import React, { Component } from 'react'

export default class ViewCoSupervisor extends Component {
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
            Role:"",
            staffid:""
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
                    staffid:res.data.staff.staffid,
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
        <div className='alignMarginN'>
        <div class="container">
            <div class="main-body">
            <div class="col-md-12">
            <div class="card mb-2 mt-3" style={{width:94+"%",boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
                <div class="card-body">
                <h4 className="fw-bold mb-1">{this.state.fname} {this.state.lname}</h4><br/>

                <div className='row'>
                <div className="col-md-6 mb-2">
                    <div class="form-floating mb-2">
                        <ul>
                            <li>
                                Name : {this.state.fname} {this.state.lname}
                            </li>
                            <li>
                                NIC : {this.state.nic}
                            </li>
                            <li>
                                Staff ID : {this.state.staffid}
                            </li>
                            <li>
                                User Name : {this.state.username}
                            </li>
                            <li>
                                Email : {this.state.email}
                            </li>
                            <li>
                                Phone Number : {this.state.phone}
                            </li>
                            <li>
                                Description : {this.state.description}
                            </li>
                            <li>
                                Field : {this.state.field}
                            </li>
                            </ul>
                        </div>
                    </div>
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
