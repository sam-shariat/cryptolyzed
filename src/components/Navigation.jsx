import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Navigation() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{p:1}}>
      {'Copyright © '}
      <Link color="inherit" href="https://Cryptolyzed.com/">
        Cryptolyzed
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
