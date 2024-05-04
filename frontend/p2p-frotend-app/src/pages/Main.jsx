import React, { useState } from 'react'
import { Grid } from '@mui/material';
import CreateJoin from '../components/CreateJoin'
import Header from "../components/Header"
import Chat from './Chat'

const Main = () => {
    const [roomid, setRoomid] = useState('');
    const [user, setUser] = useState('Guest');
    const [initMode, setInitMode] = useState(0);

    const displayMode = ['flex', 'none']

    const onUpdateState = (tuser,troomid,tinitMode) =>{      
      console.log("onUpdateState called")
      // console.log("before u r i: "+user+" "+roomid+" "+initMode);
      if(tuser!=null){
        setUser(tuser);
        console.log("User changed to: "+user);
      }
      if(troomid!=null){
        setRoomid(troomid);
        console.log("Room ID changed to: "+roomid);
      }
      if(tinitMode!=null){
        setInitMode(tinitMode);
        console.log("initMode changed to: "+initMode);
      }
    }

    return (
        <Grid container spacing={12}  justifyContent="center" alignItems="center">
          <Grid item xs={12}  justifyContent="center" alignItems="center">
            <Header roomid={roomid} user={user} />
          </Grid>
          <Grid sx={{display: displayMode[initMode]}} item xs={12}  justifyContent="center" alignItems="center">
            <CreateJoin onUpdateState = {onUpdateState} />
          </Grid>
          <Grid sx={{display: displayMode[1-initMode]}} item xs={12}  justifyContent="center" alignItems="center">
            <Chat user={user} roomid={roomid} initMode={initMode} />
          </Grid>
        </Grid>  
    )
}

export default Main