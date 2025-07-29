package com.tiago.marketplace.controller;

import com.tiago.marketplace.dto.ChatConversationDTO;
import com.tiago.marketplace.dto.ChatMessageDTO;
import com.tiago.marketplace.model.ChatConversation;
import com.tiago.marketplace.model.ChatMessage;
import com.tiago.marketplace.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    ChatService chatService;


    @PostMapping("/conversation")
    public ResponseEntity<Void> saveConversation(@RequestBody ChatConversationDTO chatConversationDTO){

        System.out.println("RECEVI CONV: " + chatConversationDTO.toString());

        ChatConversation chatConversation = new ChatConversation(
                chatConversationDTO.getUserId(),
                chatConversationDTO.getSellerId(),
                chatConversationDTO.getSellerName(),
                chatConversationDTO.getProductId(),
                chatConversationDTO.getProductName(),
                chatConversationDTO.getProductImage(),
                chatConversationDTO.getConversationId()
        );

        chatService.saveChatConversation(chatConversation);

        return ResponseEntity.noContent().build();
    }

    
    @GetMapping("/{conversationId}")
    public List<ChatMessageDTO> getMessages(@PathVariable String conversationId){

        System.out.println("GETTING MESSAGES OF CONVERSATION: " + conversationId);

        List<ChatMessage> allMessages = chatService.getMessages(conversationId);

        System.out.println("ALL MESSAGES; " + allMessages.toString());
        List<ChatMessageDTO> messagesDTOs = new ArrayList<>();

        for(int i=0; i<allMessages.size(); i++){
            ChatMessage message = allMessages.get(i);
            System.out.println("message: " + message);
            messagesDTOs.add(new ChatMessageDTO(
                    message.getSender(),
                    message.getContent(),
                    message.getTimestamp(),
                    message.getConversationId()));

        }

        return messagesDTOs;
    }

    @GetMapping("/conversation/{userId}")
    public List<ChatConversationDTO> getChatConversations(@PathVariable Long userId){

        List<ChatConversation> allConversations = chatService.getConversations(userId);
        List<ChatConversationDTO> conversationDTOS = new ArrayList<>();

        for(int i=0; i<allConversations.size(); i++){
            ChatConversation chatConversation = allConversations.get(i);
            conversationDTOS.add(new ChatConversationDTO(
                    chatConversation.getUserId(),
                    chatConversation.getSellerId(),
                    chatConversation.getSellerName(),
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
