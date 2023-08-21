import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import favatar from '../images/favatar.png';
import '../App.css'; // Import your custom CSS file

const About = () => {
  const navigate = useNavigate();
  const[userData, setUserData] = useState({});
  const callAboutPage = async() => {
      try{
          const res = await fetch('/about', {
            method : 'GET',
            headers :{
              "Accept" : "application/json",
              "Content-Type" : "application/json"
            },
            credentials : 'include'
          });

          const data = await res.json();
          //console.log(res.status);
          //console.log("a", data);
          setUserData(data);
          if(res.status != 200){
              //console.log("b: ", res.error);
              const err = new Error(res.error);
              throw err;
          }
      }
      catch(error){
        //console.log("c: ",error);
        navigate('/signin');
      }
  }
  useEffect(() => {
      callAboutPage();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-9 col-md-10 col-sm-12">
          <div className="card container">
            <div className="card-body row">
              <div className="col-lg-3 col-md-12 col-sm-12 row justify-content-center align-items-center">
                <img src={favatar} className="img-fluid rounded-circle" alt="User Avatar" />
              </div>
              <div className="col-lg-9 col-md-12 col-sm-12 container">
                <section className="user-intro row justify-content-between align-items-center">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <p className="myname fs-3 mb-0 fw-bold">{userData.name}</p>
                    <p className="myprof fs-6 text-secondary">{userData.work}</p>
                  </div>
                  <button className="btn btn-secondary rounded-pill col-lg-2 col-md-3 col-sm-12 mt-3 mt-md-0">Edit</button>
                </section>

                <p className="fw-bold border-bottom border-secondary mt-4">About</p>

                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="fw-bold text-muted">UserID</label>
                    <p className="text-primary fw-bold">{userData._id}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="fw-bold text-muted">Name</label>
                    <p className="text-primary fw-bold">{userData.name}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="fw-bold text-muted">Email</label>
                    <p className="text-primary fw-bold">{userData.email}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="fw-bold text-muted">Phone</label>
                    <p className="text-primary fw-bold">{userData.phone}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="fw-bold text-muted">Work</label>
                    <p className="text-primary fw-bold">{userData.work}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
