import axios from 'axios';
import React, { useState } from 'react';
import FileBase64 from 'react-filebase64';
import image from '../../../asserts/RS_Assests/yy.jpg'
import {toast} from 'react-toastify';

function StaffRegister(){

    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [staffid, setstaffid] = useState("")
    const [email, setemail] = useState("")
    const [nic, setnic] = useState("")
    const [phone, setphone] = useState("")
    const [username, setusername] = useState("")
    const [field, setfield] = useState("")
    const [role, setrole] = useState("")
    const [description, setdescription] = useState("")
    const [password, setpassword] = useState("")
    const [cpassword, setcpassoword] = useState("")
    const [profileImage, setprofileImage] = useState("")


     function StaffRegister(e){
        e.preventDefault();

        const newstaff = {
            fname,
            lname,
            staffid,
            email,
            nic,
            phone,
            username,
            field,
            role,
            description,
            password,
            cpassword,
            profileImage
        }

        console.log(newstaff)
        if(password === cpassword){
            axios.post("http://localhost:8070/staff/add",newstaff).then((res)=>{
                if(res.data){
                    alert("newstaff register successful")
                    window.location.href = '/home';
                }
            
            }).catch((e)=>{
                console.log(e);
            })
        }else{
            toast.warn('Passwords Not Match',{position:toast.POSITION.TOP_Right});
          }
     }
    return (
    <div>
            <section className="text-center">
            <div className="p-5 bg-image" style={{backgroundImage: `url(${image})`,height: "300px",backgroundSize: 'cover'}}></div>

            <div className="card mx-4 mx-md-5 shadow-5-strong" style={{marginTop: "-130px", background: "hsla(0, 0%, 100%, 0.8)",backdropFilter:` blur(20px)`,marginBottom:"3rem"}}>
                <div className="card-body py-5 px-md-5">

                <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                    <h2 className="fw-bold mb-5">Sign up now</h2>
                    <form  name="form" onSubmit={StaffRegister}>


                        
                    <div className="row">
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="fname" id="fname" placeholder="First Name" onChange={(e)=>{setfname(e.target.value);}}  required/>
                            <label for="floatingInput">First Name</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="lname" id="lname" placeholder="Last Name" onChange={(e)=>{setlname(e.target.value);}}  required/>
                            <label for="floatingInput">Last Name</label>
                        </div>
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="nic" id="nic" placeholder="NIC" 
                            pattern ="[0-9]{12}||[0-9]{9}[v||V]"
                            onChange={(e)=>{setnic(e.target.value);}}
                            required/>
                            <label for="floatingInput">NIC</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="username" id="username" placeholder="Date of Birth" onChange={(e)=>{setusername(e.target.value);}} />
                            <label for="floatingInput">Username</label>
                        </div>
                        </div>
                        </div>

                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" name="email" id="email" placeholder="name@example.com" 
                            pattern="(?![.-])((?![.-][.-])[a-zA-Z\d.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}"
                            onChange={(e)=>{setemail(e.target.value);}}  required/>
                            <label for="floatingInput">Email</label>
                        </div>

                        <div className="row">
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                        <select className="form-control" required="required" id="role" placeholder="role"  name="role" onChange={(e)=>{setrole(e.target.value);}}>
                            <option selected>Your Role     ex:- Supervisor</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="co-supervisor">Co-upervisor</option>
                            <option value="panal_member">Panel Member</option>
                        </select>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="phone" class="form-control" name="phone" id="phone" placeholder="Phone Number" minLength={10} onChange={(e)=>{setphone(e.target.value);}}  required/>
                            <label for="floatingInput">Phone Number</label>
                        </div>
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" name="password" id="pwd" placeholder="Password" 
                              required="true"
                            onChange={(e)=>{setpassword(e.target.value);}}/>
                            <label for="floatingInput">Password</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" name="cpassword" id="cpwd" placeholder="Password" 
                              required="true"
                            onChange={(e)=>{setcpassoword(e.target.value);}}/>
                            <label for="floatingInput">Confirm Password</label>
                        </div>
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="description" id="description" placeholder="description" onChange={(e)=>{setdescription(e.target.value);}}  required/>
                            <label for="floatingInput">description</label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <select className="form-control" required="required" id="field" placeholder="field"  name="field" onChange={(e)=>{setfield(e.target.value);}}>
                            <option selected>Your Field     ex:- SE</option>
                            <option value="SE">SE</option>
                            <option value="IT">IT</option>
                            <option value="CS">CS</option>
                            <option value="Network">Network</option>
                
                        </select>
                        </div>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="staffid" id="staffid" placeholder="Last Name" onChange={(e)=>{setstaffid(e.target.value);}}  required/>
                            <label for="floatingInput">Staffid</label>
                        </div>
                        </div>


                        <div class="custom-file">
                        <h5><label class="custom-file-label" for="customFileLangHTML">Image : </label></h5><br/>
                        <FileBase64 class="form-control form-control-sm" id="formFileSm" type="file" multiple={ false } onDone={({base64}) => setprofileImage(base64)} required/>
                        </div>

                        <br/><br/>

                        <div className='mt-4'>
                               <input class='btn btn-secondary' type="reset" value="Reset" style={{width: 20+"%"}}/> &nbsp;&nbsp;&nbsp;
                               <input class='btn btn-primary' type="submit" value="Register" style={{width: 20+"%"}}/> 
                           </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </section>

    </div>
    )
}

export default StaffRegister;