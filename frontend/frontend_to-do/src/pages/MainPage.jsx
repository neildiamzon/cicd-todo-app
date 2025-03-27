import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    MenuItem,
    Typography,
    Button,
    Box,
    AppBar,
    Toolbar,
    ButtonGroup,
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RefreshIcon from '@mui/icons-material/Refresh';
import ToDoDetailsModal from "../components/Modal/ToDoDetailsModal.jsx";
import ToDoCreateModal from "../components/Modal/ToDoCreateModal.jsx";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


import axios from "axios";
import { baseUrl } from "../Constants";

const columns = [
    {
        field: "title", headerName: "To-Do", flex: 1,
        renderCell: (params) => (
            <span
                style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => params.api.getRow(params.id).handleNoteClick(params.row)}
            >
                {params.value}
            </span>
        ),
    },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "due_date", headerName: "Due Date", flex: 1 },
    { field: "priority", headerName: "Priority", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "created_at", headerName: "Date Created", flex: 1 },
    { field: "updated_at", headerName: "Date Updated", flex: 1 },
];
const options = ['Create a ToDo', 'Start ToDo(s)', 'Complete ToDo(s)', 'Delete ToDo(s)'];
const MainPage = () => {

    const anchorRef = React.useRef(null);

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedNote, setSelectedNote] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchColumn, setSearchColumn] = useState("title");
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [message, setMessage] = useState("");
    const [open, setOpen] = React.useState(false);
    const [todos, setTodos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10
    });

    const navigate = useNavigate();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCreateModalOpen(false);
        setSelectedNote(null);
    };

    const selectedTodos = todos.filter((row) => rowSelectionModel.includes(row.id));

    const filteredRows = todos.filter((row) =>
        row[searchColumn]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleNoteClick = (todo) => {
        console.log(todo)
        setSelectedNote(todo);
        setModalOpen(true);
    };

    const handleClick = () => {
        let selectedOption = options[selectedIndex];

        console.info(`You clicked ${selectedOption}`);
        if (selectedOption === 'Create a ToDo') {
            setCreateModalOpen(true);
        } else if (selectedOption === 'Complete ToDo(s)') {
            handleBatchAction('complete');
        } else if (selectedOption === 'Delete ToDo(s)') {
            handleBatchAction('delete');
        } else if (selectedOption === 'Start ToDo(s)') {
            handleBatchAction('in_progress');
        }
    };

    const handleDeleteTodos = (ids) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: baseUrl + `api/todo/batch_delete/`, 
            headers: {
                Authorization: `Token ${localStorage.getItem("authtoken")}`,
            },
            data: {
                "ids": ids
            }
        };
        axios.request(config)
            .then((response) => {
                alert("To-Do(s) deleted successfully!");
                handleGetTodos();
            })
            .catch((error) => {
                alert('Error has occurred');
                console.log(error);
            })

    }

    const handleBatchAction = (action) => {
        if (rowSelectionModel.length === 0) {
            alert("Please select at least one To-Do to perform this action.");
            return;
        }
        if (action === 'delete') {
            if (window.confirm("Are you sure you want to delete the selected To-Do(s)?")) {
                console.log("Deleting To-Do(s):", rowSelectionModel);
                handleDeleteTodos(rowSelectionModel);
                return;
            }
        }
        console.log(rowSelectionModel);
        const body = {
            "ids": rowSelectionModel,
            "status": action
        }

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: baseUrl + `api/todo/batch_update_status/`, 
            headers: {
                Authorization: `Token ${localStorage.getItem("authtoken")}`,
            },
            data: body
        };

        axios.request(config)
            .then((response) => {
                alert("To-Do updated successfully!");
                handleGetTodos();
            })
            .catch((error) => {
                alert('Error has occurred');
                console.log(error);
            })
    }


    const handleLogout = () => {
        alert('Logging out');
        localStorage.removeItem('authtoken');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        navigate('/login');
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    useEffect(() => {
        handleGetTodos();
    }, []);

    const handleGetTodos = () => {
        setLoading(true);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl + `api/todo`,
            headers: {
                Authorization: `Token ${localStorage.getItem("authtoken")}`,
            },
        };

        axios.request(config)
            .then((response) => {
                setTodos(response.data);
            })
            .catch((error) => {
                alert('Error has occurred');
                console.log(error);
            }).finally(() => {
                setLoading(false);
            });
    };
    return (
        <Container maxWidth="xl" sx={{ mt: 2, width: "100%", backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Welcome, {localStorage.getItem('username')}!</Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Typography variant="h4" gutterBottom sx={{ mb: 2, mt: 5, color: 'black' }}>
                My To-Dos
            </Typography>

            <Box sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', borderColor: 'divider' }}>
                    <TextField
                        select
                        label="Search By"
                        value={searchColumn}
                        onChange={(e) => setSearchColumn(e.target.value)}
                        sx={{ mr: 2, width: 150 }}
                    >
                        {columns.map((col) => (
                            <MenuItem key={col.field} value={col.field}>
                                {col.headerName}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label={`Search ${columns.find((col) => col.field === searchColumn)?.headerName}`}
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ width: 300 }}
                    />

                    <Button
                        id="refresh-button"
                        onClick={handleGetTodos}
                        variant="contained"
                        startIcon={<RefreshIcon />}
                        sx={{ ml: 2, mr: 2 }}
                    >
                        Refresh
                    </Button>
                </Box>
                <Typography variant="body1" color="green" style={{ marginTop: 10 }}>
                    {message}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ButtonGroup
                        variant="contained"
                        ref={anchorRef}
                        aria-label="Button group with a nested menu"
                    >
                        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                        <Button
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            <ArrowDropDownIcon />
                        </Button>
                    </ButtonGroup>

                    <Popper
                        sx={{ zIndex: 1 }}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Box>
            </Box>
            <Box sx={{ width: '100%', mt: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderColor: 'divider' }}>
                <DataGrid
                    rows={filteredRows.map((row) => ({ ...row, handleNoteClick }))}
                    columns={columns}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelection) => setRowSelectionModel(newSelection)}
                    rowSelectionModel={rowSelectionModel}
                    loading={loading}
                    localeText={{ noRowsLabel: 'No To-Dos yet.. Create one!' }}
                    pageSize={10}
                    pagination
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    disableRowSelectionOnClick
                />
            </Box>
            {selectedNote && (
                <ToDoDetailsModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    todo={selectedNote}
                    refreshParent={handleGetTodos} />
            )}
            <ToDoCreateModal
                open={createModalOpen}
                onClose={handleCloseModal}
                refreshParent={handleGetTodos} />
        </Container>
    );
};

export default MainPage;