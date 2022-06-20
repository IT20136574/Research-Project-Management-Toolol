import React, { useState } from 'react'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
import app from "../../../firebase";
import axios from 'axios';
import {toast} from 'react-toastify';
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
                    toast.success('Marking Sheme Created',{position:toast.POSITION.TOP_Right});
                    window.setTimeout(function() {
                        window.location.href="/marking"
                    }, 3000) 
                }).catch((err)=>{
                    alert(err)
                })

            });
        }
        );
    }
    
    return (
    <div className='alignMarginN'>
        <div class="container">
            <div class="main-body">
            <div class="col-md-12">
              <div class="card mb-2 mt-5" style={{width:94+"%",boxShadow:"0 30px 50px 0 rgba(0,0,0,0.2)"}}>
                <div class="card-body">
                <h4 className="fw-bold mb-1">Create Marking Scheme</h4><br/>
                <form method='POST' onSubmit={sendData}>
                <div className="row">
                        <div className="col-md-12 mb-2">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="mTittle" id="mTittle" placeholder="Marking Schema Title" onChange={(e)=>{setmTittle(e.target.value)}} required="true"/>
                            <label for="floatingInput">Marking Schema Title</label>
                        </div>
                        </div>
                </div>

                <div className="row">
                        <div className="col-md-12 mb-2">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" name="mTittle" id="mTittle" placeholder="Marking Schema Display Title" onChange={(e)=>{setDTittle(e.target.value)}} required="true"/>
                            <label for="floatingInput">Marking Schema Display Title</label>
                        </div>
                        </div>
                </div>
       

                <div class="form-floating mb-3">
                          <textarea id="floatingInput" name="discription" style={{height: "100px"}} type="text"  class="form-control" placeholder="Description" onChange={(e)=>{setdiscription(e.target.value)}} required/>
                          <label for="floatingInput">Description</label>
                 </div>

                <div className="row">
                <div class="file-upload-wrapper">
                    <input type="file" id="input-file-now" class="file-upload" onChange={(e) => setfileUrl(e.target.files[0])}/>
                    </div>
                </div>
                
                <center>
                    <div className='mt-4'>
                        <input class='btn btn-warning' type="reset" value="Reset" style={{width: 20+"%"}}/> &nbsp;&nbsp;&nbsp;
                        <input class='btn btn-primary' type="submit" value="Create Marking Scheme" style={{width: 20+"%"}}/> 
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
