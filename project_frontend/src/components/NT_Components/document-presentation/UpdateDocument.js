import axios from 'axios'
import React, { Component } from 'react'

export default class UpdateDocument extends Component {
    constructor(props){
        super(props);
        this.state ={
            Documents:[]
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        console.log(id)
        axios.get(`http://localhost:8070/document/getDocument/${id}`).then((res)=>{
            console.log(res.data)
        })
    }
  render() {
    return (

        <div>
            <br/>
            <h3>Document Management</h3>
            <form>
                <label>Document Name : </label> &nbsp;
                <input type="text" name="docname"   required/><br/>

                <br/>
                <label>Display Title : </label> &nbsp;
                <input type="text" name="displayTitle" /><br/>

                <br/>
                <label>discription : </label> &nbsp;
                <input type="text" name="discription" /><br/>

                <br/>
                <label>Document Type : </label> &nbsp;
                <select name="documentType">
                    <option>choose file type</option>
                    <option valure="pdf">PDF</option>
                    <option valure="ptr">Presentaion</option>
                    <option valure="word">word</option>
                </select>
                
                <br/>

                <br/>
                <label>File : </label> &nbsp;
                <input type="file" name="fileUrl" /><br/><br/>

                <input type="submit" value="submit"/>
            </form>
        </div>

    )
  }
}
