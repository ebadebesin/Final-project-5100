import * as React from 'react';
import BottomNavBar from './BottomNavBar';
import {  Container, Paper } from '@mui/material';

import ArticleHistory from './ArticleHistory';
import Today from './ArticleHistory';

export default function App() {
  return (
    <>
      <ArticleHistory/>
      <Container sx={{height:40}}></Container>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavBar/>
      </Paper>
    </>
  );
}