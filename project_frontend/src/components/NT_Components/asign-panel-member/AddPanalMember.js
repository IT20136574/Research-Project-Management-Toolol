import React, { Component } from 'react'
import axios from 'axios'

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
                alert(res.data.status)
                window.location.href=`/showgroups/${"Accepted"}`
            }).catch((e)=>{
                alert(e)
            })
        }else{
            console.log("you same panel members")
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
              <div class="form-group row float-left">
                        
                            <label class="col-sm-2 col-form-label">Group Name :</label>
                            <input type="text" class="form-control w-50" name="orgCategoryName" value={this.state.groupName}  required readOnly/>
                            
                        </div><br/>
                            
                        <div class="form-group row float-left">
                            <label class="col-sm-2 col-form-label float-left">Research Topic :</label>
                            <input type="text" class="form-control w-50" name="orgCategoryName" value={this.state.topic}  readOnly/>
                            
                        </div><br/>      
                    <div class="form-group row">
                                <label class="col-sm-2 col-form-label float-left">Panel Member 02 :</label>
                                {/* <input type="Select" class="form-control w-50" name="orgCategoryName" required /> */}
                                <select class="form-select w-50" aria-label="Default select example" onChange={this.onChangepanelMember1} required>
                                <option selected> Select Panel Member 01</option>
                                {this.state.specificPmembers1.map((specificPmembers1) => (
                               <option key={specificPmembers1._id} value={specificPmembers1._id}>
                                {specificPmembers1.fname+" "+specificPmembers1.lname}
                            </option>
                  ))}
                        </select>  
                            
                        </div><br/>
                        <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Panel Member 02 :</label>
                                <select class="form-select w-50" aria-label="Default select example" onChange={this.onChangepanelMember2} required>
                                <option selected> Select Panel Member 02</option>
                                {this.state.specificPmembers1.map((specificPmembers1) => (
                                <option key={specificPmembers1._id} value={specificPmembers1._id}>
                                    {specificPmembers1.fname+" "+specificPmembers1.lname}
                                </option>

                        ))}
                        </select>  
                            
                        </div><br/>
                        <div className='mt-4'>
                            <center><input type="reset" class="btn btn-warning" value="Reset" style={{width:150+"px"}}/> &nbsp;&nbsp; <input type="submit" class="btn btn-primary" value="Submit" style={{width:150+"px"}}/></center>
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
