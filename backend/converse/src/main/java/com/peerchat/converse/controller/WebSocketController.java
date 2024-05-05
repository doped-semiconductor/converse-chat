package com.peerchat.converse.controller;

import com.peerchat.converse.model.BasicMessage;
import com.peerchat.converse.model.MessageType;
import com.peerchat.converse.service.RandomNumberGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import lombok.extern.slf4j.Slf4j;

import java.util.Objects;

@Controller
@CrossOrigin(origins = "*", allowCredentials = "false")
@Slf4j
public class WebSocketController {
    @Autowired
    private RandomNumberGenerator roomGenerator;

    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public BasicMessage send(@Payload BasicMessage message){
        System.out.println("Received: " + message.toString());
        log.info("User {} sent type {} sent {}", message.getSender(), message.getText(), message.getText());
        return message;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public BasicMessage addUser(@Payload BasicMessage messages, SimpMessageHeaderAccessor headerAccessor){
        headerAccessor.getSessionAttributes().put("username", messages.getSender());
        log.info("User {} connected", messages.getSender());
        return messages;
    }

    @MessageMapping("/create.topic")
    @SendTo("/topic/create.room")
    public void createTopic(BasicMessage message) {
        // Assuming some logic to validate topicName
        // Generate topic
        String room = roomGenerator.generateValidRoomID();
        if(Objects.equals(room, "")){
            log.error("Rooms at capacity, can't generate");
            return;
        }
        String topic = "/topic/" + room;
        log.info("Created Room {}",room);
        var chatMsg = BasicMessage.builder().type(MessageType.CREATE).sender(message.getSender()).text(room).build();
        messagingTemplate.convertAndSend("/topic/create.room", chatMsg);
    }

    @MessageMapping("/send.message/{topic}")
    public void sendMessageToTopic(@DestinationVariable String topic, BasicMessage message) {
        messagingTemplate.convertAndSend("/topic/" + topic, message);
    }

    @MessageMapping("/send.addUser/{topic}")
    public void addUser(@DestinationVariable String topic, BasicMessage message){
        messagingTemplate.convertAndSend("/topic/" + topic, message);
        log.info("User {} connected to room {}", message.getSender(), message.getText());
    }
}
