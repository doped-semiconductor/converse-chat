import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = ({roomid, user}) => {
  // const { roomId } = props;
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography sx={{letterSpacing: "0.1em"}} flexGrow={2} variant="h4" component="div">
          CONVERSE
        </Typography>
        <Typography  sx={{letterSpacing: "0.1em"}} variant="h6" component="div">
          {roomid}
        </Typography>
        <Typography  sx={{letterSpacing: "0.1em", textTransform: "capitalize"}} variant="h6" component="div">
          ({user})
        </Typography>         
      </Toolbar>
    </AppBar>
  )
}

export default Header