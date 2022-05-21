import axios from 'axios';
import React, { Component } from 'react'

export default class DisplayStudentDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            nic:"",
            student_id:"",
            faculty:"",
            batch:"",
            specialization:"",
            phone:"",
            DOB:"",
            email:"",
            status:"",
            imageUrl:""

        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`http://localhost:8070/viewRole/stview/${id}`).then((res)=>{
            //console.log(res.data)
            if(res.data.success){
                this.setState({
                    name:res.data.student.name,
                    nic:res.data.student.nic,
                    student_id:res.data.student.student_id,
                    faculty:res.data.student.faculty,
                    batch:res.data.student.batch,
                    specialization:res.data.student.specialization,
                    phone:res.data.student.phone,
                    DOB:res.data.student.DOB,
                    email:res.data.student.email,
                    status:res.data.student.status,
                    imageUrl:res.data.student.imageUrl
                })
            }
        }).catch((e)=>{
            console.log(e)
        })
    }

    onBack(){
        window.location.href="/student"
    }

  render() {
    return (
      <div>
          <p>imageUrl : {this.state.imageUrl}</p>
          <p>name : {this.state.name}</p>
          <p>nic : {this.state.nic}</p>
          <p>student_id : {this.state.student_id}</p>
          <p>faculty : {this.state.faculty}</p>
          <p>batch : {this.state.batch}</p>
          <p>specialization : {this.state.specialization}</p>
          <p>phone : {this.state.phone}</p>
          <p>DOB : {this.state.DOB}</p>
          <p>email : {this.state.email}</p>
          <p>status : {this.state.status}</p>
          <button onClick={this.onBack}>Back</button>
      </div>
    )
  }
}
