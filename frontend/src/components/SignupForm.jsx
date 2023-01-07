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
    Link,
    TextField,
} from '@mui/material';

//Icons
import IconButton from "@mui/material/IconButton"
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AlertSnackBar from "./AlertSnackbar";

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}


function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dataSnackbar, setDataSnackbar] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async event => {
        event.preventDefault();

        const payload = { username: username, password: password, email: email };
        console.log(payload);

        await fetch(API_BASE_URL + '/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).then(response => {

            if (response.status === 201) {
                setDataSnackbar({
                    message: "Your account was successfuly created!",
                    severity: "success"
                });
            } else {
                setDataSnackbar({
                    message: "There was a problem with signup. Please try again later.",
                    severity: "error"
                });
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
                    setDataSnackbar({
                        message: "Unknown error. Please try again later.",
                        severity: "error"
                    });
                }
            });

    };

    //Username state for validation
    const [usernameAvailability, setUsernameAvailability] = useState(true);

    const checkUsernameAvailability = async () => {
        try {
            const response = await fetch(API_BASE_URL + '/users/checkAvailability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username })
            });
            console.log("Response:", response);
            const data = await response.json();
            console.log("Data:", data);
            setUsernameAvailability(data.message);

        }
        catch (err) {
            console.log(err.message)
        }
    };

    //Email state for availability & validation
    const [emailAvailability, setEmailAvailability] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    const checkEmailAvailability = async () => {

        //Before, check locally if email matches regex
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i;
        if(email != '' && !regex.test(email)){
            setEmailAvailability(false);
            setEmailErrorMessage('Enter the email format, like name@domain.com')
            return;
        }
        try {
            const response = await fetch(API_BASE_URL + '/users/checkAvailability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
            console.log("Response:", response);
            const data = await response.json();
            console.log("Data:", data);
            setEmailAvailability(data.message);
            setEmailErrorMessage('Sorry, there is already an account with this email..')

        }
        catch (err) {
            console.log(err.message)
        }
    }



    
    return (
        <div>
            <AlertSnackBar data={dataSnackbar} />
            <Grid align="center">
                <Avatar id="avatarStyle">
                    <CreateIcon />
                </Avatar>
                <h2>Sign Up</h2>
            </Grid>
            <form onSubmit={handleSubmit}>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        label="Username"
                        placeholder="Enter username"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <AccountCircleIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        required
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        onBlur={() => checkUsernameAvailability()}
                        helperText={usernameAvailability === false && (
                            <p>This username is already in use.</p>
                        )}
                        error={!usernameAvailability}
                        
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        label="Email"
                        placeholder="Enter email"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <MailOutlineIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        required
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        onBlur={() => checkEmailAvailability()}
                        helperText={emailAvailability === false && (
                            <p>{emailErrorMessage}</p>
                        )}
                        error={!emailAvailability}
                        
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

                <Button id="btnStyle" variant="contained" type="submit" fullWidth
                    disabled={(!usernameAvailability || !emailAvailability)}>
                    Sign Up
                </Button>
            </form>
            <Grid container
                direction="row"
                justifyContent="flex-end"
                alignItems="center">
                <Grid item>
                    <Link onClick={() => navigate("/login")} variant="body2">
                        I already have an account
                    </Link>
                </Grid>
            </Grid>
        </div>
    );

}

export default SignupForm;
