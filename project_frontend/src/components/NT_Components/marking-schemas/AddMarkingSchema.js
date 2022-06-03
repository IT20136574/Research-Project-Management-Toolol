import React, { useState } from 'react'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
import app from "../../../firebase";
import axios from 'axios';

export default function AddMarkingSchema() {
    const [mTittle, setmTittle] = useState("");
    const [DTittle, setDTittle] = useState("");
    const [discription, setdiscription] = useState("");
    const [fileUrl, setfileUrl] = useState("")

    const sendData = async (e) => {

        e.preventDefault();

        const fileName = fileUrl.name +" "+ new Date().toString();
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, fileUrl);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {

            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((fileUrl) => {
            console.log('File available at', fileUrl);

            let newMarking = {
                mTittle : mTittle,
                DTittle : DTittle ,
                discription : discription,
                fileUrl:fileUrl
            }
    

                console.log(newMarking)
                axios.post("http://localhost:8070/marking/create",newMarking)
                .then(()=>{
                    alert("marking creation successful")
                    window.location.href="/marking"
                }).catch((err)=>{
                    alert(err)
                })

            });
        }
        );
    }
    
    return (
    // <div className='alignMargin'>
    //     <h2>Create Marking Schema</h2> <br/>
    //     <form method='POST' onSubmit={sendData}>
    //             <label>Marking Schema Title : </label> &nbsp;
    //             <input type="text" name="mTittle" onChange={(e)=>{setmTittle(e.target.value)}}  required/><br/><br/>

    //             <label>Display Title : </label> &nbsp;
    //             <input type="text" name="DTittle" onChange={(e)=>{setDTittle(e.target.value)}} required/><br/><br/>

    //             <label>Discription : </label> &nbsp;
    //             <input type="text" name="discription" onChange={(e)=>{setdiscription(e.target.value)}} required/><br/><br/>

    //             <label>File : </label> &nbsp;
    //             <input type="file" name="fileUrl" onChange={(e) => setfileUrl(e.target.files[0])}/><br/><br/>
                
    //             <input type="submit" value="submit"/>
       
    //     </form>

    // </div>
    <div className='alignMarginN'>
        <div class="container">
            <div class="main-body">
            <div class="col-md-12">
              <div class="card mb-2 mt-5" style={{width:94+"%"}}>
                <div class="card-body">
                <h4 className="fw-bold mb-1">Create Marking Schema</h4><br/>
                <form method='POST' onSubmit={this.onSubmit}>
                <div className="row">
                        <div className="col-md-12 mb-2">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="mTittle" id="mTittle" placeholder="Marking Schema Title"  required="true"/>
                            <label for="floatingInput">Marking Schema Title</label>
                        </div>
                        </div>
                </div>

                <div className="row">
                        <div className="col-md-12 mb-2">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="mTittle" id="mTittle" placeholder="Marking Schema Display Title"  required="true"/>
                            <label for="floatingInput">Marking Schema Display Title</label>
                        </div>
                        </div>
                </div>
       

                <div class="form-floating mb-3">
                          <textarea id="floatingInput" name="discription" style={{height: "100px"}} type="text"  class="form-control" placeholder="Description"  required/>
                          <label for="floatingInput">Description</label>
                 </div>

                <div className="row">
                <div class="file-upload-wrapper">
                    <input type="file" id="input-file-now" class="file-upload" />
                    </div>
                </div>
                
                <center>
                    <div className='mt-4'>
                        <input class='btn btn-info' type="reset" value="Reset" style={{width: 15+"%"}}/> &nbsp;&nbsp;&nbsp;
                        <input class='btn btn-primary' type="submit" value="Create Submission" style={{width: 15+"%"}}/> 
                    </div>
                </center>
                
                </form>
                  
    
              </div>
            </div>
          </div>


            </div>
        </div>
    </div>
  )
}
