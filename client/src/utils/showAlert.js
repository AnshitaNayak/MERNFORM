import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';


const showAlert = (message, type) => {
    
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`, `text-center`);
    alertDiv.textContent = message;

    // Append the alert to your desired location
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = ''; // Clear existing alerts
    alertContainer.appendChild(alertDiv);
    alertContainer.classList.add(`w-50`, `p-3`);

    // Automatically remove the alert after a certain time (e.g., 5 seconds)
    setTimeout(() => {
    alertDiv.remove();
    }, 3000);
};

export default showAlert;