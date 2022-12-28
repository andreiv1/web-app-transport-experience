import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './LoginForm.css';
import { API_BASE_URL } from '../../config'

function LoginForm(props) {
    return (
        <div class="login-form">
            <TextField id="login-textfield" label="Login" variant="standard" />
            <TextField id="password-textfield" type="password" label="Password" variant="standard" />
            <Button id="login-button" variant="contained">Log in</Button>
            <p>Don't have an account yet? <a href="/signup">Register now</a></p>
            <p>Forgot your password? <a href="/reset-password">Reset your password</a></p>
        </div>
    )
}

export default LoginForm;