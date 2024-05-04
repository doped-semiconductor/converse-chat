import React from 'react'
import {Grid, Divider} from '@mui/material'

const ChatChild = ({messages}) => {
    var count = 0;
    if(messages.length==0){
        return (<div></div>);
    }
    
    // useEffect(() => {
        
    // }, [messages]);
    return (
        <Grid>
            {
                messages.map((message) =>{
                    count+=1;
                    var nkey = message.idx;
                    if(message.type=="JOIN"){                        
                        return (<Divider key={nkey} variant="inset" sx={{fontSize:"0.75em", padding:"0.4em", marginLeft: 0}} >{message.sender} Joined</Divider>)
                    }
                    if(message.type=="LEAVE"){
                        return (<Divider key={nkey} variant="inset" sx={{fontSize:"0.75em", padding:"0.4em", marginLeft: 0}} >{message.sender} Left</Divider>)
                    }
                    if(message.type=="CHAT"){
                        // return (<Grid key={nkey} sx={{fontSize:"0.95em", padding:"0.4em"}}>{message.sender}:{message.text}</Grid>)
                        return (
                        <Grid key={nkey} sx={{display:"flex", alignItems:"baseline", padding:"0.5em"}}>                            
                            <Grid sx={{color:"#d72b2b",textTransform:"uppercase",paddingRight:"0.5em", fontSize:"0.8em",minWidth:"5em"}}>{message.sender}</Grid> 
                            <Grid>{message.text}</Grid>                          
                        </Grid>
                        )
                    }
                })
            }
        </Grid>
    )
}

export default ChatChild