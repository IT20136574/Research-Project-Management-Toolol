import React from "react";
import { Component } from 'react';
import axios from "axios";
import 'typeface-quicksand';


export default class Home extends Component {



    render() {
        return (
      
            <div>

    <header>



    <nav class="navbar navbar-expand-lg navbar-light fixed-top mask-custom shadow-0 ">
    <div class="container">
    <img
            src="https://firebasestorage.googleapis.com/v0/b/researchprojectmanagemen-d4b3b.appspot.com/o/Final-new-logo-of-SLIIT-1-removebg-preview.png%20Mon%20May%2023%202022%2005%3A00%3A13%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=70ad702b-d614-4ffa-a073-b2607a92c8c2"
            height="25"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          /><p>  &nbsp;&nbsp; </p>
      <a class="navbar-brand" href="#!"><span style={{color: "#5e9693"}}>Reasearch</span><span style={{color: "#fff"}}>Management</span></a>
      <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="#!">Student Group</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#!">Research Topic</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#!">Supervisor</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#!">Reference</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#!">Submissions</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#!">Downloads</a>
          </li>
        </ul>
        <ul class="navbar-nav d-flex flex-row">
          <li class="nav-item me-3 me-lg-0">
            <a class="nav-link" href="#!">
              <i class="fas fa-shopping-cart"></i>
            </a>
          </li>
          <li class="nav-item me-3 me-lg-0">
            <a class="nav-link" href="#!">
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li class="nav-item me-3 me-lg-0">
            <a class="nav-link" href="#!">
              <i class="fab fa-instagram"></i>
            </a>
          </li>
          <div>&nbsp;&nbsp;&nbsp;</div>
          <li class="nav-item me-3 me-lg-0">
            <a class="nav-link" href="#!">
            <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            class="rounded-circle"
            height="35"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />

            </a>
          </li>

         

        </ul>
      </div>
    </div>
  </nav>




  <div id="introCarousel" class="carousel slide carousel-fade shadow-2-strong" data-mdb-ride="carousel">
        <ol class="carousel-indicators">
          <li data-mdb-target="#introCarousel" data-mdb-slide-to="0" class="active"></li>
          <li data-mdb-target="#introCarousel" data-mdb-slide-to="1"></li>
          <li data-mdb-target="#introCarousel" data-mdb-slide-to="2"></li>
        </ol>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
            </div>
          </div>

          <div class="carousel-item">
            <div class="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
              <div class="d-flex justify-content-center align-items-center h-100">
              </div>
            </div>
          </div>

          <div class="carousel-item">
            <div
              class="mask"
              style={{background: "linear-gradient(45deg,rgba(29, 236, 197, 0.7),rgba(91, 14, 214, 0.7) 100%)"}}>
            </div>
          </div>
        </div>
  
        <a class="carousel-control-prev" href="#introCarousel" role="button" data-mdb-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#introCarousel" role="button" data-mdb-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
     
    </header>


    <section class="mt-5">
      <div class="row">
        <div class="col-xl-6 col-md-12 mb-4">
            <div class="cardd">
          <div class="card mr-1">
            <div class="card-body">
              <div class="d-flex justify-content-between p-md-1">
                <div class="d-flex flex-row">
                  <div class="align-self-center">
                    <i class="fas fa-users text-info fa-3x me-4"></i>
                  </div>
                  <div>
                    <h4>Student Group</h4>
                    <p class="mb-0">Group Name</p>
                    <p class="mb-0">Members: 3</p>
                  </div>
                </div>
                <div class="align-self-center">
                  <h3 class="h1 mb-0">Registered</h3>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div class="col-xl-6 col-md-12 mb-4">
        <div class="cardd">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between p-md-1">
                <div class="d-flex flex-row">
                  <div class="align-self-center">
                    <i
                       class="fas fa-tasks text-warning fa-3x me-4"
                       ></i>
                  </div>
                  <div>
                    <h4>Reasearch Topic</h4>
                    <p class="mb-0">Topic</p>
                    <p class="mb-0">Field : SE</p>
                  </div>
                </div>
                <div class="align-self-center">
                  <h3 class="h1 mb-0">Requested</h3>
                </div>
              </div>
            </div>
          </div></div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 col-md-12 mb-4">
        <div class="cardd">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between p-md-1">
                <div class="d-flex flex-row">
                  <div class="align-self-center">
                    <i class="fas fa-user text-info fa-3x me-4"></i>
                  </div>
                  <div>
                    <h4>Supervisor</h4>
                    <p class="mb-0">Name</p>
                  </div>
                </div>
                <div class="align-self-center">
                  <h3 class="h1 mb-0">Requested</h3>
                </div>
              </div>
            </div></div>
          </div>
        </div>
        <div class="col-xl-6 col-md-12 mb-4">
        <div class="cardd">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between p-md-1">
                <div class="d-flex flex-row">
                  <div class="align-self-center">
                    <i
                       class="far fa-user text-warning fa-3x me-4"
                       ></i>
                  </div>
                  <div>
                    <h4>Co-Supervisor</h4>
                    <p class="mb-0">Name</p>
                  </div>
                </div>
                <div class="align-self-center">
                  <h3 class="h1 mb-0">Pending...</h3>
                </div>
              </div>
            </div>
          </div></div>
        </div>
      </div>
    </section>
   

    <main class="mt-5">
      <div class="container">
        <section>
          <div class="row">
            <div class="col-md-6 gx-5 mb-4">
              <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">
                <img src="https://mdbootstrap.com/img/new/slides/031.jpg" class="img-fluid" />
                <a href="#!">
                  <div class="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}></div>
                </a>
              </div>
            </div>

            <div class="col-md-6 gx-5 mb-4">
              <h4><strong>Facilis consequatur eligendi</strong></h4>
              <p class="text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequatur
                eligendi quisquam doloremque vero ex debitis veritatis placeat unde animi laborum
                sapiente illo possimus, commodi dignissimos obcaecati illum maiores corporis.
              </p>
              <p><strong>Doloremque vero ex debitis veritatis?</strong></p>
              <p class="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod itaque voluptate
                nesciunt laborum incidunt. Officia, quam consectetur. Earum eligendi aliquam illum
                alias, unde optio accusantium soluta, iusto molestiae adipisci et?
              </p>
            </div>
          </div>
        </section>

        <hr class="my-5" />

        <section class="text-center">
          <h4 class="mb-5"><strong>Facilis consequatur eligendi</strong></h4>

          <div class="row">
            <div class="col-lg-4 col-md-12 mb-4">
              <div class="card">
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img
                    src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                    class="img-fluid"
                  />
                  <a href="#!">
                    <div class="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}></div>
                  </a>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make up the bulk of the
                    card's content.
                  </p>
                  <a href="#!" class="btn btn-primary">Button</a>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card">
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img
                    src="https://mdbootstrap.com/img/new/standard/nature/023.jpg"
                    class="img-fluid"
                  />
                  <a href="#!">
                    <div class="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}></div>
                  </a>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make up the bulk of the
                    card's content.
                  </p>
                  <a href="#!" class="btn btn-primary">Button</a>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card">
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img
                    src="https://mdbootstrap.com/img/new/standard/nature/111.jpg"
                    class="img-fluid"
                  />
                  <a href="#!">
                    <div class="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}></div>
                  </a>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make up the bulk of the
                    card's content.
                  </p>
                  <a href="#!" class="btn btn-primary">Button</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr class="my-5" />

        <section class="mb-5">
          <h4 class="mb-5 text-center"><strong>Facilis consequatur eligendi</strong></h4>

          <div class="row d-flex justify-content-center">
            <div class="col-md-6">
              <form>
                <div class="row mb-4">
                  <div class="col">
                    <div class="form-outline">
                      <input type="text" id="form3Example1" class="form-control" />
                      <label class="form-label" for="form3Example1">First name</label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-outline">
                      <input type="text" id="form3Example2" class="form-control" />
                      <label class="form-label" for="form3Example2">Last name</label>
                    </div>
                  </div>
                </div>

                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3" class="form-control" />
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4" class="form-control" />
                  <label class="form-label" for="form3Example4">Password</label>
                </div>

                <div class="form-check d-flex justify-content-center mb-4">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                    checked
                  />
                  <label class="form-check-label" for="form2Example3">
                    Subscribe to our newsletter
                  </label>
                </div>

                <button type="submit" class="btn btn-primary btn-block mb-4">
                  Sign up
                </button>

                <div class="text-center">
                  <p>or sign up with:</p>
                  <button type="button" class="btn btn-primary btn-floating mx-1">
                    <i class="fab fa-facebook-f"></i>
                  </button>

                  <button type="button" class="btn btn-primary btn-floating mx-1">
                    <i class="fab fa-google"></i>
                  </button>

                  <button type="button" class="btn btn-primary btn-floating mx-1">
                    <i class="fab fa-twitter"></i>
                  </button>

                  <button type="button" class="btn btn-primary btn-floating mx-1">
                    <i class="fab fa-github"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>

    <footer class="bg-light text-lg-start">
      <div class="py-4 text-center">
        <a
          role="button"
          class="btn btn-primary btn-lg m-2"
          href="https://www.youtube.com/channel/UC5CF7mLQZhvx8O5GODZAhdA"
          rel="nofollow"
          target="_blank"
        >
          Learn Bootstrap 5
        </a>
        <a
          role="button"
          class="btn btn-primary btn-lg m-2"
          href="https://mdbootstrap.com/docs/standard/"
          target="_blank"
        >
          Download MDB UI KIT
        </a>
      </div>

      <hr class="m-0" />

      <div class="text-center py-4 align-items-center">
        <p>Follow MDB on social media</p>
        <a
          href="https://www.youtube.com/channel/UC5CF7mLQZhvx8O5GODZAhdA"
          class="btn btn-primary m-1"
          role="button"
          rel="nofollow"
          target="_blank"
        >
          <i class="fab fa-youtube"></i>
        </a>
        <a
          href="https://www.facebook.com/mdbootstrap"
          class="btn btn-primary m-1"
          role="button"
          rel="nofollow"
          target="_blank"
        >
          <i class="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://twitter.com/MDBootstrap"
          class="btn btn-primary m-1"
          role="button"
          rel="nofollow"
          target="_blank"
        >
          <i class="fab fa-twitter"></i>
        </a>
        <a
          href="https://github.com/mdbootstrap/mdb-ui-kit"
          class="btn btn-primary m-1"
          role="button"
          rel="nofollow"
          target="_blank"
        >
          <i class="fab fa-github"></i>
        </a>
      </div>

      <div class="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
        © 2020 Copyright:
        <a class="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
      </div>
    </footer>

                            
            </div>     
          
    
        )
    
    }
    
    }