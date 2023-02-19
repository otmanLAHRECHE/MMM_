import * as React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ReadyStatus(props) {
  

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Chip
              variant="outlined" 
              label={props.status != "false"  ? 'pas prête' : 'prête'}
              color={props.status != "false"  ? 'warning' : 'success'}
              icon={props.status != "false"  ? <ReportProblemIcon /> : <AssignmentTurnedInIcon />}
            />
    </Container>
   

  );
}