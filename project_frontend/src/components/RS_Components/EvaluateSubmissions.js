import axios from 'axios';
import React, { Component } from 'react'
import NavBar from './NavBar';


export default class EvaluateSubmissions extends Component {
  constructor(props){
    super(props)
    this.state ={
        submis:[],
       
    }
}

componentDidMount(){
    this.getGroupDetailes()
}


async getGroupDetailes(){
  try{
      const config = {
          headers: {
              Authorization: localStorage.getItem("Authorization")
           }
      }   
  await axios.get("http://localhost:8070/staff/desplaypanalsubmis", config).then((res)=>{
      
      if(res.data.status){
          this.setState({

            submis : res.data.file_Info
            
                           
          });
          console.log(this.state.submis);
         
      }
  });

  }catch(error){
      console.log(error.message)
  }   
}

    


  render() {


    return (
          <div>
              <NavBar/>
                 <br/><br/><br/><br/>
          submis
                 </div>   
    )
  }
}

