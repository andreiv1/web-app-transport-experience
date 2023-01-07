import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

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

import AlertSnackBar from "../AlertSnackbar";

//Icons
import IconButton from "@mui/material/IconButton"
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}


function ResetPasswordSendForm() {
  const [username, setUsername] = useState('');
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

    console.log(payload);

    try {
      const response = await fetch(API_BASE_URL + '/users/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      switch (response.status) {
        case 201:
          setDataSnackbar({
            message: data.message,
            severity: "success"
          });
          break;
        case 401:
          setDataSnackbar({
            message: data.message,
            severity: "error"
          });
          break;
        default:
          setDataSnackbar({
            message: "Password couldn't be changed!",
            severity: "error"
          });
          break;
      }



    }
    catch (err) {
      if (err.message === 'Failed to fetch') {
        setDataSnackbar({
          message: "There is a problem communicating with the server. Please try again later.",
          severity: "error"
        });
      }
      else {
        setDataSnackbar({
          message: "Unknown error. Please try again later.",
          severity: "error"
        });
      }
    }


  };

  return (
    <div>
      <AlertSnackBar data={dataSnackbar} />
      <Grid align="center">
        <Avatar id="avatarStyle">
          <LockIcon />
        </Avatar>
        <h2>Reset Password</h2>
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
        <Grid
          container
          direction="row"
          justifyContent="center"
          spacing={1}
          alignItems="stretch"
        >
      
            <Grid item xs>
              <Button variant="contained" type="submit" fullWidth>
                Reset
              </Button>
            </Grid>
            <Grid item xs>
              <Button variant="contained" onClick={() => { navigate('/login') }} fullWidth>
                Cancel
              </Button>
            </Grid>
        </Grid>

      </form>
    </div>
  );

}

export default ResetPasswordSendForm;
