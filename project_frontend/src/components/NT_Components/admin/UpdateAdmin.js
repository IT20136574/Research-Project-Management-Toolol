import axios from 'axios'
import React, { Component } from 'react'

export default class UpdateAdmin extends Component {
    constructor(props){
        super(props)
        this.state ={
        fname: "",
        mname: "",
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

    handleInputChange = (e)=>{
        const{name,value} = e.target;
        this.setState({
           ...this.state,
           [name]:value
        })
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
            if(res.data){
                this.setState({
                    fname: res.data.admin1.fname,
                    mname: res.data.admin1.mname,
                    lname: res.data.admin1.lname,
                    username: res.data.admin1.username,
                    pno: res.data.admin1.pno,
                    nic: res.data.admin1.nic,
                    sliitid: res.data.admin1.sliitid,
                    email: res.data.admin1.email,
                    imageUrl: res.data.admin1.imageUrl
                })
                console.log(this.state)
            }
        })

        }catch(error){
                console.log(error.message)
        }
    }

    onSubmit =(e)=>{
        e.preventDefault();
        const{fname, mname, lname, username, pno, nic, email, password, imageUrl,cpassword,sliitid} = this.state
        const updateadmin ={
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
        console.log(updateadmin)
        const config = {
            headers: {
                Authorization: localStorage.getItem("Authorization")
             }
        } 

        axios.put("http://localhost:8070/admin/update",updateadmin, config).then((res)=>{
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
                // console.log("update success")
                alert("update success")
                window.location.href="/adminaccount"
           }
        }).catch((e)=>{
            console.log(e)
        })

    }

    onBack(){
        window.location.href="/adminaccount"
    }

  render() {
    return (
      <div>
        <form>
            fname : <input type="text" name="fname" onChange={this.handleInputChange} value={this.state.fname}/><br/><br/>
            mname : <input type="text" name="mname" onChange={this.handleInputChange} value={this.state.mname}/><br/><br/>
            lname : <input type="text" name="lname" onChange={this.handleInputChange} value={this.state.lname}/><br/><br/>
            username : <input type="text" name="username" onChange={this.handleInputChange} value={this.state.username}/><br/><br/>
            SLIIT tid : <input type="text" name="sliitid" onChange={this.handleInputChange} value={this.state.sliitid}/><br/><br/>
            phone no : <input type="text" name="pno" onChange={this.handleInputChange} value={this.state.pno}/><br/><br/>
            nic : <input type="text" name="nic" onChange={this.handleInputChange} value={this.state.nic}/><br/><br/>
            email : <input type="text" name="email" onChange={this.handleInputChange} value={this.state.email}/><br/><br/>
            imageUrl : <input type="text" name="imageUrl" onChange={this.handleInputChange} value={this.state.imageUrl}/><br/><br/>

           
        </form>
            <button onClick={this.onBack}>Cancle</button> &nbsp;
            <button onClick={this.onSubmit}>Save</button>
      </div>
    )
  }
}
