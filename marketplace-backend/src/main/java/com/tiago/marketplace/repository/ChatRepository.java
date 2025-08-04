package com.tiago.marketplace.repository;

import com.tiago.marketplace.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatMessage,Long> {

    List<ChatMessage> findByConversationId(String conversationId);
}
