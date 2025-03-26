import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid2,
  Checkbox,
  FormControlLabel,
  Box
} from '@mui/material';
import { Link , useNavigate} from 'react-router-dom';
import axios from "axios";
import {baseUrl} from "../Constants";

const RegistrationForm = () => {
    const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const submitForm = (formData) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl + `register/`,
      data : formData
    };

    axios.request(config)
    .then((response) => {
      alert("Registration successful!");
      navigate('/login');
    })
    .catch((error) => {
      console.log(error);
      alert("Registration failed. Please try again. (Username might be taken)");
    });
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    let validationErrors = {};
    
    if (!formData.username) validationErrors.username = "Username is required";
    if (!formData.email) validationErrors.email = "E-mail is required";
    if (!formData.password) validationErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = "Passwords do not match";
    if (!formData.termsAccepted) validationErrors.termsAccepted = "You must accept the Terms & Conditions";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      // Submit the form data to the server

      submitForm(formData);
      console.log("Form Data Submitted: ", formData);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{backgroundColor: 'white', p: 9, borderRadius: 6}}>
      <Typography color="black" variant="h5" align="center" gutterBottom>
        Registration
      </Typography>
      <form onSubmit={handleSubmit}>
          <Grid2 item xs={12} marginBottom={2}>
            <TextField
              label="Your Username"
              name="username"
              fullWidth
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
          </Grid2>

          <Grid2 item xs={12} marginBottom={2}>
            <TextField
              label="Your login e-mail address"
              name="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid2>
          <Grid2 item xs={12} marginBottom={2}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid2>

          <Grid2 item xs={12} marginBottom={2}>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </Grid2>

          <Grid2 item xs={12} marginBottom={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="I accept the Terms & Conditions"
              sx={{ color: "black" }}
            />
            {errors.termsAccepted && (
              <Typography color="error" variant="body2">
                {errors.termsAccepted}
              </Typography>
            )}
          </Grid2>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>

      <Box mt={2} textAlign="center">
        <Typography variant="body2" color='black'>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegistrationForm;