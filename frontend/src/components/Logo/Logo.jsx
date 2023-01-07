import { Typography, Box } from "@mui/material"
import 'typeface-montserrat';

export default function Logo() {
  return (
    <Typography 
        variant="h3" 
        component="h1" 
        color="primary"
        style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>
        Transport eXperience
      </Typography>
  );
}

