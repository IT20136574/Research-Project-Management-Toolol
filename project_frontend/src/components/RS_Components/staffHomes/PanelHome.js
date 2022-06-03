import React, { Component } from 'react'
import NavBarPanal from '../NavBarPanal';
import {Carousel} from 'react-bootstrap';

export default class PanelHome extends Component {

    render() {
        return (
          <div>
              <NavBarPanal/>
              <br/><br/><br/>
              
              
                <Carousel>
                    <Carousel.Item interval={1000}>
                      <img
                        className="img1"
                        src="https://i.ytimg.com/vi/3cyLwpvVAB4/maxresdefault.jpg"
                        alt="First slide"
                      />
                     
                    </Carousel.Item>
                    <Carousel.Item interval={800}>
                      <img
                        className="img1"
                        src="https://static.sliit.lk/wp-content/uploads/2020/10/06053342/SLIIT-Convocation-2020-commends-Institute-for-contribution-to-Nation-13.jpg"
                        alt="Second slide"
                      />
                      
                    </Carousel.Item>
                    <Carousel.Item >
                      <img
                        className="img1"
                        src="https://i.ytimg.com/vi/wtxRpdwt00Q/maxresdefault.jpg"
                        alt="Third slide"
                      />
                  
                    </Carousel.Item>
                  </Carousel>
          </div>
        )
      }
    }
    