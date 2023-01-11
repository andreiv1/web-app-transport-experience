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
      >
        <Paper elevation={10} sx={{ maxWidth: 550, width: 600, mt: 3 }}>
          <Card>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </>

  );
}
