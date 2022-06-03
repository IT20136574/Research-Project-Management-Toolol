import axios from 'axios';
import React, { Component } from 'react'
import NavBar from '../RS_Components/NavBar';


export default class EvaluateMarks extends Component {
    constructor(props){
        super(props);
        
        this.state={
             submis:[],
        }
    }
    
    componentDidMount(){
      this.retriveSubmitions();
    }
    
    
    retriveSubmitions(){
      axios.get("http://localhost:8070/staff/getsubmitions").then(res =>{
        if(res.data.success){
          this.setState({
            submis:res.data.exitingsubmitions
          });

          console.log(this.state.submis)
        }
      });
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

