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
        }
    }

    componentDidMount(){
        this.getSpecificGroup();
    }
    async getSpecificGroup(){
        var id = this.props.match.params.id
         axios.get(`http://localhost:8070/panalmember/getuniuegroup/${id}`).then((res)=>{
            //console.log(res.data.group.researchTopic_Info[0].field)
            if(res.data.success){
                this.setState({
                    topicfiled :  res.data.group.researchTopic_Info[0].field
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

        this.setState({
            panelmemberId1: id1,
         })
    }
    onChangepanelMember2(e) {
        let id2 = e.target.options[e.target.selectedIndex].value

        this.setState({
            panelmemberId2: id2,
         })
    }


    onsubmit = (e)=>{
        var id = this.props.match.params.id
        // console.log(id)
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
      <div>
          <h1>Add Panal Member</h1>
          Panal Member 01 : <select onChange={this.onChangepanelMember1}>
              <option selected> select panel member 01 </option>
              {this.state.specificPmembers1.map((specificPmembers1) => (
                               <option key={specificPmembers1._id} value={specificPmembers1._id}>
                                {specificPmembers1.fname+" "+specificPmembers1.lname}
                            </option>
                  ))}
          </select><br/><br/>

          Panal Member 02 : <select onChange={this.onChangepanelMember2}>
              <option selected> select panel member 02 </option>
              {this.state.specificPmembers1.map((specificPmembers1) => (
                <option key={specificPmembers1._id} value={specificPmembers1._id}>
                    {specificPmembers1.fname+" "+specificPmembers1.lname}
                </option>

                ))}
          </select><br/><br/>
          <button onClick={this.onsubmit}> Submit </button>
      </div>
    )
  }
}
