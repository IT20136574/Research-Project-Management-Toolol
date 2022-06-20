import axios from 'axios';
import { Button } from 'bootstrap';
import React, { Component } from 'react';
import React, { Component } from 'react';
import NavBar from '../RS_Components/NavBarPanal';

export default class PanelMemberTopics extends Component {

    constructor(props){
        super(props)
        this.state ={
            grps:[],
           
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
      await axios.get("http://localhost:8070/staff/desplaypanalgroups", config).then((res)=>{
          
          if(res.data.status){
              this.setState({
    
                grps : res.data.groups,
                               
              });
              console.log(this.state.grps);
             
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
  
          <div className="pt-0" align="center" background color="red">
            <div className="shadow col-md-11 mt-8 mx-auto" id="cardcol">
              
              <div className="card-header py-3">
              <h1 className="m-0 font-weight-bold text-dark" id="rs"> Student Research Groups </h1><br/>
    </div>     
      <div className="container-sm">
    
        <div className="row">
          <div className="col-md-10 mt-10 mx-auto">
          </div>
          <div className="card-body">
        <div className = "col-md-8 mt-4 mx-auto"></div>
        </div> 
        <table className="table table-hover" style={{marginTop:'40px', background: "#F0FFFF" }} >
        <thead>
          <tr bgcolor="#D5D6EA">
            <th scope="col">No</th>
            <th scope="col">Group NAme</th>
            <th scope="col">Research Topic</th>
            <th scope="col">Field</th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
            
          </tr>
        </thead>
        <tbody>
          {this.state.grps.map((grps,index)=>(
              <tr>
  
                <th scope="row">{index+1}</th>
                <td>
                    <a href={`/group/${grps._id}`} style={{textDecoration:'none'}}>
                    {grps.group_name}
                    </a>
                    </td>
  
                <td>{grps.researchTopic_Info[0].research_Topic}</td>

                <td>{grps.researchTopic_Info[0].field}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              </tr>
             
  
          ))}
          
        </tbody>
        
   </table>
   
   </div>
   <br/><br/>
  </div></div></div><br/><br/><br/><br/>
  </div>
    )
  }
}
