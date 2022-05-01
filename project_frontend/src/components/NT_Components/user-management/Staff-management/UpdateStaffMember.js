import axios from 'axios';
import React, { Component } from 'react'
export default class UpdateStaffMember extends Component {
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

    handleInputChange = (e)=>{
        const{name,value} = e.target;
        this.setState({
           ...this.state,
           [name]:value
        })
     }

    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`http://localhost:8070/viewRole/staffview/${id}`).then((res)=>{
            //console.log(res.data)
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
                //console.log(this.state)
            }
        }).catch((e)=>{
            console.log(e)
        })
    }

    onSubmit = (e)=>{
  
        e.preventDefault();
        const id = this.props.match.params.id;
        
        const{fname,lname,email,username,nic,field,phone,description,profileImage,Role} = this.state;
        const data = {
            fname:fname,
            lname:lname,
            email:email,
            username:username,
            nic:nic,
            field:field,
            phone:phone,
            description: description,
            profileImage:profileImage,
            Role:Role
           
        }
        console.log(data)
       
        //console.log(data)
        axios.put(`http://localhost:8070/viewRole/updateStaff/${id}`,data).then((res)=>{
           
           if(res.data){      
             
            this.setState({
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
             })
             //window.location.href = '/student';  
             console.log("update Successful")
          }
        }).catch((error)=>{
           console.log(error)
        })
     }
 
  render() {
    return (
        <div>
            fname : <input type="text" name='fname' value={this.state.fname} onChange={this.handleInputChange}/> <br/><br/>
            lname : <input type="text" name='lname' value={this.state.lname} onChange={this.handleInputChange}/> <br/><br/>
            email : <input type="text" name='email' value={this.state.email} onChange={this.handleInputChange}/> <br/><br/>
            username : <input type="text" name='username' value={this.state.username} onChange={this.handleInputChange}/> <br/><br/>
            nic : <input type="text" name='nic' value={this.state.nic} onChange={this.handleInputChange}/> <br/><br/>
            field : <input type="text" name='field' value={this.state.field} onChange={this.handleInputChange}/> <br/><br/>
            phone : <input type="text" name='phone' value={this.state.phone} onChange={this.handleInputChange}/> <br/><br/>
            description : <input type="text" name='description' value={this.state.description} onChange={this.handleInputChange}/> <br/><br/>
            profileImage : <input type="text" name='profileImage' value={this.state.profileImage} onChange={this.handleInputChange}/> <br/><br/>
            Role : <input type="text" name='Role' value={this.state.Role} onChange={this.handleInputChange}/> <br/><br/>

            <a href={`/staff/${this.state.Role}`}><button>Back</button></a> &nbsp; <button onClick={this.onSubmit}>Save</button>
      </div>
    )
  }
}

