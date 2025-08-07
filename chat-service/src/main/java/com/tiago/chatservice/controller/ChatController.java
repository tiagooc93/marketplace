package com.tiago.chatservice.controller;

import com.tiago.chatservice.dto.ChatConversationDTO;
import com.tiago.chatservice.dto.ChatMessageDTO;
import com.tiago.chatservice.model.ChatConversation;
import com.tiago.chatservice.model.ChatMessage;
import com.tiago.chatservice.service.ChatService;
import com.tiago.chatservice.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
        String username = usersService.getUsernameFromAuthentication();

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
