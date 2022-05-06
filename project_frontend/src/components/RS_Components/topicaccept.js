import React, {Component} from "react";
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RefreshIcon from '@material-ui/icons/Refresh';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Button from '@material-ui/core/Button';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import {saveAs} from 'file-saver';

export default class Home extends Component{


    componentDidMount(){
        this.retrievetopics();
      }
      
      
        retrievetopics(){
          axios.get("http://localhost:8070/topics/displaytopics").then(res=>{
      
           if(res.data.success){
             this.setState({
               topics:res.data.existingtopics
               
             });
      
             console.log(this.state.topics);
           }
          });
        }
      




        render(){


            return(
        
              <div>
        
              
              <br/>
        
        
                <div className="pt-0" align="center" background color="red">
                  <div className="shadow col-md-11 mt-8 mx-auto" id="cardcol">
                    
                    <div className="card-header py-3">
                    <h1 className="m-0 font-weight-bold text-dark" id="rs"> Topics </h1><br/>
        
          </div>
              
              
            <div className="container-sm">
             
        
              <div className="row">
                <div className="col-md-8 mt-4 mx-auto">
        
                </div>
                <div className="card-body">
              <div className = "col-md-8 mt-4 mx-auto"></div>
        
                {/* <div className="col-md- ms-auto">
                  <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  name="searchQuery"
        
                  onChange={this.handleSearchArea}>
        
                  </input>
                </div> */}
              </div>
             
              <br/>
              {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
      
              {/* <Button className="mt-4 mx-auto" type="submit" style={{background: "#B4CFEC", width: 15+"%", align:"right"}} startIcon={<RefreshIcon/>}  onClick={this.refreshPage}> 
              Refresh</Button>     */}
        
              {/* <Button className="col-md-8 mt-4 mx-right" type="submit"style={{background: "#B4CFEC", width: 25+"%", align:"right"}} startIcon={<InsertDriveFileIcon/>}  onClick={this.generateReport}> 
              Generate Report</Button>&nbsp; &nbsp; */}
            
              <table className="table table-hover" style={{marginTop:'40px', background: "#F0FFFF" }} >
              <thead>
                <tr bgcolor="#D5D6EA">
                  <th scope="col">No</th>
                  <th scope="col">Title</th>
                  <th scope="col">PublishDate</th>
                  <th scope="col">Description</th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.topics.map((topics,index)=>(
                    <tr>
        
                      <th scope="row">{index+1}</th>
                      <td>
                          <a href={`/topics/${topics._id}`} style={{textDecoration:'none'}}>
                          {topics.title}
                          </a>
                          </td>
        
                      <td>{topics.publishdate}</td>
                      <td>{topics.description}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
                      
                      
                      <td>
                      <Button className ="form-group" type="submit"style={{background: "#C3FDB8", width: 7+"%", align:"center"}} startIcon={<EditSharpIcon/>} href={`/adupdate/${ads._id}`}>
                        </Button>
        
                        &nbsp;
                        <Button className ="form-group" type="submit"style={{background: "#F75D59", width: 7+"%", align:"center"}} startIcon={<DeleteForeverSharpIcon/>} onClick={() =>this.onDelete(ads._id)}> </Button>
                      </td>
                    </tr>
                   
        
                ))}
                
              </tbody>
              
         </table>
         
         </div>
         <br/><br/>
        </div></div></div><br/><br/><br/><br/>
        </div>
        
        
           
            )}

}