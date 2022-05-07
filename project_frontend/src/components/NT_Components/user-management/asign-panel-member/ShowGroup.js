import axios from 'axios';
import React, { Component } from 'react'

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
    render() {
    return (
      <div>
          <h2>Panal Member Asign</h2>
      <table border="1">
        <thead>
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
    )
  }
}
