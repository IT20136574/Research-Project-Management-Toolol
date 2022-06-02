import axios from 'axios';
import React, { Component } from 'react';
import NavBar from '../NavBar';
import {Card, Container, ListGroup, ListGroupItem} from 'react-bootstrap';

export default class MarkingSchemes extends Component {

    constructor(props){
        super(props);
        
        this.state={
             mark:[],
        }
    }
    
    componentDidMount(){
      this.retriveMarkings();
    }
    
    
    retriveMarkings(){
      axios.get("http://localhost:8070/staff/getmarkings").then(res =>{
        
        if(res.data.success){
          this.setState({
            mark:res.data.markings
          });

          console.log(this.state.mark)
        }
      });
    }

      
  render() {

    

    return (
      
      <div><NavBar/>
      <br/><br/><br/><br/>

      <div class="d-flex justify-content-center">
      {this.state.mark.map((item) => (
        <div className='cardR'>
                  <Card  style={{ width: '30rem' }}>
              <Card.Img className="img2" variant="top" src="https://media.istockphoto.com/vectors/todo-list-banner-design-man-holds-a-pencil-and-notes-completed-tasks-vector-id1269034924?k=20&m=1269034924&s=612x612&w=0&h=4K1zjhyxWXB7rFKKvu46SVB896Gljo_JQsuPe7AhS8U=" />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>Marking Scheme</Card.Title>
              </Card.Body>

              <ListGroup className="list-group-flush">
                <ListGroupItem>{item.mTittle}</ListGroupItem>
                <ListGroupItem>{item.DTittle}</ListGroupItem>
                <ListGroupItem>{item.discription}</ListGroupItem>
              </ListGroup>
              <Card.Body>
              <div class="text-center">
                <a href={item.fileUrl}>
              <button style={{width:"6rem"}}  type="button" class="btn btn-primary btn-floating">
                <i class="fas fa-download"></i>
              </button>
                </a>
                </div>
              </Card.Body>
            </Card>
            </div>
              ))}
            </div>
            
      </div>
    )
  }
}
