import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import jwtDecode from 'jwt-decode';
import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  TextField,
} from '@mui/material';


//Icons
import IconButton from "@mui/material/IconButton"
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';

import AlertSnackBar from "./AlertSnackbar";

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dataSnackbar, setDataSnackbar] = useState({});

  const navigate = useNavigate();


  const handleSubmit = async event => {
    event.preventDefault();

    let payload = {};
    if (isValidEmail(username)) {
      payload['email'] = username;
    } else {
      payload['username'] = username;
    }
    payload['password'] = password;
    console.log(payload);

    await fetch(API_BASE_URL + '/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(response => response.json())
      .then(data => {
        if ("authToken" in data) {
          localStorage.setItem("token", data.authToken);
          navigate("/home")
        }
        else {
          setDataSnackbar({
            message: data.error,
            severity: "error"
          });
          console.log(data)
        }
      })
      .catch(err => {
        if (err.message === 'Failed to fetch') {
          setDataSnackbar({
            message: "There is a problem communicating with the server. Please try again later.",
            severity: "error"
          });
        }
        else {
          console.log(err)
          setDataSnackbar({
            message: "Unknown error. Please try again later.",
            severity: "error"
          });
        }
      });
  };

  

  return (
    <div>
      <AlertSnackBar data={dataSnackbar} />
      <Grid align="center">
        <Avatar id="avatarStyle">
          <LockIcon />
        </Avatar>
        <h2>Sign In</h2>
      </Grid>
      <form onSubmit={handleSubmit}>
        <FormControl margin="normal" fullWidth>
          <TextField
            label="Username"
            placeholder="Enter username or email"
            required
            value={username}
            onChange={event => setUsername(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <AccountCircleIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <TextField
            type="password"
            label="Password"
            placeholder="Enter password"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <PasswordIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </FormControl>
        <Button id="btnStyle" variant="contained" type="submit" fullWidth>
          Log in
        </Button>
      </form>
      <Grid container>
        <Grid item xs>
          <Link onClick={() => navigate("/resetPassword")} variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link onClick={() => navigate("/signup")} variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </div>
  );

}


export default LoginForm;
