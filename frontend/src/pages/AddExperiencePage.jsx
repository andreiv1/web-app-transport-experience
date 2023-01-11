import React from "react";

import {
    Card,
    CardContent,
    Paper,
    Grid
} from "@mui/material";

import NavBar from "../components/NavBar.jsx"
import ExperienceForm from "../components/ExperienceForm.jsx"

function AddExperiencePage() {
    return (
        <>
            <NavBar />

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="top"
                >
                    <Paper elevation={10} sx={{ maxWidth: 550, width: 600, mt: 3 }}>
                        <Card>
                            <CardContent>
                                {/* <Logo/> */}
                                <ExperienceForm />
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
 



        </>

    )
}

export default AddExperiencePage