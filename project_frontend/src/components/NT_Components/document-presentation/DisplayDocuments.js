import axios from 'axios';
import React, { Component } from 'react'

export default class DisplayDocuments extends Component {
    constructor(props){
        super(props);
        this.state={
            Documents : []
        }
    }
    componentDidMount(){
        axios.get("http://localhost:8070/document/getDocument").then((res)=>{
            if(res.data.success){
                this.setState({
                    Documents : res.data.documents
                })
                console.log(this.state.Documents)
            }
        })
    }

    onDelete(id){
        if(window.confirm("Are you sure to delete this?")){
          axios.delete(`http://localhost:8070/document/deleteDocument/${id}`).then((res)=>{
            if(res.data){
              console.log("delete success!")
              window.location.reload();
            }
          }).catch((e)=>{
            console.log(e)
          })
    
        }
      }

    onUpdate(id){
        window.location.href=`/updateDoc/${id}`
    }
  
  render() {
    return (
        <div>
            <h3>Document</h3>
            <table border="1">
            <thead>
                <tr>
                <th>No</th>
                <th>Document Name</th>
                <th>Display Title</th>
                <th>File Type</th>
                <th>File</th>
                <th>Actions</th>
                </tr>
            </thead>
                <tbody>
                    {this.state.Documents.map((Documents,index)=>(
                    <tr>
                        <th>{index +1}</th>
                        <td>{Documents.docname}</td>
                        <td>{Documents.displaytitle}</td>
                        <td>{Documents.type}</td>
                        {
                            Documents.type === "Presentaion" &&
                                <div>
                                    <td><a href={Documents.fileUrl}>Pesentation</a></td>
                                </div> 
                        }

                        {
                            Documents.type === "PDF" &&
                                <div>
                                    <td><a href={Documents.fileUrl}>pdf</a></td>
                                </div> 
                        }

                        {
                            Documents.type === "word" &&
                                <div>
                                    <td><a href={Documents.fileUrl}>word</a></td>
                                </div> 
                        }

                        <td>
                        <button onClick={()=>{this.onUpdate(Documents._id)}}>Update</button> &nbsp;
                        <button onClick={()=>{this.onDelete(Documents._id)}}>Delete</button> 
                        </td>
                    </tr>                                  
                    ))}
                                            
                </tbody>
            </table>
        </div>
    )
  }
}
