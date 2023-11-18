import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button'

const DashUsers = () => {
    const valueParam = useParams();
    const [userdata, setUserdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/admin/job/${valueParam.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                console.log(data)
                setUserdata(data.applied);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [valueParam.id]);

    const columns = [
        {
            field: 'firstName',
            headerName: 'FirstName',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'LastName',
            width: 150,
            editable: true,
        },{
            field: 'email',
            headerName: 'Email',
            width: 150,
            editable: true,
        }
        
    ];

    if (loading) {
        return <p>Loading...</p>; // You can replace this with a loading spinner or any other UI
    }

    if (error) {
        return <p>{error}</p>; // Display an error message
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ color: 'black', pb: 3 }}>
                ALL USERS
                <Button onClick={()=>navigation(-1)} sx={{ fontSize: "13px",float:"right" }} variant='contained'>back</Button>
            </Typography>
           
            <Paper sx={{ bgcolor: 'white' }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        sx={{
                            '& .MuiTablePagination-displayedRows': {
                                color: 'black',
                            },
                            color: 'black',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) => "#adc3d1",
                            },
                        }}
                        getRowId={(row) => row._id}
                        rows={userdata}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        slots={{ toolbar: GridToolbar }}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default DashUsers;