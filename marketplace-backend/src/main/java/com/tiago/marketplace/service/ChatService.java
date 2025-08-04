package com.tiago.marketplace.service;

import com.tiago.marketplace.model.ChatConversation;
import com.tiago.marketplace.model.ChatMessage;
import com.tiago.marketplace.repository.ChatConversationRepository;
import com.tiago.marketplace.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    ChatRepository chatRepository;

    @Autowired
    ChatConversationRepository chatConversationRepository;

    public void saveChatMessage(ChatMessage chatMessage){
        chatRepository.save(chatMessage);
    }

    public void saveChatConversation(ChatConversation chatConversation){
        chatConversationRepository.save(chatConversation);
    }

    public List<ChatMessage> getMessages(String conversationId){
        return chatRepository.findByConversationId(conversationId);
    }

    public List<ChatConversation>  getConversations(Long userId){
        return chatConversationRepository.findBySenderIdOrReceiverId(userId, userId);
    }
}
