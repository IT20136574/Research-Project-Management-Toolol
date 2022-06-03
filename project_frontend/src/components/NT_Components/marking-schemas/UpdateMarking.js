import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
import app from "../../../firebase";

export default function UpdateMarking() {
const [mTittle, setmTittle] = useState("");
const [DTittle, setDTittle] = useState("");
const [discription, setdiscription] = useState("");
const [fileUrl, setfileUrl] = useState("")

const params = useParams();

    useEffect(() => {
        const id = params.id;
        axios.get(`http://localhost:8070/marking/getMarking/${id}`).then((res)=>{
            if(res.data.success){
                setmTittle(res.data.markings.mTittle);
                setDTittle(res.data.markings.DTittle);
                setdiscription(res.data.markings.discription);
                setfileUrl(res.data.markings.fileUrl);
            }
        }).catch((e)=>{
            console.log(e)
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

            let updateMarking = {
                mTittle : mTittle,
                DTittle : DTittle ,
                discription : discription,
                fileUrl : fileUrl
            }
    
                const id = params.id;

                axios.put(`http://localhost:8070/marking/update/${id}`,updateMarking)
                .then(()=>{
                    alert("Marking update successful")
                    window.location.href="/marking"
                }).catch((err)=>{
                    alert(err)
                })

            });
        }
        );
    }
    
  return (
    <div className='alignMargin'>
        <h2>Update Marking Schema</h2> <br/>
        <form method='POST' onSubmit={sendData}>
                <label>Marking Schema Title : </label> &nbsp;
                <input type="text" name="mTittle" value={mTittle} onChange={(e)=>{setmTittle(e.target.value)}}  required/><br/><br/>

                <label>Display Title : </label> &nbsp;
                <input type="text" name="DTittle" value={DTittle} onChange={(e)=>{setDTittle(e.target.value)}} required/><br/><br/>

                <label>Discription : </label> &nbsp;
                <input type="text" name="discription" value={discription} onChange={(e)=>{setdiscription(e.target.value)}} required/><br/><br/>

                <label>File : </label> &nbsp;
                <input type="file" name="fileUrl"  onChange={(e) => setfileUrl(e.target.files[0])}/><br/><br/>
                
                <input type="submit" value="submit"/>
       
        </form>

    </div>
  )
}
