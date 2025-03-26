import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MainPage = () => {
    return (
        <Box>
        <Typography variant="h4" align="center">
            Welcome to the To-Do App!
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Link to="/main-page/create-task">
            <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                Create Task
            </Button>
            </Link>
        </Box>
        </Box>
    );
    };

export default MainPage;