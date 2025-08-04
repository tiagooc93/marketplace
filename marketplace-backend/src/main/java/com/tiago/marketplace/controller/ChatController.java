package com.tiago.marketplace.controller;

import com.tiago.marketplace.dto.ChatConversationDTO;
import com.tiago.marketplace.dto.ChatMessageDTO;
import com.tiago.marketplace.model.ChatConversation;
import com.tiago.marketplace.model.ChatMessage;
import com.tiago.marketplace.service.ChatService;
import com.tiago.marketplace.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UsersService usersService;


    @PostMapping("/conversation")
    public ResponseEntity<Map<String, String>> saveConversation(@RequestBody ChatConversationDTO chatConversationDTO){
        Long senderId = usersService.getUserIdFromAuthentication();
        String username = usersService.getUsernameFromId(senderId);

        String chatConversationId = "user" + senderId +
                "-user" + chatConversationDTO.getReceiverId() +
                "-product" + chatConversationDTO.getProductId();

        ChatConversation chatConversation = new ChatConversation(
                senderId,
                chatConversationDTO.getReceiverId(),
                chatConversationDTO.getReceiverName(),
                username,
                chatConversationDTO.getProductId(),
                chatConversationDTO.getProductName(),
                chatConversationDTO.getProductImage(),
                chatConversationId
        );
        chatService.saveChatConversation(chatConversation);
        return ResponseEntity.ok(Map.of("message", "Conversation created successfully"));
    }

    
    @GetMapping("/{conversationId}")
    public List<ChatMessageDTO> getMessages(@PathVariable String conversationId){

        List<ChatMessage> allMessages = chatService.getMessages(conversationId);
        List<ChatMessageDTO> messagesDTOs = new ArrayList<>();

        for(int i=0; i<allMessages.size(); i++){
            ChatMessage message = allMessages.get(i);
            messagesDTOs.add(new ChatMessageDTO(
                    message.getSender(),
                    message.getContent(),
                    message.getTimestamp(),
                    message.getConversationId()));

        }
        return messagesDTOs;
    }

    @GetMapping("/conversation")
    public List<ChatConversationDTO> getChatConversations(){
        Long userId = usersService.getUserIdFromAuthentication();

        List<ChatConversation> allConversations = chatService.getConversations(userId);
        List<ChatConversationDTO> conversationDTOS = new ArrayList<>();

        for(int i=0; i<allConversations.size(); i++){
            ChatConversation chatConversation = allConversations.get(i);
            conversationDTOS.add(new ChatConversationDTO(
                    null,
                    chatConversation.getReceiverId(),
                    chatConversation.getReceiverName(),
                    chatConversation.getSenderName(),
                    chatConversation.getProductId(),
                    chatConversation.getProductName(),
                    chatConversation.getProductImage(),
                    chatConversation.getConversationId()
                    )
            );
        }

        return conversationDTOS;
    }
}
