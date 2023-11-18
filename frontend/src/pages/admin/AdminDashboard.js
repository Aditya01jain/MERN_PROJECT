import { Box, Stack, Typography } from '@mui/material';
import StatComponent from '../../component/StatComponent';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { jobLoadAction } from '../../redux/actions/jobAction';
import CategoryIcon from '@mui/icons-material/Category';
import { allUserAction } from '../../redux/actions/userAction';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';


const AdminDashboard = () => {



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobLoadAction());
        dispatch(allUserAction());
        dispatch(jobTypeLoadAction());
    }, []);
    
    const { jobType } = useSelector((state) => state.jobTypeAll);
    const jobTypeCount = jobType !== undefined ? jobType.length : 0;
    
    const { jobs, loading } = useSelector((state) => state.loadJobs);
    const jobCount = jobs !== undefined ? jobs.length : 0;
    const { users } = useSelector(state => state.allUsers);
    let data = [];
    data = (users !== undefined && users.length > 0) ? users : []
    const user=data.length;
    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "Black", pb: 3 ,fontWeight:'600'}}>
                    Dashboard
                </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >

                    <StatComponent
                        value={`${user}`}
                        icon={<SupervisorAccountIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Registered Users"
                        money=''
                    />
                    <StatComponent
                        value={`${jobCount}`}
                        icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Jobs"
                        money=''
                    />
                    <StatComponent
                        value={`${jobTypeCount}`}
                        icon={<CategoryIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Jobs categories"
                        money=''
                    />

                </Stack>

            </Box>
        </>
    )
}

export default AdminDashboard