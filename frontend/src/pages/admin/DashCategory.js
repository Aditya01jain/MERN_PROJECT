import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { toast } from 'react-toastify';
import moment from 'moment'


const DashCategory = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobTypeLoadAction())
    }, []);


    const { jobType, loading } = useSelector(state => state.jobTypeAll);
    let data = [];
    data = (jobType !== undefined && jobType.length > 0) ? jobType : []

    //delete job by Id
    const deleteJobCategoryById = async (e, id) => {
        const deletedata={
            id:id
        };
        const response = await fetch('/api/type/delete', {
            method: 'DELETE',
            body: JSON.stringify(deletedata),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if(data.success){
            toast.success("JOB_TYPE deleted successfully");
          }
    }

    const columns = [

        
        {
            field: 'jobTypeName',
            headerName: 'Category',
            width: 150,
        },
        {
            field: 'createdAt',
            headerName: 'Create At',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )

        },

        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    < Button onClick={(e) => deleteJobCategoryById(e, values.row._id)} variant="contained" color="error">Delete</ Button>
                </Box>
            )
        }
    ];


    return (
        <Box >

            <Typography variant="h4" sx={{ color: "black", pb: 3, fontWeight:"750" }}>
                JOB CATEGORY 
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant="contained" color="success" startIcon={<AddIcon />}><Link style={{ color: "white", textDecoration: "none" }} to='/admin/category/create'>Create category</Link></ Button>
            </Box>
            <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >

                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
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
                        rows={data}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                    // components={{ Toolbar: GridToolbarExport }}
                    />
                </Box>
            </Paper>

        </Box>
    )
}

export default DashCategory