import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import jwtDecode from 'jwt-decode';

export const checkToken = () => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const decodedToken = jwtDecode(token)
            //Check if token is valid
            const currentTime = Date.now() / 1000;
            if (currentTime < decodedToken.exp) {
                //Token valid, allow access
                return 1;
            }
        }
        catch (err) {
            //Token invalid
        }
    }
    //No token found
    return 0;
}

function Auth() {
    const location = useLocation();
    if (checkToken()) {
        return <Outlet/>;
    }
    return <Navigate to="/login" replace state={{from: location}}/>
}

export default Auth;