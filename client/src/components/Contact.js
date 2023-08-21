import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import showAlert from '../utils/showAlert.js';

const Contact = () => {

    const navigate = useNavigate();
    const[userData, setUserData] = useState({});
    const callContactPage = async () => {   
        try{
            const res = await fetch('/contact', {
                method : 'GET',
                headers : {
                    "Accept" : "application/json",
                    "Contant-Type" : "application/json"
                },
                credentials : "include"
            });
            
            const data = await res.json();
            setUserData(data);
            setMessageData({...messageData, name : data.name, email : data.email, phone : data.phone})
            if(res.status !== 200){
                throw new Error(res.error);
            }
        }
        catch(error){
            console.log(error);
            //navigate('/signin');
        }
    }
    useEffect(() => {
        callContactPage();
    }, []);

    const [messageData, setMessageData] = useState({
        name : "",
        email : "",
        phone : "",
        message : ""
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        //console.log(messageData);
        setMessageData({...messageData, [name]:value});      
    }

    const postMessage = async (e) => {
        e.preventDefault();
        const {name, email, phone, message} = messageData;

        const res = await fetch('/contact', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',   
            },
            body : JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();

        if(!data || res.status != 201){
            showAlert("Message Not Sent", "danger");
        }
        else{
            showAlert("Message Sent Successfully", "success");
            setMessageData({...userData,message : ""});
        }
    }
    return(
        <>
            <div className = "container d-flex flex-column justify-content-center align-items-center">
                <div className = "container mt-5">
                    <div className = "row justify-content-evenly">
                        <div class="card col-lg-3 col-md-3 col-sm-12 shadow">
                            <div class="card-body p-3 container">
                                <section className = "row">
                                    <div className = "col-2 d-flex justify-content-center align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-phone text-primary" viewBox="0 0 16 16">
                                            <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                                            <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                        </svg>
                                    </div>
                                    <div className = "col-10">
                                        <p className = "fw-bold p-0 m-0 contact-card-heading">Phone</p>
                                        <p className = "fw-normal text-secondary p-0 m-0 contact-card-info">8962699754</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div class="card col-lg-3 col-md-3 col-sm-12 shadow">
                            <div class="card-body p-3 container">
                                <section className = "row">
                                    <div className = "col-2 d-flex justify-content-center align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-envelope-fill text-primary" viewBox="0 0 16 16">
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                                        </svg>
                                    </div>
                                    <div className = "col-10">
                                        <p className = "fw-bold p-0 m-0 contact-card-heading">Email</p>
                                        <a href = "mailto:reachshubhishukla@gmail.com" className = "fw-normal text-secondary p-0 m-0 contact-card-info text-decoration-none">nayakanshita27@gmail.com</a>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div class="card col-lg-3 col-md-3 col-sm-12 shadow">
                            <div class="card-body p-3 container">
                                <section className = "row">
                                    <div className = "col-2 d-flex justify-content-center align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house text-primary" viewBox="0 0 16 16">
                                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                                        </svg>
                                    </div>
                                    <div className = "col-10">
                                        <p className = "fw-bold p-0 m-0 contact-card-heading">Address</p>
                                        <p className = "fw-normal text-secondary p-0 m-0 contact-card-info">Tikamgarh, MP, India</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>

                <div className = "container mt-5 mb-5 d-flex flex-column justify-content-center align-items-center">
                    <div id="alert-container"></div>
                    <div className = "row justify-content-center">
                        <div class="card shadow col-12">
                            <div class="card-body">
                                <h3 className = "text-center">Get In Touch</h3>
                                <form action = "" method = "" className = "container">
                                    <div class="row g-3 m-3">
                                        <div class="col">
                                            <input type="text" class="form-control" placeholder="Name" name = "name" value = {userData.name}  onChange = {handleInput} aria-label="Your Name"></input>
                                        </div>
                                        <div class="col">
                                            <input type="text" class="form-control" placeholder="Email" email = "email" value = {userData.email}  onChange = {handleInput} aria-label="Your Name"></input>
                                        </div>
                                        <div class="col">
                                            <input type="text" class="form-control" placeholder="Phone Number" phone = "phone" value = {userData.phone}  onChange = {handleInput} aria-label="Your Phone Number"></input>
                                        </div>
                                    </div>

                                    <div className = "row justify-content-center m-4">
                                        <textarea className = "col-12 form-control" rows = "6" placeholder = "Your Message" name = "message" value = {messageData.message} onChange = {handleInput} ></textarea>
                                    </div>

                                    <div className = "text-center"><button type="submit" class="btn btn-primary ps-4 pe-4" onClick = {postMessage}>Send</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;