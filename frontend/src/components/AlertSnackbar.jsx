import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertSnackBar({ data: data }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    console.log("data=",data);
    if (data != undefined && 'message' in data && 'severity' in data) {
      setMessage(data.message);
      setSeverity(data.severity);
      setOpen(true);
    }
  }, [data]);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <Alert severity={severity} sx={{ width: '100%' }} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
