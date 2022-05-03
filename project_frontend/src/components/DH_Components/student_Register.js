import React,{useState} from "react";
import axios from "axios";
// import {toast} from 'react-toastify';


toast.configure()

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
    const [pwd1, setPassowrd1] = useState("");
    const [pwd2, setPassowrd2] = useState("");


    const sendData = async (e) => {
        e.preventDefault();
        
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
            pwd: pwd1
        }

        if (pwd1 === pwd2) { 
        axios.post("http://localhost:8070/student/signup",newStudent)
        .then(()=>{
            alert("Registration Success")
            //toast.success('Registration Success',{position:toast.POSITION.TOP_CENTER});
            //window.location = "/login"
        }).catch((err)=>{
            alert(err)
        })
        }else{
            alert("Password dismatch")
            //toast.warning('Password dismatch',{position:toast.POSITION.TOP_CENTER});
        }

        setname("");
        setnic("");
        setfaculty("");
        setstudent_id("");
        setbatch("");
        setspecialization("");
        setphone("");
        setDOB("");
        setEmail("");
        setPassowrd1("");
        setPassowrd2("");  
      
    }


    return(


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




    )

}
