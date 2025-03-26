import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Checkbox, Box } from '@mui/material';
import '@fontsource/roboto/300.css';
import axios from 'axios';
import { baseUrl } from '../Constants';
import { Link } from 'react-router-dom';

const Login = () => {

    localStorage.removeItem('authtoken');
    localStorage.removeItem('user_id');

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: baseUrl + `login/`,
          headers: {},
          data: {
            username: userName,
            password: password
          }
        };
    
        axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            localStorage.setItem('authtoken', response.data.token);
            localStorage.setItem('user_id', response.data.user_id);
            alert('Login successful!');
          })
          .catch((error) => {
            alert('Invalid email or password');
            console.log(error);
          });
      };
    return (
        <Container>
            <Box sx={{
                flexDirection: 'column',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                justifyContent: 'center'
            }}>
            <Typography variant="h4" align="center" color='black'>Login</Typography>
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type='password'
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleLogin}>
                    Login
                </Button>
            </Box>
            <Link to="/registration">Don't have an account? Register</Link>
            </Box>
        </Container>
    );
}

export default Login;