import React from "react";

import {
    Card,
    CardContent,
    Paper,
    Typography
} from "@mui/material";

import BackgroundPage from "./BackgroundPage/BackgroundPage.jsx"

export default function NotFoundPage() {
    return (

        <BackgroundPage>
            <Paper elevation={10}>
                <Card>
                    <CardContent>
                        <Typography variant='h2' sx={{mx: 0}}>Page not found!</Typography>
                    </CardContent>
                </Card>
            </Paper>
        </BackgroundPage>
    );
}