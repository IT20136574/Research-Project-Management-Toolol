import React,{Component} from "react";
import axios from 'axios';



export default class StdLogin extends Component {
    constructor(props) {
      super(props);
      this.userLoginSubmit = this.userLoginSubmit.bind(this)
      this.handleClose = this.handleClose.bind(this)
  
      this.state = {
        student_id: "",
        pwd: "",
        token: "",
        open: false
      }
    }
 
 
    async userLoginSubmit(e) {
      e.preventDefault()
      const userData = {
        student_id: this.state.student_id,
        pwd: this.state.pwd
      }
 
      
  
      await axios.post("http://localhost:8070/student/login",userData)
      .then((res) => {
        this.setState({
          token: res.data.token
        })
        localStorage.setItem("Authorization", res.data.token)
       // window.location = "/home1"
        alert('loging successfull');
      })
      .catch((err) => {
        console.log(err)
        this.setState({open: true})
        alert('loging unsucces',err);
      })
    }
  
    handleClose(reason) {
      if (reason === 'clickaway') {
       return;
      }
      this.setState({open: false})
   };
 
   
 
    render() {
      return (
        
             
             <div>

                    <form onSubmit={this.userLoginSubmit} name="form"> 

                      <label  >Student ID</label>
                      <input  type="text" name="username" placeholder="Enter your student_id" onChange={e => this.setState({ student_id: e.target.value })} required/> <br/><br/> 
                      <label  >Password</label> 
                      <input  type="password" name="password" placeholder="Enter your Password" onChange={e => this.setState({ pwd: e.target.value })} required/> 
                      <br/>   
                        
                      <button type="submit" >Login</button> 
                      
                        
                    </form>
             
              <center><label >Not Registered?</label> </center>
              <center><li><a href="/signup" >Sign Up</a></li></center>
              
            
              </div>
         

    
      )
    }
  }
