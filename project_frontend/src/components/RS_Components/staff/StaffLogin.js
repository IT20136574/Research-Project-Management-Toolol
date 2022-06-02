import axios from 'axios';
import React, { Component } from 'react'


export default class StaffLogin extends Component {

    constructor(props) {
        super(props);
        this.userLoginSubmit = this.userLoginSubmit.bind(this)
   
        this.state = {
          username: "",
          password: "",
          token: "",
          open: false
        }
      }
 
 
      async userLoginSubmit(e) {
        e.preventDefault()
        const userData = {
          username: this.state.username,
          password: this.state.password
        }
 
       
   
await axios.post("http://localhost:8070/staff/login",userData)
        .then((res) => {
            // console.log(res.data.staff1.role)
          this.setState({
            token: res.data.token,
           
          })
          if(res.data.staff1.role === "supervisor"){
            localStorage.setItem("Authorization", res.data.token)
            alert("loging complete");
            window.location.href = "/shome";

          }else if (res.data.staff1.role === "co-supervisor"){
            localStorage.setItem("Authorization", res.data.token)
            alert("loging complete");
            window.location.href = "/cosupHome";

          }else if(res.data.staff1.role === "panal_member"){
            localStorage.setItem("Authorization", res.data.token)
            alert("loging complete");
            window.location.href = "/panelHome";

          }else {
              console.log("login Error");
          }
        
          
         
        })
        .catch((err) => {
          console.log(err)
          this.setState({open: true})
          alert("loging error");
        })
      }



      


  render() {
    return (
      
      <div>
          <h1>staff login</h1>
          <form onSubmit={this.userLoginSubmit}>

            username : <input type="text" name='username' onChange={e => this.setState({ username: e.target.value })}/> <br/><br/>

            password : <input type="text" name='password' onChange={e => this.setState({ password: e.target.value })}/> <br/><br/>

            <input type="submit" value="Login"/>

          </form>
      </div>
    )
  }
}
