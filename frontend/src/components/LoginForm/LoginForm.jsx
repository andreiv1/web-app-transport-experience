import React from "react";
import "./LoginForm.css";
import { API_BASE_URL } from "../../config";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Avatar,
  Typography,
  Link,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

function LoginForm() {
  return (
    <Grid>
      <Paper elevation={10} id="paperStyle">
        <Grid align="center">
          <Avatar id="avatarStyle">
            <LockIcon />
          </Avatar>
          <h2>Log In</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
        />

        <TextField
          type="password"
          label="Password"
          placeholder="Enter password"
          fullWidth
          required
        />
        <Button id="btnStyle" variant="contained" type="submit" fullWidth>
          Log in
        </Button>
        <Typography>
          Forgot your password?
          <Link href="/reset-password">Reset password</Link>
        </Typography>
        <Typography>
          Don't you have an account?
          <Link href="/signup">Register now</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default LoginForm;
