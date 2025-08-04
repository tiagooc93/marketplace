package com.tiago.marketplace.repository;

import com.tiago.marketplace.model.ChatConversation;
import com.tiago.marketplace.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatConversationRepository extends JpaRepository<ChatConversation, Long> {

    List<ChatConversation> findBySenderIdOrReceiverId(Long senderId, Long receiverId);

}
