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


handleInputChange = (e) => {
  const {name,value} = e.target;
  this.setState({
      ...this.state,
      [name]:value
  })
}
    

onSubmit = id => e =>{
  
    e.preventDefault();

  const { marks} = this.state;

  const data = {marks:marks};
  // console.log(data);

    axios.post(`http://localhost:8070/staff/docmark/${id}`,data ).then(res=>{
      
            alert("DocumentMarks send successfull")
            window.location.reload();
          
    }).catch((err)=>{
        alert("error with marks giving")
    })

  }



  render() {


    return (
          <div>
              <NavBar/>
              <br/><br/><br/><br/>
            <div className="pt-0" align="center" background color="red">
            <div className="shadow col-md-11 mt-8 mx-auto" id="cardcol">
              
              <div className="card-header py-3">
              <h1 className="m-0 font-weight-bold text-dark" id="rs">Evaluate Documents</h1><br/>
    </div>     
      <div className="container-sm">
          <table className="table table-hover" style={{marginTop:'40px', background: "#F0FFFF" }} >
        <thead>
          <tr bgcolor="#D5D6EA">
            <th scope="col">No</th>
            <th scope="col">Group Name</th>
            <th scope="col">Submission Title</th>
            <th scope="col">Submitted Documents</th>
            <th scope="col">Eveluation Marks</th>
                      
            
          </tr>
        </thead>
         <tbody>
          {this.state.submis.map((submis,index)=>(
              <tr>
  
                <th scope="row">{index+1}</th>
                <td>{submis.group_name}</td>
                <td>{submis.submitionTitle}</td>
                <td>
                <a href={submis.fileUrl}>
              <button style={{width:"8rem"}}  type="button" class="btn btn-primary btn-floating">
                <i class="fas fa-download"></i>
              </button>
                </a>
                </td>
                <td>               
                <form onSubmit={this.onSubmit(submis._id)}>    
                            <input type="text"
                                    className="form-control"
                                    style={{width:"12rem"}}
                                    name="marks"
                                    placeholder="marks"
                                    value={this.setState.marks}
                                    onChange={this.handleInputChange} required/>
                                  
                               <br/>
                                <button type="submit" style={{width:"10rem", align:"center"}}   class="btn btn-success btn-rounded">Allocate Marks</button>
                                    <br/><br/>
                                   
                                  </form>
                  
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

