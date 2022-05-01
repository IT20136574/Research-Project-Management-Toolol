import axios from 'axios';
import React, { Component } from 'react'

export default class UpdateStudentDetails extends Component {

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

    handleInputChange = (e)=>{
        const{name,value} = e.target;
        this.setState({
           ...this.state,
           [name]:value
        })
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

    onSubmit = (e)=>{
  
        e.preventDefault();
        const id = this.props.match.params.id;
        
        const{name, nic, student_id, faculty, batch, specialization, phone, DOB, email, status, imageUrl} = this.state;
        const data = {
            name:name,
            nic:nic,
            student_id:student_id,
            faculty:faculty,
            batch:batch,
            specialization:specialization,
            phone:phone,
            DOB:DOB,
            email:email,
            status:status,
            imageUrl:imageUrl
           
        }
       
        //console.log(data)
        axios.put(`http://localhost:8070/viewRole/updateStudent/${id}`,data).then((res)=>{
           
           if(res.data){      
             
            this.setState({
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
             })
             //window.location.href = '/student';  
             console.log("update Successful")
          }
        }).catch((error)=>{
           console.log(error)
        })
     }

     onBack(){
         window.location.href="/student"
     }
  render() {
    return (
      <div>
        <from>
            Name : <input type="text" name='name' value={this.state.name} onChange={this.handleInputChange}/> <br/><br/>
            nic : <input type="text" name='nic' value={this.state.nic} onChange={this.handleInputChange}/> <br/><br/>
            student_id : <input type="text" name='student_id' value={this.state.student_id} onChange={this.handleInputChange}/> <br/><br/>
            faculty : <input type="text" name='faculty' value={this.state.faculty} onChange={this.handleInputChange}/> <br/><br/>
            batch : <input type="text" name='batch' value={this.state.batch} onChange={this.handleInputChange}/> <br/><br/>
            specialization : <input type="text" name='specialization' value={this.state.specialization} onChange={this.handleInputChange}/> <br/><br/>
            phone : <input type="text" name='phone' value={this.state.phone} onChange={this.handleInputChange}/> <br/><br/>
            DOB : <input type="text" name='DOB' value={this.state.DOB} onChange={this.handleInputChange}/> <br/><br/>
            Email : <input type="text" name='email' value={this.state.email} onChange={this.handleInputChange}/> <br/><br/>
            status : <input type="text" name='status' value={this.state.status} onChange={this.handleInputChange}/> <br/><br/>
            <button onClick={this.onBack}>back</button> &nbsp; <button onClick={this.onSubmit}>submit</button>
        </from>
      </div>
    )
  }
}
