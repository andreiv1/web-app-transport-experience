import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {
    Card,
    CardContent,
    Paper
} from "@mui/material";

//Components
import Logo from "../components/Logo/Logo.jsx"
import BackgroundPage from "./BackgroundPage/BackgroundPage.jsx"
import ResetPasswordSendForm from "../components/ResetPasswordForm/ResetPasswordSendForm.jsx";
import ResetPasswordChangeForm from "../components/ResetPasswordForm/ResetPasswordChangeForm.jsx";

export default function ResetPasswordPage(props) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    return (
        <BackgroundPage>
            <Paper elevation={10}>
                <Card>
                    <CardContent>
                        {/* <Logo/> */}
                        
                        {token ? (
                            <ResetPasswordChangeForm/>
                        ) : (
                            <ResetPasswordSendForm/>
                        )}
                       
                    </CardContent>
                </Card>
            </Paper>
        </BackgroundPage>


    );
}