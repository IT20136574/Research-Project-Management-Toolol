import axios from 'axios';
import React, { Component } from 'react'
import NavBar from '../RS_Components/NavBarPanal';

export default class ShowSpecificGroupToPanael extends Component {
    constructor (props){
        super(props);
        this.state={
          
          grp:[],
          topicFeedback:""
        };
      }
      
      componentDidMount(){
        const id= this.props.match.params.id;
        axios.get(`http://localhost:8070/staff/group/${id}`).then((res)=>{
          if (res.data.success){
            this.setState({
              grp:res.data.group.groupMembers
            });
      
            console.log(this.state.grp);
          }
        });
      
      }
     
   handleInputChange = (e) => {
        const {name,value} = e.target;
        this.setState({
            ...this.state,
            [name]:value
        })
    }

  sendFeedback = (e) =>{
          e.preventDefault();
  
     var id = this.props.match.params.id 
      const { topicFeedback} = this.state;
  
        const data = {feedback:topicFeedback};
        // console.log(data);
      
          axios.post(`http://localhost:8070/staff/group/${id}`,data ).then(res=>{
            
                  alert("feedback send successfull")
                  window.location.reload();
                 
          }).catch((err)=>{
              alert("error with feedback")
          })
      
      }
      
      sendMarks = (e) =>{
        e.preventDefault();

   var id = this.props.match.params.id 
    const { marks} = this.state;

      const data = {marks:marks};
      // console.log(data);
    
        axios.post(`http://localhost:8070/staff/mark/${id}`,data ).then(res=>{
          
                alert("Marks send successfull")
                window.location.reload();
               
        }).catch((err)=>{
            alert("error with feedback")
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
              <h2 className="m-0 font-weight-bold text-dark" id="rs">Send  Topic Feedback </h2><br/>
    </div>     
                 
                 <div class="card">
              <div class="card-body">
               
                <form onSubmit={this.sendFeedback}>

                <div class="form-floating mb-3">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
                  name="topicFeedback"
                  value={this.setState.topicFeedback}
                  onChange={this.handleInputChange}></textarea>
                     <label for="floatingInput">Feedback</label>
                  </div>
              
             
                <button type="submit" class="btn btn-primary btn-block mb-4">Send</button>
              </form>
              </div><br/><br/><br/>
            </div>

               
                 
      </div>
      </div><br/><br/>


      <div className="pt-0" align="center" background color="red">
            <div className="shadow col-md-11 mt-8 mx-auto" id="cardcol">
              
              <div className="card-header py-3">
              <h2 className="m-0 font-weight-bold text-dark" id="rs">Evaluate presentations  </h2><br/>
    </div>     
    <div class="card">
              <div class="card-body">

              <div className="container-sm">
                    <div class="card">
              <div class="card-body">
               
                <form onSubmit={this.sendMarks}>

                <div class="form-floating mb-3">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
                  name="marks"
                  value={this.setState.marks}
                  onChange={this.handleInputChange}></textarea>
                     <label for="floatingInput">Overall Group Mark</label>
                  </div>
              
             
                <button type="submit" class="btn btn-primary btn-block mb-4">Send</button>
              </form>
              </div><br/><br/><br/>
            </div>
            
          <br/><br/>
         </div>
     </div>
     </div>
    </div><br/><br/><br/>
   </div>
      </div>
    )
  }
}
