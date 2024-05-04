import React from 'react'
import Header from "../components/Header"
import CreateJoin from '../components/CreateJoin'
import { Grid } from '@mui/material';

const Home = () => {
  return (
    <Grid container spacing={12}  justifyContent="center" alignItems="center">
      <Grid item xs={12}  justifyContent="center" alignItems="center">
        <Header />
      </Grid>
      <Grid item xs={12}  justifyContent="center" alignItems="center">
        <CreateJoin />
      </Grid>
    </Grid>    
  )
}

export default Home