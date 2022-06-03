import React from 'react'
import DisplayMarking from './DisplayMarking'
import {HiRefresh} from "react-icons/hi"
import {RiAddCircleFill} from "react-icons/ri"
export default function MarkingSchemaPage() {
  return (
    // <div className='alignMargin'>
    //     <h3>MarkingSchema Page</h3> <br/>
    //     <a href='/Addmarking'><button>Add Marking Schema</button></a> <br/><br/>
    //     <DisplayMarking/>
    // </div>
    <div className='alignMarginN'>
    <div class="container">
        <div class="main-body">

        <div class="col-md-12">
          <div class="card mb-2 mt-4" style={{width:94+"%"}}>
            <div class="card-body">
              <center><h3 className="fw-bold mb-0">Marking Schemas</h3></center>
              <div className='row mt-3'>
                <div className="col-md-4 mt-0">
                  <div class="input-group rounded">
                  <a href='/Addmarking'><button class="rounded-5"> <span><RiAddCircleFill color="green" fontSize="1.5em"/>Create Marking Schema</span></button></a> &nbsp;&nbsp;&nbsp;
                    <button class="rounded-5"> <span><HiRefresh color="green" fontSize="1.5em"/> Refresh</span></button>
                  </div>
                </div>
                <div className="col-md-3 ms-auto mt-0">
                  <div class="input-group rounded">
                    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"
                    name="searchQuery" ></input>
                    <span class="input-group-text border-0" id="search-addon">
                      <i class="fas fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>

              <hr className='mt-4' style={{height:3+"px"}}/>
              <DisplayMarking/>

              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  )
}
