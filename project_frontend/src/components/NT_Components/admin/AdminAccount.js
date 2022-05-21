// import React from 'react'

// function AdminAccount(){
//     c

//     adminLogout(){
//         if (window.confirm('Are you sure you wish to logout from this Account?')) {
//         localStorage.removeItem('Authorization')
//         alert("log out complete")
//         window.location = "/"
//         }
//       }
    
//     return (
//       <button onClick={adminLogout}>Admin Logout</button>
//     )

// }
// export default AdminAccount;

import axios from 'axios'
import React, { Component } from 'react'

export default class AdminAccount extends Component {
    constructor(props){
        super(props)
        this.state ={
        fname: "",
        lname: "",
        username: "",
        pno: "",
        nic: "",
        sliitid: "",
        email: "",
        imageUrl: "",
        }
    }
    componentDidMount(){
        this.getAdminDetails()
    }

    async getAdminDetails(){
        try{
            const config = {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                 }
            }   
        await axios.get("http://localhost:8070/admin//profile", config).then((res)=>{
            //console.log(res.data)
            if(res.data.success){
                this.setState({
                    fname: res.data.admin1.fname,
                    lname: res.data.admin1.lname,
                    username: res.data.admin1.username,
                    pno: res.data.admin1.pno,
                    nic: res.data.admin1.nic,
                    sliitid: res.data.admin1.sliitid,
                    email: res.data.admin1.email,
                    imageUrl: res.data.admin1.imageUrl
                })
                //console.log(this.state)
            }
        })
            

        }catch(error){
            console.log(error.message)
        }
        
    }

    async deleteAdmin(){
        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization")
             }
        }

        if (window.confirm('Are you sure you wish to delete this Account?')) {
            await axios.delete('http://localhost:8070/admin/delete', config)
            .then((res) => {
              localStorage.removeItem('Authorization')
              alert("Admin Account delete successfull")
              window.location="/"
            })
            .catch((err) => {
              console.log(err.message)
            })
          }
    }

    adminLogout(){
        if (window.confirm('Are you sure you wish to logout from this Account?')) {
            localStorage.removeItem('Authorization')
            alert("log out complete")
            window.location = "/"
        }
    }

    adminRegister(){
        window.location.href="/regadmin"
    }

    updateAdmin(){
        window.location.href="/updateadmin/"
    }
  render() {
    return (
      <div>
          
          <p>imageUrl : {this.state.imageUrl}</p>
          <p>Fname : {this.state.fname}</p>
          <p>Lname : {this.state.lname}</p>
          <p>Username : {this.state.username}</p>
          <p>NIC : {this.state.nic}</p>
          <p>phone No : {this.state.pno}</p>
          <p>SliitID : {this.state.sliitid}</p>
          <p>email : {this.state.email}</p><br/>
          <button onClick={this.adminRegister}>Admin Register</button> &nbsp;
          <button onClick={this.updateAdmin}>Edit</button> &nbsp;
          <button onClick={this.deleteAdmin}>Delete</button> &nbsp;
          <button onClick={this.adminLogout}>Admin Logout</button>
          

      </div>
    )
  }
}
