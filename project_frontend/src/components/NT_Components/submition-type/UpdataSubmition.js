import axios from 'axios';
import React, { Component } from 'react'

export default class UpdataSubmition extends Component {
    constructor(props){
        super(props);
        this.state = {
            submitionTitle : "",
            submitionStartedDate : "",
            deadline : "",
            discription : "",
            submitionType : ""

        }
    }

    handleInputChange = (e)=>{
        const{name,value} = e.target;
        this.setState({
           ...this.state,
           [name]:value
        })
     }

     componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`http://localhost:8070/submition/getSubmition/${id}`).then((res)=>{
            //console.log(res.data)
            if(res.data.success){
                this.setState({
                    submitionTitle : res.data.submitions.submitionTitle,
                    submitionStartedDate : res.data.submitions.submitionStartedDate,
                    deadline : res.data.submitions.deadline,
                    discription : res.data.submitions.discription,
                    submitionType : res.data.submitions.submitionType
                })
                //console.log(this.state)
            }
        }).catch((e)=>{
            console.log(e)
        })
    }

    onSubmit = (e)=>{
  
        e.preventDefault();
        const id = this.props.match.params.id;
        
        const{
            submitionTitle,
            submitionStartedDate,
            deadline,
            discription,
            submitionType
        } = this.state;

        const data = {
            submitionTitle : submitionTitle,
            submitionStartedDate : submitionStartedDate,
            deadline : deadline,
            discription: discription,
            submitionType : submitionType
           
        }
        //console.log(data)
       
       
        axios.put(`http://localhost:8070/submition/update/${id}`,data).then((res)=>{
        //console.log(res.data)
           if(res.data){ 
            this.setState({
                submitionTitle : "",
                submitionStartedDate : "",
                deadline : "",
                discription : "",
                submitionType : ""
             })
             window.location.href = '/submition';  
             alert("update Successful")
          }
        }).catch((error)=>{
           console.log(error)
        })
     }

  render() {
    return (
    //     <div className='alignMargin'>
    //     <h2>Update Submition Type</h2>
    //    <form method='POST' onSubmit={this.onSubmit}>
    //         <label>Submition Title : </label> &nbsp;
    //         <input type="text" name="submitionTitle" value={this.state.submitionTitle} onChange={this.handleInputChange} required/><br/><br/>

    //         <label>Submition Started Date : </label> &nbsp;
    //         <input type="text" name="submitionStartedDate"  value={this.state.submitionStartedDate} onChange={this.handleInputChange} required/><br/><br/>

    //         <label>Deadline : </label> &nbsp;
    //         <input type="text" name="deadline" value={this.state.deadline} onChange={this.handleInputChange} required/><br/><br/>

    //         <label>Discription : </label> &nbsp;
    //         <input type="text" name="discription" value={this.state.discription} onChange={this.handleInputChange} required/><br/><br/>

    //         <label>Submition Type : </label> &nbsp;
    //         <select name="submitionType" value={this.state.submitionType} onChange={this.handleInputChange}>
    //             <option>choose file type</option>
    //             <option valure="pdf">PDF</option>
    //             <option valure="ptr">Presentaion</option>
    //             <option valure="word">word</option>
    //         </select><br/><br/>

    //         <input type="submit" value="submit"/>
    //     </form>

    // </div>

    <div className='alignMarginN'>
    <div class="container">
        <div class="main-body">
        <div class="col-md-12">
          <div class="card mb-2 mt-5" style={{width:94+"%",boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
            <div class="card-body">
            <h4 className="fw-bold mb-1">Update Submission Type</h4><br/>
            <form method='POST' onSubmit={this.onSubmit}>
            <div className="row">
                    <div className="col-md-12 mb-2">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" name="submitionTitle" id="submitionTitle" placeholder="Submission Title" value={this.state.submitionTitle} onChange={this.handleInputChange} required="true"/>
                        <label for="floatingInput">Submission Title</label>
                    </div>
                    </div>
            </div>
   

            <div class="form-floating mb-3">
                      <textarea id="floatingInput" name="discription" style={{height: "100px"}} type="text"  class="form-control" placeholder="Description"  value={this.state.discription} onChange={this.handleInputChange} required/>
                      <label for="floatingInput">Description</label>
             </div>

            <div className="row">
                    <div className="col-md-4 mb-2">
                    <div class="form-floating mb-2">
                        <input type="date" class="form-control" name="submitionStartedDate" id="submitionStartedDate" placeholder="Started Date" value={this.state.submitionStartedDate} onChange={this.handleInputChange}   required/>
                        <label for="floatingInput">Started Date</label>
                    </div>
                    </div>
                    <div className="col-md-4 mb-2">
                    <div class="form-floating mb-2">
                        <input type="date" class="form-control" name="deadline" id="deadline" placeholder="Deadline" value={this.state.deadline} onChange={this.handleInputChange} required/>
                        <label for="floatingInput">Deadline</label>
                    </div>
                </div>

                <div className="col-md-4 mb-2">
                    <div class="form-floating mb-2">
                    <select className="form-control" required="required" id="submitionType" placeholder="Submission Type"  name="submitionType" value={this.state.submitionType} onChange={this.handleInputChange}>
                        <option selected>Submission Type</option>
                        <option value="PDF">PDF</option>
                        <option value="Presentation">Presentaion</option>
                        <option value="Word">Word</option>
                    </select>
                    </div>
                </div>
            </div>
            
            <center>
                <div className='mt-4'>
                    <a href='/submition'><input class='btn btn-info' type="button" value="Cancel" style={{width: 15+"%"}}/></a> &nbsp;&nbsp;&nbsp;
                    <input class='btn btn-warning' type="reset" value="Reset" style={{width: 15+"%"}}/> &nbsp;&nbsp;&nbsp;
                    <input class='btn btn-primary' type="submit" value="Update Submission" style={{width: 15+"%"}}/> 
                </div>
            </center>
            
            </form>
              

          </div>
        </div>
      </div>


        </div>
    </div>
</div>
    )
  }
}
