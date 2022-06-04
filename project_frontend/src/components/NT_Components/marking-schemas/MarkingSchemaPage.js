import React from 'react'
import {HiRefresh} from "react-icons/hi"
import {RiAddCircleFill} from "react-icons/ri"
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Modal} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import {FiAlertTriangle} from 'react-icons/fi'

export default function MarkingSchemaPage() {
  const [markings, setmarkings] = useState([])
  const [show, setShow] = useState(false);
  const [id, setid] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true)
    setid(id)
  };

  useEffect(() => {
    axios.get("http://localhost:8070/marking/getMarkings").then((res)=>{
        if(res.data){
            setmarkings(res.data.markings)
        }
    })
  }, [])

  onDelete = (id) =>{
          axios.delete(`http://localhost:8070/marking/deleteMarking/${id}`).then((res)=>{
            if(res.data){
               window.location.reload();
            }
          }).catch((e)=>{
            console.log(e)
          })
  }

  filterData= (markings,searchKey) => {
    const result = markings.filter((markings) =>
        markings.mTittle.toLowerCase().includes(searchKey)
    )
    setmarkings(result)
  }
  
  handleSearchArea = (e)=> {
  const searchKey = e.currentTarget.value;
  axios.get("http://localhost:8070/marking/getMarkings").then(res =>{
       if(res.data.success){
              filterData(res.data.markings,searchKey)
           };
       }
   )
  }

  onUpdate = (id) =>{
      window.location.href=`/updateMarking/${id}`
  }
  return (

    <div className='alignMarginN'>
    <div class="container">
        <div class="main-body">

        <div class="col-md-12">
          <div class="card mb-2 mt-4" style={{width:94+"%", boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
            <div class="card-body">
              <center><h3 className="fw-bold mb-0">Marking Schemas</h3></center>
              <div className='row mt-3'>
                <div className="col-md-6 mt-0">
                  <div class="input-group rounded">
                  <a href='/Addmarking'><button class="btn btn-primary"> <span><RiAddCircleFill color="white" fontSize="1.5em"/> &nbsp; Create Marking Schema</span></button></a>
                  <button class="btn btn-info " style={{marginLeft:"0.5rem"}} onClick={()=>{window.location.reload()}} > <span><HiRefresh color="white" fontSize="1.5em"/> &nbsp; Refresh Table</span></button>
                  </div>
                </div>
                <div className="col-md-3 ms-auto mt-0">
                  <div class="input-group rounded">
                    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"
                    name="searchQuery" onChange={handleSearchArea}></input>
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
        <tr style={{textAlign:"center"}}>
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
                                <td style={{textAlign:"center"}}>
                            {/* <button type="button" onClick={()=>{this.onUpdate(markings._id)}} class="btn btn-primary btn-rounded"><i class="fa fa-pencil"></i></button>&nbsp;&nbsp;
                             <button type="button" onClick={()=>{this.onDelete(markings._id)}} class="btn btn-danger btn-rounded"><i class="fa fa-trash"></i></button> */}

                            <button type="button" onClick={()=>{this.onUpdate(markings._id)}} class="btn btn-outline-dark btn-floating"><i class="fa fa-pencil" style={{color:"blue"}}></i></button>&nbsp;&nbsp;
                            <Button type="button" onClick={()=>{handleShow(markings._id)}} variant="btn btn-outline-dark btn-floating"><i class="fa fa-trash" style={{color:"red"}}></i></Button>
                            </td>
                          </tr>
                    ))}
              </tbody>
  </table>
  </div>
        <Modal show={show} onHide={handleClose} >
                  <Modal.Body>
                    <center>
                    <FiAlertTriangle color="red" fontSize="3em" /><br/>
                      <b>Are you sure?</b><br/>
                      Do you really want to delete this file.<br/>
                      This file cannot be restore

                      </center>
                      </Modal.Body>
                      <Modal.Footer >
                      <div className="mx-auto">
                      <Button variant="danger" onClick={()=>{onDelete(id)}} style={{width: 170+"px"}}>
                        Delete
                      </Button> &nbsp; &nbsp;
                        <Button variant="success" onClick={handleClose} style={{width: 170+"px"}}>
                        Cancel
                        </Button>
                        </div>
                      </Modal.Footer>
                    </Modal>

              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  )
}
