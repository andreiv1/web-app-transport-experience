import React from "react";

import { Card, CardContent, Paper, Grid } from "@mui/material";

//Components
import ProfileForm from "../components/ProfileForm.jsx";
import NavBar from "../components/NavBar";



export default function ProfilePage() {
  return (
    <>
      <NavBar />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="top"
      ></Grid>
      <Paper elevation={10}>
        <Card>
          <CardContent>
            {/* <Logo/> */}
            <ProfileForm />
          </CardContent>
        </Card>
      </Paper>
    </>

  );
}
