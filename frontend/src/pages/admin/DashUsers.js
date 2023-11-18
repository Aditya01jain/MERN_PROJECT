import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { allUserAction } from '../../redux/actions/userAction';
import { toast } from 'react-toastify';

const DashUsers = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allUserAction());
    }, []);


    const { users } = useSelector(state => state.allUsers);
    let data = [];
    data = (users !== undefined && users.length > 0) ? users : []

    const deleteUserById = async (e, id) => {
        const deletedata = {
            id: id
        };
        const response = await fetch('/api/admin/user/delete', {
            method: 'DELETE',
            body: JSON.stringify(deletedata),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.success) {
            toast.success("User deleted successfully");
        }
    }

    const columns = [

        {
            field: 'firstName',
            headerName: 'First Name',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 150,
            editable: true,
        },

        {
            field: 'email',
            headerName: 'E_mail',
            width: 150,
        },

        {
            field: 'role',
            headerName: 'User status',
            width: 150,
            renderCell: (params) => (
                params.row.role === 1 ? "Admin" : "Regular user"
            )
        },

        {
            field: 'createdAt',
            headerName: 'Creation date',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )
        },

        {
            field: "Actions",
            width: 300,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "500px" }}>
                    < Button onClick={(e) => deleteUserById(e, values.row._id)} variant="contained" color="error">Delete</ Button>
                    <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/admin/userjobs/${values.row._id}`}>Applied Jobs</Link></ Button>
                </Box>

            )
        }
    ];

    return (
        <>
            <Box >

                <Typography variant="h4" sx={{ color: "back", pb: 3, fontWeight:"800" }}>
                    ALL USERS
                </Typography>
                <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >

                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            sx={{

                                '& .MuiTablePagination-displayedRows': {
                                    color: 'white',
                                },
                                color: 'white',
                                [`& .${gridClasses.row}`]: {
                                    bgcolor: (theme) =>
                                        // theme.palette.mode === 'light' ? grey[200] : grey[900],
                                        theme.palette.secondary.main
                                },
                                button: {
                                    color: '#ffffff'
                                }

                            }}
                            getRowId={(row) => row._id}
                            rows={data}
                            columns={columns}
                            pageSize={3}
                            rowsPerPageOptions={[3]}
                            slots={{ toolbar: GridToolbar }}
                        />
                    </Box>
                </Paper>

            </Box>
        </>
    )
}

export default DashUsers