import axios from 'axios';
import React, { Component } from 'react'
import NavBar from '../NavBar';


export default class SupervisorHome extends Component {
  
  constructor(props){
    super(props)
    this.state ={
        researchs:[],
        sid:""
               
    }
}

componentDidMount(){
    this.getResearchDetailes();
    
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

            researchs : res.data.researchTopic_Info.researchTopic_Info,
            sid : res.data.researchTopic_Info._id
                               
          });
          console.log(this.state.sid);
         
      }
  });

  }catch(error){
      console.log(error.message)
  }   
}



// async getUserDetailes(){
//   try{
//       const config = {
//           headers: {
//               Authorization: localStorage.getItem("Authorization")
//            }
//       }   
//   await axios.get("http://localhost:8070/staff/sprofile", config).then((res)=>{
      
//       if(res.data.status){
//           this.setState({

//             sid : res.data.staff1._id
                               
//           });
//           console.log(res.data);
         
//       }
//   });

//   }catch(error){
//       console.log(error.message)
//   }   
// }



 onAccept = (id1,id2) => {
  
  const config = {
    headers: {
        Authorization: localStorage.getItem("Authorization"),
     },
}; 

  if (window.confirm('Are you sure you wish to accept this Research Topic?')) {
   
  axios.post(`http://localhost:8070/staff/addstatusAccept/${id1}/${id2}`,config).then((res) =>{
    console.log(config);
      alert("Topic Accepted Successfully");
      
   })
  }
};


onReject = (id1,id2) => {
  
  const config = {
    headers: {
        Authorization: localStorage.getItem("Authorization"),
     },
}; 

  if (window.confirm('Are you sure you wish to accept this Research Topic?')) {
   
  axios.post(`http://localhost:8070/staff/addstatusReject/${id1}/${id2}`,config).then((res) =>{
    console.log(config);
      alert("Topic Rejected Successfully");
      
   })
  }
};





// onBack(){
//     window.location.href="/student"
// }

render() {
  
    return (

        <div>

          <NavBar/>
            <br/><br/><br/><br/>
            <div className="pt-0" align="center" background color="red">
            <div className="shadow col-md-11 mt-8 mx-auto" id="cardcol">
              
              <div className="card-header py-3">
              <h1 className="m-0 font-weight-bold text-dark" id="rs">Accept/Reject Topics </h1><br/>
    </div>     
      <div className="container-sm">
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
                    <button type="button" class="btn btn-success btn-rounded" onClick={() =>this.onAccept(researchs._id,this.state.sid)}>Accept</button>
                    
                  &nbsp;
                  <button type="submit" class="btn btn-danger" onClick={() =>this.onReject(researchs._id,this.state.sid)}>Reject</button> 
                  
                </td>
              </tr>
             
  
          ))}
          
        </tbody> 
         
   </table>
   <br></br>

   </div>
    </div>
     </div>          
                       
                        
        </div>     
      

    )

}
}