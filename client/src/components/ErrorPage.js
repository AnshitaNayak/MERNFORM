import React from 'react';
import {NavLink} from 'react-router-dom';

const ErrorPage = () => {
    return(
        <>    
        <div className = "vh-100 d-flex justify-content-center align-items-center">
            <div className = "upperdiv fw-bold">404</div>
        </div>
        <div className = "lowerdiv text-center">
            <p className ="fs-2 fw-bold">WE ARE SORRY, PAGE NOT FOUND!</p>
            <p className = "fs-4 fw-normal">The Page You Have Been Looking For Might Be Removed, Had Its, Name Changed Or Is Temporary Unavailable</p>
            <NavLink to = "/" className ="btn btn-primary rounded-pill ps-3 pe-3">Back To Home Page</NavLink>
        </div>
        </>
    )
}

export default ErrorPage;