import React, { useState, useEffect } from "react";
import { Card, CardContent, Paper, Grid } from "@mui/material";
import NavBar from "../components/NavBar.jsx";
import ExperienceForm from "../components/ExperienceForm.jsx";
import EditExperienceForm from "../components/EditExperienceForm.jsx";

export default function EditExperiencePage() {
  return (
    <>
      <NavBar />
      <Grid container direction="row" justifyContent="center" alignItems="top">
        <Paper elevation={10}>
          <Card>
            <CardContent>
              {/* <Logo/> */}
              <EditExperienceForm />
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </>
  );
}
