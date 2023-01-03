import React from "react";
import "./ResetPasswordForm.css";
import { Grid, TextField, Button, Paper, Avatar } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";

function ResetPasswordForm() {
  return (
    <Grid>
      <Paper elevation={10} id="paperStyle">
        <Grid align="center">
          <Avatar id="avatarStyle">
            <LockResetIcon />
          </Avatar>
          <h2>Reset Password</h2>
        </Grid>
        <TextField
          label="New password"
          placeholder="Enter new password"
          fullWidth
          required
        />

        <Button id="btnStyle" variant="contained" type="submit" fullWidth>
          Reset
        </Button>
      </Paper>
    </Grid>
  );
}

export default ResetPasswordForm;
