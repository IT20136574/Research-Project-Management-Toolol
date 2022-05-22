import React, { useState } from 'react'
import axios from 'axios';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
import app from "../../../firebase";
import axios from 'axios';

function DocumentUpload() {
    const [docName, setdocName] = useState("");
    const [displayTitle, setdisplayTitle] = useState("");
    const [discription, setdiscription] = useState("");
    const [type, settype] = useState("")
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

            let newDocument = {
                docname: docName,
                displaytitle: displayTitle,
                Uploaddate: new Date().toString(),
                type:type,
                discription: discription,
                fileUrl:fileUrl
            }
    

                console.log(newDocument)
                axios.post("http://localhost:8070/document/uploadDoc",newDocument)
                .then(()=>{
                    alert("Registration Success")
                        setdocName("");
                        setdisplayTitle("");
                        setdiscription("");
                        setfileUrl("");
                        settype("");
                    window.location.reload();
                }).catch((err)=>{
                    alert(err)
                })

            });
        }
        );
    }

  return (
    <div>
        <br/>
        <h3>Document Management</h3>
        <form method='POST' onSubmit={sendData}>
            <label>Document Name : </label> &nbsp;
            <input type="text" name="docname" onChange={(e) => setdocName(e.target.value)} required/><br/>

            <br/>
            <label>Display Title : </label> &nbsp;
            <input type="text" name="displayTitle" onChange={(e) => setdisplayTitle(e.target.value)}/><br/>

            <br/>
            <label>discription : </label> &nbsp;
            <input type="text" name="discription" onChange={(e) => setdiscription(e.target.value)}/><br/>

            <br/>
            <label>Document Type : </label> &nbsp;
            <select name="documentType" onChange={(e) => settype(e.target.value)}>
                <option>choose file type</option>
                <option valure="pdf">PDF</option>
                <option valure="ptr">Presentaion</option>
                <option valure="word">word</option>
            </select>
            
            <br/>

            <br/>
            <label>File : </label> &nbsp;
            <input type="file" name="fileUrl" onChange={(e) => setfileUrl(e.target.files[0])}/><br/><br/>

            <input type="submit" value="submit"/>
        </form>
    </div>
  )
}

export default DocumentUpload