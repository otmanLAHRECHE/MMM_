import * as React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ExamenItemsList(props) {
  

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {props.testes.map((test) => {
        return (
          <ListItem key={Math.random()}>
            <Chip
              label={test.examen_test.exam_test}
              color={test.examen_test.exam_color}
            />
          </ListItem>
        );
      })}
    </Paper>
    </Container>
   

  );
}