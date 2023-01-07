import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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


function ResetPasswordChangeForm() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [dataSnackbar, setDataSnackbar] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const handleSubmit = async event => {
    event.preventDefault();
    if(password != repeatPassword) {
      setPasswordMatch(false);
      setDataSnackbar({
        message: "Passwords do not match!",
        severity: "error"
      });
      return;
    } else{
      setPasswordMatch(true);
    }
    try {
      let payload = { token: token, password: password };
      const response = await fetch(API_BASE_URL + '/users/updatePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      switch (response.status) {
        case 201:
          setDataSnackbar({
            message: "Password changed successfully!",
            severity: "success"
          });
          break;
        case 403:
          setDataSnackbar({
            message: "The reset link is expired!",
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
            type="password"
            label="Password"
            placeholder="Enter new password"
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
            error={!passwordMatch}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <TextField
            type="password"
            label="Password"
            placeholder="Repeat new password"
            required
            value={repeatPassword}
            onChange={event => setRepeatPassword(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <PasswordIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={!passwordMatch}
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

export default ResetPasswordChangeForm;
