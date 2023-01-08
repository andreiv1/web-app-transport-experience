import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {
  Card,
  CardContent,
  Container
} from "@mui/material";

//Components
import LoginForm from "../components/LoginForm.jsx";
import Logo from "../components/Logo/Logo.jsx"
import BackgroundPage from "./BackgroundPage/BackgroundPage.jsx"
import AlertSnackBar from "../components/AlertSnackbar";
import { checkToken } from "../components/Auth.jsx";

function LoginPage() {
  const [snackbar, setSnackbar] = useState({show: false});
  const navigate = useNavigate()
  useEffect(() => {
    console.log("check",checkToken())
    switch(checkToken()){
      case 1:
        console.log('go home')
        navigate('/home')
        break;
      case 0:
        setSnackbar({
          show: true,
          message: "Your session has expired.",
          severity: "warning"
        });
        localStorage.removeItem('token')
        break;
    }

  }, [navigate]);

  return (
    <BackgroundPage>

      <Card>
        <AlertSnackBar snackbar={snackbar}/>
        <CardContent>
          {/* <Logo/> */}
          <LoginForm />
        </CardContent>
      </Card>

    </BackgroundPage>


  );
}

export default LoginPage