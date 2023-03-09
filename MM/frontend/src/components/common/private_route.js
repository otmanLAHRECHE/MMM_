import React from 'react';
import { Route, Navigate,Routes } from 'react-router-dom';

import DashboardContent from "../app_layout/Dashboard"




function PrivateRoute() {

    const token = localStorage.getItem("auth_token");
    

    if (!token) {
        return <Navigate to="/login"/>;
    } else{
        return <DashboardContent/>;
    } 
}

export default PrivateRoute;