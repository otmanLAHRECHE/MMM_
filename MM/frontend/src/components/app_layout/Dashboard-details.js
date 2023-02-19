import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Link from '@mui/material/Link';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';





export default function Dashboard_details(){
    const theme = useTheme

    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/otmanLAHRECHE">
              Labo_SysApp
            </Link>{' '}
            -- created by otman LAHRECHE
            {'.'}
          </Typography>
        );
      }


    return(

        <React.Fragment>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
                <Copyright sx={{ pt: 4 }} />
            </Container>
      
        </React.Fragment>
    )
}