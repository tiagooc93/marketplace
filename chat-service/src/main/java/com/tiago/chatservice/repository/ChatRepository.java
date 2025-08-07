package com.tiago.chatservice.repository;

import com.tiago.chatservice.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatMessage,Long> {

    List<ChatMessage> findByConversationId(String conversationId);
}
