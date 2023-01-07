import React from "react";

import {
    Card,
    CardContent,
    Paper
} from "@mui/material";

import ExperienceForm from "../components/ExperienceForm.jsx"
import BackgroundPage from "./BackgroundPage/BackgroundPage.jsx"

function AddExperiencePage() {
    return(
        <BackgroundPage>
        <Paper elevation={10}>
            <Card>
                <CardContent>
                    {/* <Logo/> */}
                    <ExperienceForm/>
                </CardContent>
            </Card>
        </Paper>
    </BackgroundPage>
         
    )
}

export default AddExperiencePage