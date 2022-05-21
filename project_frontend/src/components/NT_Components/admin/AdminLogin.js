import axios from 'axios';
import React, { Component } from 'react'

export default class AdminLogin extends Component {
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
  
        
    
        await axios.post("http://localhost:8070/admin/login",userData)
        .then((res) => {
          this.setState({
            token: res.data.token
          })
          localStorage.setItem("Authorization", res.data.token)
          alert("loging complete");
          window.location = "/adminpage";
          
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
          <h3>Admin Login</h3>
          <form onSubmit={this.userLoginSubmit}>
            username : <input type="text" name='username' onChange={e => this.setState({ username: e.target.value })}/> <br/><br/>
            password : <input type="text" name='password' onChange={e => this.setState({ password: e.target.value })}/> <br/><br/>
            <input type="submit" value="Login"/>
          </form>
      </div>
    )
  }
}
