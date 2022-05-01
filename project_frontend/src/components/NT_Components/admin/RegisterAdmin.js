import axios from 'axios';
import React, { Component } from 'react'

export default class RegisterAdmin extends Component {
    constructor(props){
        super(props);
            this.state ={  
                fname : "",
                mname :"",
                lname :"",
                username :"",
                pno :"",
                sliitid:"",
                nic :"",
                email :"",
                password :"",
                cpassword :"",
                imageUrl : ""
        }
    }

    handleInputChange = (e)=>{
        const{name,value} = e.target;
        this.setState({
           ...this.state,
           [name]:value
        })
     }

    registerAdmin = (e) =>{
        e.preventDefault();
        const{fname, mname, lname, username, pno, nic, email, password, imageUrl,cpassword,sliitid} = this.state
        const newadmin ={
            fname : fname,
            mname : mname,
            lname : lname,
            username : username,
            sliitid : sliitid,
            pno : pno,
            nic : nic,
            email : email,
            password : password,
            cpassword : cpassword,
            imageUrl : imageUrl
        }
        console.log(newadmin)
        if(password === cpassword){
            axios.post("http://localhost:8070/admin/add",newadmin).then((res)=>{
                if(res.data){
                    this.setState({
                        fname : "",
                        mname :"",
                        lname :"",
                        username :"",
                        sliitid:"",
                        pno :"",
                        nic :"",
                        email :"",
                        password :"",
                        cpassword :"",
                        imageUrl : "" 
                    })
            
                    alert("admin register successful")
                    window.location.href = '/admin';
                }
        }).catch((err)=>{
            console.log('Admin Account Already Exsist Check Email or Username again');
        })
        }else{
            console.log("Password not match")
          }

    }
    onBack(){
        window.location.href="/adminaccount"
    }

  render() {
    return (
      <div>
          <h3>Admin Registration</h3>
            <form>
                fname : <input type="text" name="fname" onChange={this.handleInputChange} value={this.setState.fname}/><br/><br/>
                mname : <input type="text" name="mname" onChange={this.handleInputChange} value={this.setState.mname}/><br/><br/>
                lname : <input type="text" name="lname" onChange={this.handleInputChange} value={this.setState.lname}/><br/><br/>
                username : <input type="text" name="username" onChange={this.handleInputChange} value={this.setState.username}/><br/><br/>
                SLIIT tid : <input type="text" name="sliitid" onChange={this.handleInputChange} value={this.setState.sliitid}/><br/><br/>
                phone no : <input type="text" name="pno" onChange={this.handleInputChange} value={this.setState.pno}/><br/><br/>
                nic : <input type="text" name="nic" onChange={this.handleInputChange} value={this.setState.nic}/><br/><br/>
                email : <input type="text" name="email" onChange={this.handleInputChange} value={this.setState.password}/><br/><br/>
                password : <input type="text" name="password" onChange={this.handleInputChange} value={this.setState.password}/><br/><br/>
                confirm password : <input type="text" name="cpassword" onChange={this.handleInputChange} value={this.setState.cpassword}/><br/><br/>
                imageUrl : <input type="text" name="imageUrl" onChange={this.handleInputChange} value={this.setState.imageUrl}/><br/><br/>
                <input type="button" onClick={this.onBack} value="Back"/> &nbsp;
                <input type="submit" onClick={this.registerAdmin} value="submit"/>
            </form>
      </div>
    )
  }
}