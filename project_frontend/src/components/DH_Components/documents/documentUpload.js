import React,{useState} from "react";
import axios from "axios";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
import {useParams
} from "react-router-dom";
import app from "../../../firebase";



export default function DocumentUpload(){

    const [fileUrl, setfileUrl] = useState("");
    const params = useParams();
    const config = {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      };

    const sendData = async (e) => {

console.log(config)

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

            let newFile = {
                fileUrl:fileUrl,
            }

            

                axios.post(`http://localhost:8070/submitDocs/uploadDocs/${params.id}`,newFile,config)
                .then(res=>{
                    alert("Registration Success")

                        setfileUrl("");

                    //window.location = "/login"
                }).catch((err)=>{
                    alert("File alredy uploaded!")
                })


            });
        }
        ); 
    }


        return (
         
            <div style={{marginTop:"5rem"}}>

  

                    <div class="item-wrapper one">

                    <center><h3>
                        <span style={{color:"red"}}><i class="fa fa-upload"  aria-hidden="true">&nbsp;&nbsp;</i></span>
                        <span >Upload Submissions</span>
                    </h3></center>
                      
                    <div class="item">
                        
                        <form data-validation="true" method="post" name="form" onSubmit={sendData} enctype="multipart/form-data">
                            <div class="item-inner">
                                <div class="item-content">
                            


                                    <div class="image-upload">
                                    <label style={{cursor: "pointer"}} for="file_upload">

                                        <img src="" alt="" class="uploaded-image"/>

                                        <div class="h-100">
                                            <div class="dplay-tbl">
                                                <div class="dplay-tbl-cell">
                                                
                    
                                                    <i class="fa fa-cloud-upload"></i>
                                                    <h5><b>Choose Your File to Upload</b></h5>
                                                    <h6 class="mt-10 mb-70">Or Drop Your File Here</h6>


                                                </div>
                                            </div>
                                        </div>
                                        <input data-required="image" type="file" name="image_name" id="file_upload" class="image-input" data-traget-resolution="image_resolution"  onChange={(e) => setfileUrl(e.target.files[0])} />
                                        
                                        </label>
                                    </div>
                        
                                </div>
                            </div>
                            <center><button style={{padding:"10px 50px"}} class="btn btn-primary btn-sm" type="submit">Upload</button></center>

                        </form>
                    </div>

                    </div>
                            
            </div>     
          
    
        )

    
    }