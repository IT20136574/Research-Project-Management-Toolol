import axios from 'axios'
import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
import app from "../../../firebase";
import {toast} from 'react-toastify';
export default function UpdateDocument() {
    const [docname, setdocname] = useState("")
    const [displaytitle, setdisplaytitle] = useState("")
    const [discription, setdiscription] = useState("")
    const [type, settype] = useState("")
    const [fileUrl, setfileUrl] = useState("")

    const params = useParams();
    const id = params.id;

    useEffect(() => {
        axios.get(`http://localhost:8070/document/getDocument/${id}`).then((res)=>{
            if(res.data){
                setdocname(res.data.documents.docname);
                setdisplaytitle(res.data.documents.displaytitle);
                setdiscription(res.data.documents.discription);
                settype(res.data.documents.type);
                setfileUrl(res.data.documents.fileUrl)
            }
        })
  
    }, [])

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

            let updateDocument = {
                docname : docname,
                displaytitle : displaytitle ,
                discription : discription,
                type : type,
                fileUrl : fileUrl
            }
                axios.put(`http://localhost:8070/document/update/${id}`,updateDocument)
                .then(()=>{
                    toast.success('Document Updated successful',{position:toast.POSITION.TOP_Right});
                    window.setTimeout(function() {
                        window.location.href="/documentPage"
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
            <h4 className="fw-bold mb-1">Update Document</h4><br/>
            <form method='POST' onSubmit={sendData}>
            <div className="row">
                <div className="col-md-12 mb-2">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" name="docname" id="docname" placeholder="Document Name" value={docname} onChange={(e)=>{setdocname(e.target.value)}} required="true"/>
                        <label for="floatingInput">Document Name</label>
                    </div>
                </div>
            </div>

            <div className='row'>
            <div className="col-md-6 mb-2">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" name="displaytitle" id="displaytitle" placeholder="Display Title" value={displaytitle} onChange={(e)=>{setdisplaytitle(e.target.value)}} required="true"/>
                        <label for="floatingInput">Display Title</label>
                    </div>
                </div>

                        <div className="col-md-6 mb-2">
                            <div class="form-floating mb-2">
                            <select className="form-control" required="required" id="submitionType" placeholder="Submission Type"  name="submitionType" value={type} onChange={(e)=>{settype(e.target.value)}}>
                                <option selected>Submission Type</option>
                                <option value="PDF">PDF</option>
                                <option value="Presentation">Presentaion</option>
                                <option value="Word">Word</option>
                            </select>
                            </div>
                        </div>

                    </div>
        

                    <div class="form-floating mb-3">
                            <textarea id="floatingInput" name="discription" style={{height: "100px"}} type="text"  class="form-control" placeholder="Description" value={discription} onChange={(e)=>{setdiscription(e.target.value)}} required/>
                            <label for="floatingInput">Description</label>
                    </div>
                    <div className="row">
                    <div class="file-upload-wrapper">
                        <input type="file" id="input-file-now" class="file-upload" onChange={(e) => setfileUrl(e.target.files[0])}/>
                        </div>
                    </div>
                
                    <center>
                        <div className='mt-4'>
                            <input class='btn btn-warning' type="reset" value="Reset" style={{width: 15+"%"}}/> &nbsp;&nbsp;&nbsp;
                            <input class='btn btn-primary' type="submit" value="Update" style={{width: 15+"%"}}/> 
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
