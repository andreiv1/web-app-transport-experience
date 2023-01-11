import React from "react";

import {
    Card,
    CardContent,
    Paper
} from "@mui/material";

//Components
import SignupForm from "../components/SignupForm.jsx";
import Logo from "../components/Logo/Logo.jsx"
import BackgroundPage from "./BackgroundPage/BackgroundPage.jsx"

export default function SignupPage() {
    return (

        <BackgroundPage>
            <Paper elevation={10}>
                <Card>
                    <CardContent>
                        {/* <Logo/> */}
                        <SignupForm />
                    </CardContent>
                </Card>
            </Paper>
        </BackgroundPage>


    );
}