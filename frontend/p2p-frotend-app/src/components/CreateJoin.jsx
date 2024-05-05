import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const CreateJoin = ({onUpdateState}) => {

    const [c_userName, setC_userName] = useState();
    
    const [j_userName, setJ_userName] = useState();
    const [j_roomId, setJ_roomId] = useState();

    var url = 'http://localhost:8070/ws'
    const createRoomWS = () => {
        console.log('Attempt to create room');
        var socket = new SockJS(url);
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, 
            ()=>{
                const createSub = stompClient.subscribe('/topic/create.room', (message)=>{
                    console.log("Create Room Sub Reveived:")
                    console.log(message.body)
                    var msg = JSON.parse(message.body);
                    console.log("New Room: "+msg.text+" "+msg.sender)
                    onUpdateState(msg.sender, msg.text, 1);  
                    createSub.unsubscribe();
                  }          
                  );
                stompClient.send("/app/create.topic",
                    {},
                    JSON.stringify({sender: c_userName, type: 'CREATE'})
                )
            }, 
            (e)=>{
                console.log("Error with create room")
            });      

    };
    const joinRoomWS = () => {        
        console.log("Join Room Button");
        const user = j_userName; const room = j_roomId;
        onUpdateState(user, room, 1);
    };
  return (
    <Grid container spacing={8} direction={'column'}  justifyContent="center" alignItems="center">        
        <Grid item container direction="column" justifyContent="center" alignItems="center" xs = {4}>
        <TextField onChange={e => setC_userName(e.target.value)}  sx={{m: "1em"}} id="name" label="Name" variant="outlined" />
        <Button onClick={() => {createRoomWS();}} sx={{width: "20em", p: "1em"}} variant="contained">Create Room</Button>
        </Grid>
        <Grid item container direction="column" justifyContent="space-between" alignItems="center" xs = {4}>
        <TextField onChange={e => setJ_roomId(e.target.value)} sx={{m: "1em"}} id="room-id" label="Room ID - public" variant="outlined" />
        <TextField onChange={e => setJ_userName(e.target.value)} sx={{m: "1em"}} id="name-id" label="Name" variant="outlined" />
        <Button onClick={joinRoomWS} sx={{width: "20em", p: "1em"}} variant="contained">Join Room</Button>        
        </Grid>
    </Grid>
  )
}

export default CreateJoin