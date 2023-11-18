import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import CardElement from '../../component/CardElement';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'

const OneUserJobsHistory = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const valueParam  = useParams();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/admin/user/${valueParam.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if(data.user.jobsHistory.length===0){
          navigate("/admin/users");
          toast.error("Not Applied for any Job till now");
        }
        setUser(data.user);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error as needed
      }
    };
    fetchData();
  }, [valueParam]);
  
  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: 'black', fontWeight: '600' }}>
          APPLIED USERS
          <Button onClick={()=>navigate(-1)} sx={{ fontSize: "13px",float:"right" }} variant='contained'>back</Button>
        </Typography>
        <Box>
          {user &&
            user.jobsHistory.map((history, i) => (
              <CardElement
                key={i}
                id={history._id}
                jobTitle={history.title}
                description={history.description}
                category="" // You may want to provide the actual category
                location={history.location}
              />
            ))}
        </Box>
      </Box>
    </>
  );
};

export default OneUserJobsHistory;
