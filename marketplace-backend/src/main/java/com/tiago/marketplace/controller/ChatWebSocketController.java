package com.tiago.marketplace.controller;

import com.tiago.marketplace.dto.ChatMessageDTO;
import com.tiago.marketplace.model.ChatMessage;
import com.tiago.marketplace.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.net.CacheRequest;
import java.time.LocalDateTime;

@Controller
public class ChatWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat.{conversationId}")
    public void sendPrivateMessage(
            @DestinationVariable String conversationId,
            @Payload ChatMessageDTO message
    ) {
        message.setTimestamp(LocalDateTime.now().toString());
        // broadcast only to clients subscribed to this conversation topic:
        messagingTemplate.convertAndSend("/topic/private." + conversationId, message);

        ChatMessage chatMessage = new ChatMessage(
                message.getSender(),
                message.getContent(),
                message.getTimestamp(),
                message.getConversationId()
        );

        chatService.saveChatMessage(chatMessage);
    }

    public ChatWebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }
}
