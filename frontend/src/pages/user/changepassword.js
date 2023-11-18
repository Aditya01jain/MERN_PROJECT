import { Box, Typography, MenuItem, TextField, Button } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const validationSchema = yup.object({
  currentPassword: yup.string('Enter your current password').required('Current password is required'),
  newPassword: yup
    .string('Enter a new password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('New password is required'),
  confirmNewPassword: yup
    .string('Confirm your new password')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirming new password is required'),
});

const ChangePassword = () => {
  const { user } = useSelector(state => state.userProfile);
    const navigation = useNavigate();
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
        
        const changepassworddata={
          values,
          id:user._id
        }
        const response = await fetch('/api/user/changepassword', {
          method: 'PUT',
          body: JSON.stringify(changepassworddata),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if(data.success){
          toast.success(data.message);
          navigation(-1);
        }
        else{
          toast.error(data.message);
        }
      // actions.resetForm();
    },
  });

  return (
    <>
    <Button onClick={()=>navigation(-1)} sx={{ fontSize: "13px",float:"left" }} variant='contained'>back</Button>
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 4 }}>
        <Box onSubmit={formik.handleSubmit} component="form" className="form_style border-style">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
              Change Password
            </Typography>
            <TextField
              fullWidth
              id="currentPassword"
              label="Current Password"
              name="currentPassword"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ pb: 3 }}
              placeholder="Current Password"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
              helperText={formik.touched.currentPassword && formik.errors.currentPassword}
            />
            <TextField
              fullWidth
              id="newPassword"
              label="New Password"
              name="newPassword"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ pb: 3 }}
              placeholder="New Password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
            />
            <TextField
              fullWidth
              id="confirmNewPassword"
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ pb: 3 }}
              placeholder="Confirm New Password"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
              helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
            />
            <Button fullWidth variant="contained" type="submit">
              Change Password
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChangePassword;
