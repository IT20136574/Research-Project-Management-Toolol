import React, { Component } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify';
export default class AddPanalMember extends Component {
    constructor(props){
        super(props);
        this.onChangepanelMember1 = this.onChangepanelMember1.bind(this);
        this.onChangepanelMember2 = this.onChangepanelMember2.bind(this);
        this.state ={
            specificPmembers1:[],
            topicfiled : "",
            panelmemberId1:"",
            panelmemberId2:"",
            groupName:"",
            topic:""
        }
    }

    componentDidMount(){
        this.getSpecificGroup();
    }
    async getSpecificGroup(){
        var id = this.props.match.params.id
         axios.get(`http://localhost:8070/panalmember/getuniuegroup/${id}`).then((res)=>{
            //console.log(res.data.group.researchTopic_Info[0].field)
            console.log(res.data)
            if(res.data.success){
                this.setState({
                    topicfiled :  res.data.group.researchTopic_Info[0].field,
                    groupName : res.data.group.group_name,
                    topic : res.data.group.researchTopic_Info[0].research_Topic
                })
                //console.log(this.state.topicfiled)
            }
            this.getSpecificPanalMembers();
        }).catch((e)=>{
            console.log(e)
        })
    }



   getSpecificPanalMembers(){
        // console.log(this.state.topicfiled)
        const field = this.state.topicfiled
        console.log(field)
        axios.get(`http://localhost:8070/panalmember/fletchpanels/${field}`).then((res)=>{
            console.log(res.data)
            if(res.data.success){
                this.setState({
                    specificPmembers1 : res.data.selectedstaff,
                    specificPmembers2 : res.data.selectedstaff
                })
            }else{
                console.log("Panel members fletch erorr")
            }
        }).catch((e)=>{
            console.log(e)
        })
    }

    handleInputChange = (e) =>{
        const {name,value} = e.target;
 
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    onChangepanelMember1(e) {
        let id1 = e.target.options[e.target.selectedIndex].value
        console.log(id1)

        this.setState({
            panelmemberId1: id1,
         })
    }
    onChangepanelMember2(e) {
        let id2 = e.target.options[e.target.selectedIndex].value
        console.log(id2)
        this.setState({
            panelmemberId2: id2,
         })
    }


    onsubmit = (e)=>{
        e.preventDefault();
        var id = this.props.match.params.id
        console.log(id)
        const{panelmemberId1,panelmemberId2} = this.state
        const data = {
            pmember1 : panelmemberId1,
            pmember2 : panelmemberId2
        }
        console.log(data)
        if(!(panelmemberId1 === panelmemberId2)){
            axios.post(`http://localhost:8070/panalmember/addPanelMembers/${id}`,data).then((res)=>{
                toast.success('Panel Members Allocated',{position:toast.POSITION.TOP_Right});
                window.setTimeout(function() {
                    window.location.href=`/showgroups/${"Accepted"}`
                }, 3000)   
                
            }).catch((e)=>{
                alert(e)
            })
        }else{
            toast.warn('You Select Same Panel Members',{position:toast.POSITION.TOP_Right});
        }
    }

  render() {
    return (
    <div className='alignMarginN'>
    <div class="container">
        <div class="main-body">

        <div class="col-md-12">
          <div class="card mb-2 mt-4" style={{width:94+"%",boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
            <div class="card-body">
              <center><h3 className="fw-bold mb-0">Allocate Panel Members</h3></center>
              <hr className='mt-4 mb-5' style={{height:3+"px"}}/>
              <form onSubmit={this.onsubmit}>

              <div className="row">
                        <div className="col-md-12 mb-2">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="groupName" id="groupName" value={this.state.groupName} placeholder="Group Name" readOnly/>
                            <label for="floatingInput">Group Name</label>
                        </div>
                        </div>
                </div>

                <div className="row">
                        <div className="col-md-12 mb-2">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="topic" id="topic" value={this.state.topic} placeholder="Topic" readOnly/>
                            <label for="floatingInput">Topic</label>
                        </div>
                        </div>
                </div>

                <div className="row">
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                        <select className="form-control" required="required" id="gender" placeholder="Gender"  name="gender" onChange={this.onChangepanelMember1}>
                        <option selected> Select Panel Member 01</option>
                                {this.state.specificPmembers1.map((specificPmembers1) => (
                                    <option key={specificPmembers1._id} value={specificPmembers1._id}>
                                        {specificPmembers1.fname+" "+specificPmembers1.lname}
                                    </option>
                                ))}
                        </select>
                        </div>
                        </div>

                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                        <select className="form-control" required="required" id="gender" placeholder="Gender"  name="gender" onChange={this.onChangepanelMember2}>
                                <option selected> Select Panel Member 02</option>
                                    {this.state.specificPmembers1.map((specificPmembers1) => (
                                        <option key={specificPmembers1._id} value={specificPmembers1._id}>
                                    {specificPmembers1.fname+" "+specificPmembers1.lname}
                                </option>

                                ))}
                        </select>
                        </div>
                        </div>
                        </div>
        
                        <div className='mt-4'>
                            <center> <a href='/showgroups/Accepted'><input class='btn btn-info' type="button" value="Cancel" style={{width: 15+"%"}}/></a> &nbsp;&nbsp;&nbsp;<input type="reset" class="btn btn-warning" value="Reset" style={{width:150+"px"}}/> &nbsp;&nbsp; <input type="submit" class="btn btn-primary" value="Allocate" style={{width:150+"px"}}/></center>
                        </div>
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
