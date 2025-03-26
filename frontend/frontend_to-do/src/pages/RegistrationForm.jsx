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
    const navigate = useNavigate(); // Initialize the navigate hook
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    customerId: '',
    customerName: '',
    contactPerson: '',
    shippingAddress: '',
    contactPersonEmail: '',
    organization: '',
    phoneNumber: '',
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
      url: baseUrl + `api/authentication/registration`,
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
    
    if (!formData.userName) validationErrors.userName = "Username is required";
    if (!formData.email) validationErrors.email = "E-mail is required";
    if (!formData.customerName) validationErrors.customerName = "Customer Name is required";
    if (!formData.contactPerson) validationErrors.contactPerson = "Contact Person is required";
    if (!formData.shippingAddress) validationErrors.shippingAddress = "Shipping Address is required";
    if (!formData.contactPersonEmail) validationErrors.contactPersonEmail = "Contact Email is required";
    if (!formData.organization) validationErrors.organization = "Organization is required";
    if (!formData.phoneNumber) validationErrors.phoneNumber = "Phone Number is required";
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
       <strong>NeonVault Wares</strong>
      </Typography>
      <Typography color="black" variant="h5" align="center" gutterBottom>
        Customer Registration
      </Typography>
      <form onSubmit={handleSubmit}>
          <Grid2 item xs={12} marginBottom={2}>
            <TextField
              label="Your Username"
              name="userName"
              fullWidth
              variant="outlined"
              value={formData.userName}
              onChange={handleChange}
              error={!!errors.userName}
              helperText={errors.userName}
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
              label="Your Name"
              name="customerName"
              fullWidth
              variant="outlined"
              value={formData.customerName}
              onChange={handleChange}
              error={!!errors.customerName}
              helperText={errors.customerName}
            />
          </Grid2>

          <Grid2 item xs={12} marginBottom={2}>
            <TextField
              label="Contact Person"
              name="contactPerson"
              fullWidth
              variant="outlined"
              value={formData.contactPerson}
              onChange={handleChange}
              error={!!errors.contactPerson}
              helperText={errors.contactPerson}
            />
          </Grid2>

          <Grid2 item xs={12} marginBottom={2}>
            <TextField
              label="Shipping Address"
              name="shippingAddress"
              fullWidth
              variant="outlined"
              value={formData.shippingAddress}
              onChange={handleChange}
              error={!!errors.shippingAddress}
              helperText={errors.shippingAddress}
            />
          </Grid2>

          <Grid2 item xs={12} marginBottom={2}>
            <TextField
              label="Contact Person Email"
              name="contactPersonEmail"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.contactPersonEmail}
              onChange={handleChange}
              error={!!errors.contactPersonEmail}
              helperText={errors.contactPersonEmail}
            />
          </Grid2>

          <Grid2 item xs={12} marginBottom={2}>
            <TextField
              label="Organization"
              name="organization"
              fullWidth
              variant="outlined"
              value={formData.organization}
              onChange={handleChange}
              error={!!errors.organization}
              helperText={errors.organization}
            />
          </Grid2>

          <Grid2 item xs={12} marginBottom={2}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              fullWidth
              variant="outlined"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
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