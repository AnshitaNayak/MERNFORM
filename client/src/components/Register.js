import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import showAlert from '../utils/showAlert.js';

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name : "",
        email : "",
        phone : "",
        work : "",
        password : "",
        cpassword : ""
    })

    let name, value;
    const handleInput = (event) => {
        console.log(event);
        console.log(user);
        name = event.target.name;
        value = event.target.value;

        setUser({...user, [name] : value});
    }

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, phone, work, password, cpassword } = user;
        const res = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                name,
                email,
                phone,
                work,
                password,
                cpassword,
            }),
        });

        const data = await res.json();
        console.log("Response Data:", data);
        console.log("a",data.status);
        if (data.status == 422 || data.status == 400 || !data) {
            showAlert('Invalid Registration', 'danger');
        } else {
            showAlert('Registration Successful', 'success');
            //navigate('/signin');
            setUser({
                name : "",
                email : "",
                phone : "",
                work : "",
                password : "",
                cpassword : ""
            });
            setTimeout(() => {
                navigate('/signin');
            },3000);
        }
    };

    

    return(
        <>
            <div className="container d-flex flex-column justify-content-center align-items-center pb-5 mt-5">
                <div id="alert-container"></div>
                <div className="signup card p-2 shadow">
                    <div className="card-body row justify-content-evenly">
                        <h3 className = "text-center fw-bold fs-3">Sign Up</h3>
                        <div className='col-lg-6 col-md-12 col-sm-12'>
                            <form method = "POST">
                            <div className="input-group flex-nowrap mt-3">
                                <span className="input-group-text" id="addon-wrapping">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    </svg>
                                </span>
                                <input type="text" name="name" value = {user.name} onChange = {handleInput} className="form-control custom-fc" placeholder="Your Name" aria-label="Username" aria-describedby="addon-wrapping"></input>
                            </div>

                            <div className="input-group flex-nowrap mt-4">
                                <span className="input-group-text" id="addon-wrapping">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                                    </svg>
                                </span>
                                <input type="text" name="email" value = {user.email} onChange = {handleInput} className="form-control custom-fc" placeholder="Your Email" aria-label="Email" aria-describedby="addon-wrapping"></input>
                            </div>

                            <div className="input-group flex-nowrap mt-4">
                                <span className="input-group-text" id="addon-wrapping">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-plus-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM12.5 1a.5.5 0 0 1 .5.5V3h1.5a.5.5 0 0 1 0 1H13v1.5a.5.5 0 0 1-1 0V4h-1.5a.5.5 0 0 1 0-1H12V1.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </span>
                                <input type="number" name="phone" value = {user.phone} onChange = {handleInput} className="form-control custom-fc" placeholder="Your Mobile Number" aria-label="Phone" aria-describedby="addon-wrapping"></input>
                            </div>

                            <div className="input-group flex-nowrap mt-4">
                                <span className="input-group-text" id="addon-wrapping">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-square" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        <path d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                                    </svg>
                                </span>
                                <input type="text" name="work" value = {user.work} onChange = {handleInput} className="form-control custom-fc" placeholder="Your Proffesion" aria-label="Work" aria-describedby="addon-wrapping"></input>
                            </div>

                            <div className="input-group flex-nowrap mt-4">
                                <span className="input-group-text" id="addon-wrapping">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                    </svg>
                                </span>
                                <input type="password" name="password" value = {user.password} onChange = {handleInput} className="form-control custom-fc" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping"></input>
                            </div>

                            <div className="input-group flex-nowrap mt-4">
                                <span className="input-group-text" id="addon-wrapping">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                                    </svg>
                                </span>
                                <input type="password" name="cpassword" value = {user.cpassword} onChange = {handleInput} className="form-control custom-fc" placeholder="Confirm Your Password" aria-label="Cpassword" aria-describedby="addon-wrapping"></input>
                            </div>

                            <div className="text-center"><button type="button" name="signup" value ="register" onClick = {postData} class="btn btn-primary mt-4 mb-4 ps-4 pe-4">Register</button></div>
                            </form>
                        </div>
                        <div className="col-lg-4  col-md-12 col-sm-12 d-flex flex-column justify-content-center align-items-center">
                            <img src = "https://t2.gstatic.com/images?q=tbn:ANd9GcSYHnXcV0KqGJJjxE8GpMbemL1RuXwWRD75eP1eJdnbUfgGiPp6" className="img img-responsive img-fluid"></img>
                            <p className = "rtext text-center"><NavLink className="nav-link" to="/signin">I am already registered</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;