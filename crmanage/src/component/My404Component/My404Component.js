// const NotFound = ()=>{
//     return(
//         <>
//          Page Not Found
//         </>
//     )
// }
// export default NotFound;

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const primary = teal[100]; // #f44336

export default function NotFound() {
    let navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '70vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: 'smokewheat' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={()=>navigate("/dashboard")}>Back Home</Button>
    </Box>
  );
}