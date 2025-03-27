import React, { useState } from "react";
import dayjs from "dayjs";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    InputLabel,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
import { baseUrl } from "../../Constants";

const TodoEditModal = ({ open, onClose, todo, refreshParent }) => {
    console.log("selected: ",  dayjs(todo.due_date));
    const [formData, setFormData] = useState(todo ||
    {
        due_date: dayjs(),
    });
    const [selectedDate, setSelectedDate] = useState(dayjs());

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    };

    // Save Changes
    const handleSave = () => {
        console.log(formData);
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: baseUrl + `api/todo/${formData.id}/`,
            headers: {
                Authorization: `Token ${localStorage.getItem("authtoken")}`,
            },
            data: formData
        };

        axios.request(config)
            .then((response) => {
                alert("To-Do updated successfully!");
                refreshParent();
            })
            .catch((error) => {
                alert('Error has occurred');
                console.log(error);
            }).finally(() => {
                onClose(); // Close modal
            });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography color="black" variant="h6" sx={{ mb: 2 }}>
                    Edit To-Do
                </Typography>

                <TextField
                    label="Title"
                    name="title"
                    fullWidth
                    value={formData.title || ""}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />

                <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    multiline
                    rows={3}
                    value={formData.description || ""}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{ mb: 2 }}>
                        <DatePicker
                            label="Due Date"
                            name="due_date"
                            value={dayjs(formData.due_date)}
                            onChange={(formatedDate) => {
                                setFormData({
                                    ...formData,
                                    due_date: formatedDate? dayjs(formatedDate) : null, // Update the due_date field with the selected date
                                });
                            }}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth InputLabelProps={{ shrink: true }} />
                            )}
                        />
                    </Box>
                </LocalizationProvider>
                <InputLabel id="select-label">Priority</InputLabel>
                <Select
                    name="priority"
                    fullWidth
                    value={formData.priority || "medium"}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                </Select>
                <InputLabel id="select-label">Status</InputLabel>
                <Select
                    name="status"
                    fullWidth
                    value={formData.status || "pending"}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="complete">Completed</MenuItem>
                </Select>

                <Box sx={{ display: "flex", mt: 2 }}>
                    <Button variant="contained" color="error" onClick={onClose} sx={{ mr: 2 }}>
                        Close
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default TodoEditModal;
