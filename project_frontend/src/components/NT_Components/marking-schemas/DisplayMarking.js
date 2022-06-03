import axios from 'axios'
import React, {useState, useEffect} from 'react'

export default function DisplayMarking() {
    const [markings, setmarkings] = useState([])

    useEffect(() => {
      axios.get("http://localhost:8070/marking/getMarkings").then((res)=>{
          if(res.data){
              setmarkings(res.data.markings)
          }
      })
    }, [])

    onDelete = (id) =>{
        if(window.confirm("Are you sure to delete this?")){
            axios.delete(`http://localhost:8070/marking/deleteMarking/${id}`).then((res)=>{
              if(res.data){
                console.log("delete success!")
                 window.location.reload();
              }
            }).catch((e)=>{
              console.log(e)
            })
        }
    }

    onUpdate = (id) =>{
        window.location.href=`/updateMarking/${id}`
    }
    
  return (
    // <div>
    //       <table border="2px">
    //           <thead>
                  // <th>No</th>
                  // <th>Marking Title</th>
                  // <th>Display Title</th>
                  // <th>Description</th>
                  // <th>File</th>
                  // <th>Action</th>
    //           </thead>
              // <tbody>
              //     {markings.map((markings, index)=>(
              //             <tr>
              //                   <td>{index +1}</td>
              //                   <td>{markings.mTittle}</td>
              //                   <td>{markings.DTittle}</td>
              //                   <td>{markings.discription}</td>
              //                   <td><a href={markings.fileUrl}> File </a></td>
              //                   <td>
              //               <button onClick={()=>{this.onUpdate(markings._id)}}>Edit</button> &nbsp;
              //               <button onClick={()=>{this.onDelete(markings._id)}}>Delete</button> &nbsp;
              //               </td>
              //             </tr>
              //       ))}
              // </tbody>
    //       </table>
          
    //   </div>
    
    <div class="table-wrapper-scroll-y my-custom-scrollbar mt-4">
    <table class="table table-bordered table-striped mb-0">
      <thead style={{color:"white", backgroundColor:"#28282B"}}>
        <tr>
            <th>No</th>
            <th>Marking Title</th>
            <th>Display Title</th>
            <th>Description</th>
            <th>File</th>
            <th>Action</th>
        </tr>
      </thead>
      <tbody>
                  {markings.map((markings, index)=>(
                          <tr>
                                <td>{index +1}</td>
                                <td>{markings.mTittle}</td>
                                <td>{markings.DTittle}</td>
                                <td>{markings.discription}</td>
                                <td><a href={markings.fileUrl}> File </a></td>
                                <td>
                            <button onClick={()=>{this.onUpdate(markings._id)}}>Edit</button> &nbsp;
                            <button onClick={()=>{this.onDelete(markings._id)}}>Delete</button> &nbsp;
                            </td>
                          </tr>
                    ))}
              </tbody>
  </table>
  </div>
  )
}
