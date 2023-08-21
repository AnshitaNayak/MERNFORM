import React, {useState, useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import showAlert from '../utils/showAlert.js';
import {userContext} from '../App';

const Signin = () => {

    const {state, dispatch} = useContext(userContext);
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password :""
    });

    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name] : value});
    }

    const loginUser = async(e) => {
        e.preventDefault();
        const{email, password} = user;

        const res = await fetch('/signin', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();
        //console.log(data.status);
        if(data.status == 400 || !data){
            showAlert('Invalid Credentials', 'danger');
        }
        else{ 
            dispatch({type:"USER", payload:true}); 
            showAlert('Login Successful', 'success');
            setUser({email: "", password : ""});
            setTimeout(() => {
                navigate('/');
            },3000);    
        }
    }

    return(
        <>
            <div className = "container d-flex flex-column justify-content-center align-items-center mt-5">
                <div id="alert-container"></div>
                <div className = "signin card p-2 shadow">
                <h3 className = "text-center fw-bold fs-3">Sign In</h3>
                    <div className= "card-body row justify-content-evenly">
                            <div className = "col-lg-5 col-md-12 col-sm-12 d-flex flex-column justify-content-center align-items-center">
                                <img src = "https://img.freepik.com/premium-vector/secure-login-sign-up-concept-illustration-user-use-secure-login-password-protection-website-social-media-account-vector-flat-style_7737-2270.jpg?size=626&ext=jpg&ga=GA1.2.982523913.1691387317&semt=sph" class="img-fluid"></img>
                                <NavLink className = "nav-link rtext" to = "/register">Create an account</NavLink>
                            </div>
                            <div className = "col-lg-6 col-md-12 col-sm-12 d-flex flex-column align-items-center justify-content-center">
                                <form method = "POST" className = "row">
                                    <div className="input-group flex-nowrap mt-4 col-10">
                                        <span className="input-group-text" id="addon-wrapping">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                                            </svg>
                                        </span>
                                        <input type="text" name="email" value = {user.email} onChange = {handleInput} className="form-control custom-fc" placeholder="Your Email" aria-label="Email" aria-describedby="addon-wrapping"></input>
                                    </div>

                                    <div className="input-group flex-nowrap mt-4 col-10">
                                        <span className="input-group-text" id="addon-wrapping">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                            </svg>
                                        </span>
                                        <input type="password" name="password" value = {user.password} onChange = {handleInput} className="form-control custom-fc" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping"></input>
                                    </div>
                                    <div className="text-center"><button type="button" name="signin" value ="signin" onClick = {loginUser} className="btn btn-primary mt-4 mb-4 ps-4 pe-4">LogIn</button></div>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin;