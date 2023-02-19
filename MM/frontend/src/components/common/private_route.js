import React from 'react';
import { Route, Navigate,Routes } from 'react-router-dom';

import DashboardContent from "../app_layout/Dashboard"

import DashboardLaboristeContent from "../laboriste_layout/Dashboard"



function PrivateRoute() {

    const token = localStorage.getItem("auth_token");
    const user_type = localStorage.getItem("user_type");
    

    if (!token) {
        return <Navigate to="/login"/>;
    } else{
        if(user_type == "RECEPTION") {
            return <DashboardContent/>;
        } else if(user_type == "ADMIN" || user_type =="LABORATOIRE"){
            return <DashboardLaboristeContent/>;
        }
    } 
}




export default PrivateRoute;