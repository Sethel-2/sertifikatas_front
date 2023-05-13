import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from './storage';


const PrivateRoute = (component, userRole = "any") => {
    const user = getUser()
    if(user && (userRole === "any" || user.role===userRole)){
        return component
    }
    return <Navigate to = "/" />
};

export default PrivateRoute;