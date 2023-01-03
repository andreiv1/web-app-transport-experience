import React from "react";
import "./SignupForm.css";
import { Grid, TextField, Button, Paper, Avatar } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

function SignupForm() {
  return (
    <Grid>
      <Paper elevation={10} id="paperStyle">
        <Grid align="center">
          <Avatar id="avatarStyle">
            <CreateIcon />
          </Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
        />
        <TextField label="Email" placeholder="Enter email" fullWidth required />

        <TextField
          type="password"
          label="Password"
          placeholder="Enter password"
          fullWidth
          required
        />
        <Button id="btnStyle" variant="contained" type="submit" fullWidth>
          Sign Up
        </Button>
      </Paper>
    </Grid>
  );
}

export default SignupForm;
