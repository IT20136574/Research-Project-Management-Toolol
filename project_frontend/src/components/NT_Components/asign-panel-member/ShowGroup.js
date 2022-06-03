import axios from 'axios';
import React, { Component } from 'react'
import "../../../asserts/IT20167028.css"
import {HiRefresh} from "react-icons/hi"
export default class ShowGroup extends Component {
    constructor(props){
        super(props);
        this.state={
            groups:[]
        }
    }
    componentDidMount(){
        this.getGroups();
    }

    onRedirectAddPanel(id){
      window.location.href=`/addpanel/${id}`
    }

    getGroups(){
        const status = this.props.match.params.status
        console.log(status)

        axios.get(`http://localhost:8070/panalmember/fletchgroups/${status}`).then(res=>{
            if(res.data.success){
              this.setState({
                groups : res.data.selectedgroups
              })
              console.log(this.state.groups)
            }
          }).catch((e)=>{
            console.log(e)
          })
    }

    filterData(groups,searchKey){
      const result = groups.filter((groups) =>
          groups.group_name.toLowerCase().includes(searchKey)
      )
      this.setState({groups:result})
  }

    

    handleSearchArea = (e)=> {
      const searchKey = e.currentTarget.value;
      const status = this.props.match.params.status
      axios.get((`http://localhost:8070/panalmember/fletchgroups/${status}`).then(res =>{
           if(res.data.success){
                  this.filterData(res.data.selectedgroups,searchKey)
               };
           }
       ))
   }


    render() {
    return (
    //   <div className='alignMargin'>
    //       <h2>Panal Member Asign</h2>
    //   <table border="1">
    //     <thead>
          // <tr>
          //   <th>No</th>
          //   <th>Group Name</th>
          //   <th>Research Topic</th>
          //   <th>Research Field</th>
          //   <th>Topic Status</th>
          //   <th>Tags</th>
          //   <th>Actions</th>
          // </tr>
    //     </thead>
            // <tbody>
            //   {this.state.groups.map((groups,index)=>(
            //     <tr>
            //       <th>{index +1}</th>
            //       <td>{groups.group_name}</td>
            //       <td>{groups.researchTopic_Info[0].research_Topic}</td>
            //       <td>{groups.researchTopic_Info[0].field}</td>
            //       <td>{groups.researchTopic_Status}</td>
            //       <td>{groups.researchTopic_Info[0].tags}</td>

            //       <td>
            //       &nbsp;<button onClick={()=>this.onRedirectAddPanel(groups._id)}>Asign Panal Member</button> &nbsp;

            //       </td>
            //      </tr>                                  
            //   ))}
                                      
            // </tbody>
    //   </table>
    // </div>

    <div className='alignMarginN'>
    <div class="container">
        <div class="main-body">

        <div class="col-md-12">
          <div class="card mb-2 mt-4" style={{width:94+"%"}}>
            <div class="card-body">
              <center><h3 className="fw-bold mb-0">Allocate Panels</h3></center>
              <div className='row mt-3'>
                <div className="col-md-4 mt-0">
                  <div class="input-group rounded">
                    <button class="rounded-5"> <span><HiRefresh color="green" fontSize="1.5em"/> Reshresh</span></button>
                  </div>
                </div>
                <div className="col-md-3 ms-auto mt-0">
                  <div class="input-group rounded">
                    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"
                    name="searchQuery" onChange={this.handleSearchArea}></input>
                    <span class="input-group-text border-0" id="search-addon">
                      <i class="fas fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>

              <hr className='mt-4' style={{height:3+"px"}}/>

              <div class="table-wrapper-scroll-y my-custom-scrollbar mt-4">
                  <table class="table table-bordered table-striped mb-0">
                    <thead style={{color:"white", backgroundColor:"#28282B"}}>
                      <tr>
                        <th>No</th>
                        <th>Group Name</th>
                        <th>Research Topic</th>
                        <th>Research Field</th>
                        <th>Topic Status</th>
                        <th>Tags</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.groups.map((groups,index)=>(
                        <tr>
                          <th>{index +1}</th>
                          <td>{groups.group_name}</td>
                          <td>{groups.researchTopic_Info[0].research_Topic}</td>
                          <td>{groups.researchTopic_Info[0].field}</td>
                          <td>{groups.researchTopic_Status}</td>
                          <td>{groups.researchTopic_Info[0].tags}</td>

                          <td>
                          &nbsp;<button onClick={()=>this.onRedirectAddPanel(groups._id)}>Asign Panal Member</button> &nbsp;

                          </td>
                        </tr>                                  
                      ))}                      
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
    )
  }
}
