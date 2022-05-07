import axios from 'axios';
import React, { Component } from 'react'

export default class DisplaytopicDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            researchTopic_Info:[]
        }
    }

    async componentDidMount() {
        const config = {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        };
    
        await axios.get('http://localhost:8070/staff/desplaysupertopics', config)
        .then((res) => {
            console.log(res.data)
          this.setState({researchTopic_Info:res.data.showstudent_groups.researchTopic_Info})
        })
        .catch((err) => {
          alert(err.message)
        })
      }

    // onBack(){
    //     window.location.href="/student"
    // }

    render() {
        return (
         
            <div>
                       
                            <div>
                    <div>
                    <div>
                        <center><h4>
                        Registerd Group Members
                        </h4></center>
                            
                           
                        </div>
                        <table className="table table-hover" style={{marginTop:'40px', background: "#F0FFFF" }} >
                            <thead>
                                <tr bgcolor="#D5D6EA">
                                <th scope="col">No</th>
                                <th scope="col">student_id</th>
                                <th scope="col">name</th>
                                <th scope="col">email</th>
                               

                                </tr>
                            </thead>  
                            
                        </table>
                    </div>
            </div>
                            
            </div>     
          
    
        )
    
    }
}