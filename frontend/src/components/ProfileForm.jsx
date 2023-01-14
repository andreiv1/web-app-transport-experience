import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import getUserData from "../utils/getUserData";
//Icons
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AlertSnackBar from "./AlertSnackbar";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";


export default function ProfileForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dataSnackbar, setDataSnackbar] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {};
    if (username.length > 0) {
      payload["username"] = username;
    }
    if (email.length > 0) {
      payload["email"] = email;
    }
    if (password.length > 0) {
      payload["password"] = password;
    }
    console.log(payload);

    await fetch(API_BASE_URL + "/users/edit/" + getUserData().id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.status === 200) {
          setDataSnackbar({
            message: "Your account was successfuly updated!",
            severity: "success",
          });
        } else {
          setDataSnackbar({
            message:
              "There was a problem with updating. Please try again later.",
            severity: "error",
          });
        }
        return response.json();
      })
      .then((data) => {
        if ("newToken" in data) localStorage.setItem("token", data.newToken);
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") {
          setDataSnackbar({
            message:
              "There is a problem communicating with the server. Please try again later.",
            severity: "error",
          });
        } else {
          setDataSnackbar({
            message: "Unknown error. Please try again later.",
            severity: "error",
          });
        }
      });
  };

  //Username state for validation
  const [usernameAvailability, setUsernameAvailability] = useState(true);

  const checkUsernameAvailability = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/users/checkAvailability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      });
      console.log("Response:", response);
      const data = await response.json();
      console.log("Data:", data);
      setUsernameAvailability(data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  //Email state for availability & validation
  const [emailAvailability, setEmailAvailability] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const checkEmailAvailability = async () => {
    //Before, check locally if email matches regex
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i;
    if (email != "" && !regex.test(email)) {
      setEmailAvailability(false);
      setEmailErrorMessage("Enter the email format, like name@domain.com");
      return;
    }
    try {
      const response = await fetch(API_BASE_URL + "/users/checkAvailability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      console.log("Response:", response);
      const data = await response.json();
      console.log("Data:", data);
      setEmailAvailability(data.message);
      setEmailErrorMessage(
        "Sorry, there is already an account with this email.."
      );
    } catch (err) {
      console.log(err.message);
    }
  };


  const handleDisableAccount = async () => {
    const response = await fetch(API_BASE_URL + "/users/disableAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      }
    });
    console.log("Response:", response);
    navigate('/login')
    localStorage.removeItem('token')
  };

  return (
    <Grid>
      <AlertSnackBar data={dataSnackbar} />
      <Grid align="center">
        <Avatar id="avatarStyle">
          <PersonIcon />
        </Avatar>
        <h2>Profile</h2>
      </Grid>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        color="error"
        onClick={() => handleDisableAccount()}
        fullWidth>
        Disable account
      </Button>
      <form onSubmit={handleSubmit}>
        <FormControl margin="normal" fullWidth>
          <TextField
            label="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <AccountCircleIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            defaultValue={getUserData().username}
            disabled
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <TextField
            label="Change Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <AccountCircleIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(event) => setUsername(event.target.value)}
            onBlur={() => checkUsernameAvailability()}
            helperText={
              usernameAvailability === false && (
                <p>This username is already in use.</p>
              )
            }
            error={!usernameAvailability}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <TextField
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <MailOutlineIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            defaultValue={getUserData().email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => checkEmailAvailability()}
            helperText={
              emailAvailability === false && <p>{emailErrorMessage}</p>
            }
            error={!emailAvailability}
            disabled={true}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <TextField
            label="Change Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <MailOutlineIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <TextField
            type="password"
            label="Change Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <PasswordIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        <Stack spacing={2}>
          <Button
            id="btnStyle"
            variant="contained"
            type="submit"
            disabled={!usernameAvailability || !emailAvailability}
          >
            Save changes
          </Button>

        </Stack>
      </form>
    </Grid>
  );
}
