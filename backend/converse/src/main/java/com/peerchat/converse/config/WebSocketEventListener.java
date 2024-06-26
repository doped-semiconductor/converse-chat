package com.peerchat.converse.config;

import com.peerchat.converse.model.BasicMessage;
import com.peerchat.converse.model.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {
    private final SimpMessageSendingOperations messageTemplate;

    @EventListener
    public void sessionWSDisconnectHandler(SessionDisconnectEvent event){
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String user = (String) headerAccessor.getSessionAttributes().get("username");
        if(user!=null){
            log.info("User {} disconnected", user);
            var chatMsg = BasicMessage.builder().type(MessageType.LEAVE).sender(user).build();
            messageTemplate.convertAndSend("/topic/public", chatMsg);
        }

    }
}
