import React, {useState, useEffect} from 'react'
import { Grid, Button, TextField, Divider } from '@mui/material';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import ChatChild from '../components/ChatChild';

const Chat = ({user,roomid,initMode,onUpdateState}) => {    

  //0 - Connecting 1 - Connected 2 - Disconnected
  const [connected, setConnected] = useState("CONNECTING");
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msgKeyCounter, setMsgKeyCounter] = useState(0);
  const [myChat, setMyChat] = useState("");
  const [subscriber, setSubscriber] = useState();
  

  useEffect(() => {
    if(initMode==1)
    {
      connectWS();
      return () => { console.log("Use Effect for Connecting") }
    }
    
    
  }, [initMode]);

  useEffect(() => {
    return () => { 
      console.log("Messages UE"); console.log(messages);  
    }    
  }, [messages]);

  
  

  var url = 'http://localhost:8070/ws'
  const connectWS = () => {
    console.log('Attempt to connect to Room');
    console.log('Room User : '+roomid+" "+user);
    var socket = new SockJS(url);
    var stompClient = Stomp.over(socket);
    stompClient.connect({},
      ()=>{
        setConnected("CONNECTED");console.log("Socket Connected");
        const sub = stompClient.subscribe('/topic/'+roomid, (msg)=>{
          setMsgKeyCounter(1+msgKeyCounter);
          console.log("Subscriber Received")
          console.log(msg.body)
          var newMsg = JSON.parse(msg.body);
          newMsg["idx"]="m"+msgKeyCounter+(new Date().getTime());
          // console.log("")
          setMessages(messages => [...messages, newMsg])
        }          
        );
        setSubscriber(sub);
        stompClient.send("/app/send.addUser/"+roomid, {}, JSON.stringify({sender: user, type: 'JOIN'}))
      }, (e)=>{ setConnected("COULD NOT CONNECT"); console.log("Error with socket")}); 
    setClient(stompClient);
  };

  const sendMessageWS = () => {
    var dialogue = myChat;
    client.send("/app/send.message/"+roomid, {}, JSON.stringify({sender: user, type: 'CHAT', text: dialogue}));
  }

  

  
  
  return (
    <Grid  sx={{ border: 0 }} height={"80vh"} p={"0.5em"}  container m={"1em"} spacing={8} direction={'column'}  justifyContent="space-between" alignItems="end">

      <Grid  sx={{ border: 0, padding: "1em", alignItems: "center", width: "100%", fontSize: "0.85em", letterSpacing: "0.2em" }}>
        STATUS: {connected}                
      </Grid> 
      

      <Grid id="chat-parent" sx={{ border: 2, borderRadius: "2em", borderColor: "#ddd3d3;", height: "75%", width: "100%", overflowY: "scroll" }}>
        <ChatChild messages={messages} />
      </Grid>


      <Grid  sx={{ border: 0 , padding: "1em", width: "100%", display:"flex", direction: "row"}}>
        <Grid item xs={10}>
        <TextField onChange={e => setMyChat(e.target.value)} sx={{width: "95%"}} id="message" label="Your Message" variant="outlined" />
        </Grid>
        <Grid item xs={1} >
        <Button onClick={()=>{sendMessageWS()}} sx={{width: "85%", p: "1em"}} variant="contained">Send</Button>
        </Grid>
        <Grid item xs={2} >
        <Button onClick={()=>{client.disconnect(()=>{
          setConnected("DISCONNECTED"); subscriber.unsubscribe();
        })}} sx={{width: "85%", p: "1em", backgroundColor: "#ca3a22"}} variant="contained">Disconnect</Button>
        </Grid>
      </Grid>
    </Grid> 
  )
}

export default Chat