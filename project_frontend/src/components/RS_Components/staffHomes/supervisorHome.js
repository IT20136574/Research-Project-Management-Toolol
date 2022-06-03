import axios from 'axios';
import React, { Component } from 'react'
import NavBar from '../NavBar';


export default class SupervisorHome extends Component {
  
  constructor(props){
    super(props)
    this.state ={
        researchs:[],
               
    }
}

componentDidMount(){
    this.getResearchDetailes()
}


async getResearchDetailes(){
  try{
      const config = {
          headers: {
              Authorization: localStorage.getItem("Authorization")
           }
      }   
  await axios.get("http://localhost:8070/staff/desplaysupertopics", config).then((res)=>{
      
      if(res.data.status){
          this.setState({

            researchs : res.data.researchTopic_Info
                               
          });
          // console.log(this.state.researchs);
         
      }
  });

  }catch(error){
      console.log(error.message)
  }   
}


//  onAccept = (id) => {
  
//   const config = {
//     headers: {
//         Authorization: localStorage.getItem("Authorization"),
//      },
// }; 

//   if (window.confirm('Are you sure you wish to accept this Research Topic?')) {
   
//   axios.post(`http://localhost:8070/staff/addstatusAccept/${id}`,config).then((res) =>{
//     console.log(config);
//       alert("Topic Accepted Successfully");
      
//    })
//   }
// };


onAccept = (id) =>{
  
  const config = {
    headers: {
        Authorization: localStorage.getItem("Authorization")
     }
}   

  if (window.confirm('Are you sure you wish to accept this Research Topic?')) {
   
    axios.get(`http://localhost:8070/staff/addstatusAccept/${id}`, config).then((res)=>{
      
              alert('Topic Accepted Successfully');
              window.location.reload();     
                 
      });
  };
};



onReject = (id) => {
  if (window.confirm('Are you sure you wish to Rejected this Research Topic?')) {
  axios.post(`http://localhost:8070/staff/addstatusReject/${id}`).then((res) =>{
      alert("Topic Rejected Successfully");
      this.getResearchDetailes();
  })
  }
}


// onBack(){
//     window.location.href="/student"
// }

render() {
  
    return (

        <div>

          <NavBar/>
            <br/><br/>

          <table className="table table-hover" style={{marginTop:'40px', background: "#F0FFFF" }} >
        <thead>
          <tr bgcolor="#D5D6EA">
            <th scope="col">No</th>
            <th scope="col">Group Name</th>
            <th scope="col">Research Topic</th>
            <th scope="col">field</th>
            <th scope="col">tags</th>
            
            
            <th scope="col">Actions</th>
          </tr>
        </thead>
         <tbody>
          {this.state.researchs.map((researchs,index)=>(
              <tr>
  
                <th scope="row">{index+1}</th>
                <td>{researchs.group_name}</td>
                <td>{researchs.research_Topic}</td>
                <td>{researchs.field}</td>
                <td>{researchs.tags}</td>
                

                <td>
                    <button type="button" class="btn btn-success btn-rounded" onClick={() =>this.onAccept(researchs._id)}>Accept</button>
                    
                  &nbsp;
                  <button type="submit" class="btn btn-danger" onClick={() =>this.onReject(researchs._id)}>Reject</button> 
                  
                </td>
              </tr>
             
  
          ))}
          
        </tbody> 
         
   </table>

                   
                       
                        
        </div>     
      

    )

}
}