import React,{useState} from "react";
import axios from "axios";



export default function GrpReg(){

    const [group_name, setgroup_name] = useState("");


    const sendData = async (e) => {
        e.preventDefault();
        
        let newGrp = {
            group_name: group_name,
 
        }


        
        axios.post("http://localhost:8070/student/grpReg",newGrp)
        .then(res=>{
                alert("Group Name Registered")
                let data = res.data.id;
                  console.log(data);
            //toast.success('Registration Success',{position:toast.POSITION.TOP_CENTER});
            window.location = `/grpmem/${data}`
        }).catch((err)=>{
            alert(err)
        })


        setgroup_name("");

    }


    return(

      <div>
                            <form action="" method="post" name="form" onSubmit={sendData}> 
                               
                                <h1>Group Name</h1>
                                    <input type="text"   placeholder="Phone Number"
                                    onChange={(e) => setgroup_name(e.target.value)} required/>
              
        
                 
                                <br/>                   
                                <center><button type="submit">
                                        Next
                                    </button></center>
                                
                            </form>    
                            
                         
                            </div>             




    )

}
