import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BottomNavBar from './BottomNavBar';
import { Divider, Paper } from '@mui/material';
import TopBar from './TopBar';
import Today from './Today';

export default function App() {
  return (
    <>
      <Today/>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavBar/>
      </Paper>
    </>
  );
}
