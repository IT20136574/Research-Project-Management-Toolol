import React,{useState} from "react";
import axios from "axios";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
import app from "../../firebase";

export default function Signup(){

    const [name, setname] = useState("");
    const [nic, setnic] = useState("");
    const [faculty, setfaculty] = useState("");
    const [student_id, setstudent_id] = useState("");
    const [batch, setbatch] = useState("");
    const [specialization, setspecialization] = useState("");
    const [phone, setphone] = useState("");
    const [DOB, setDOB] = useState("");
    const [email, setEmail] = useState("");
    const [imageUrl, setimageUrl] = useState("");
    const [pwd1, setPassowrd1] = useState("");
    const [pwd2, setPassowrd2] = useState("");


    const sendData = async (e) => {

        e.preventDefault();

        const fileName = imageUrl.name +" "+ new Date().toString();
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageUrl);

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
            getDownloadURL(uploadTask.snapshot.ref).then((imageUrl) => {
            console.log('File available at', imageUrl);

            let newStudent = {
                name: name,
                nic: nic,
                faculty: faculty,
                student_id: student_id,
                batch: batch,
                specialization: specialization,
                phone: phone,
                DOB: DOB,
                email: email,
                imageUrl:imageUrl,
                pwd: pwd1
            }
    
            if (pwd1 === pwd2) { 
                console.log(newStudent)
                axios.post("http://localhost:8070/student/signup",newStudent)
                .then(()=>{
                    alert("Registration Success")

                        setname("");
                        setnic("");
                        setfaculty("");
                        setstudent_id("");
                        setbatch("");
                        setspecialization("");
                        setphone("");
                        setDOB("");
                        setEmail("");
                        setimageUrl("");
                        setPassowrd1("");
                        setPassowrd2("");  
                    //window.location = "/login"
                }).catch((err)=>{
                    alert(err)
                })
                }else{
                    alert("Password dismatch")
                }

            });
        }
        );


      
    }


    return(

                        <div style={{marginTop:"5rem"}}>
                            <form action="" method="post" name="form" onSubmit={sendData}> 
                                <h1>name</h1>
                                    <input type="text"   placeholder="Phone Number"
                                    onChange={(e) => setname(e.target.value)} required/>
              
            
                                <h1>Email Address</h1>
                            
                                <input type="email" 
                                placeholder="Enter your email"
                                pattern="(?![.-])((?![.-][.-])[a-zA-Z\d.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}"
                                inputMode="email"
                                onChange={(e) => setEmail(e.target.value)} required/>
        
                
                                <h1>Mobile</h1>
                                    <input type="text"   placeholder="Phone Number"
                                    onChange={(e) => setphone(e.target.value)} pattern="[0-9]{10}" required/>
              
                                <h1 >Date Of Birth</h1>
                                    <input type="date"
                                     placeholder="Date Of Birth"
                                    onChange={(e) => setDOB(e.target.value)}/>
         
                                <h1 >NIC</h1>

                                    <input type="text"   placeholder="Postal Code"
                                    onChange={(e) => setnic(e.target.value)} required/>
  
                                <h1 >Faculty</h1>
                                    <input type="text"   placeholder="Lane 1"
                                    onChange={(e) => setfaculty(e.target.value)} required/>

                                <h1 >Student ID</h1>
                                    <input type="text"   placeholder="Lane 2"
                                    onChange={(e) => setstudent_id(e.target.value)} required/>
 
                                <h1 >Batch</h1>
                                    <input type="text"   placeholder="City"
                                    onChange={(e) => setbatch(e.target.value)} required/>
       
                                <h1 >Specialization</h1>
      
                                    <input type="text"   placeholder="Country"
                                    onChange={(e) => setspecialization(e.target.value)} required/>

                                <h1 >Image</h1>
                                    
                                    <input type="file"   placeholder="Country"
                                    onChange={(e) => setimageUrl(e.target.files[0])} required/>



                                <h1>Password</h1>
                    
                                    <input type="password" 
                                    data-toggle="tooltip" data-placement="center" title="Your password MUST contain at least 8 charactors, including UPPER-lowercase letters and at least one number and a charactor = 'Sample@523'"
                                    placeholder="Password"
                                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$" 
                                    onChange={(e) => setPassowrd1(e.target.value)} required/>
                                   

             
                                    <input type="password" placeholder="Repeat Password"
                                    title="Your password MUST contain at least 8 charactors, including UPPER-lowercase letters and at least one number and a charactor = 'Sample@523'"
                                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$" 
                                    onChange={(e) => setPassowrd2(e.target.value)}/>
                 
                                <br/>                   
                                <center><button type="submit">
                                        Register Account
                                    </button></center>
                                
                            </form>                 
                            </div>
    )

}
