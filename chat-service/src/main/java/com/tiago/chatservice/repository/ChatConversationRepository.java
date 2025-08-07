package com.tiago.chatservice.repository;

import com.tiago.chatservice.model.ChatConversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatConversationRepository extends JpaRepository<ChatConversation, Long> {

    List<ChatConversation> findBySenderIdOrReceiverId(Long senderId, Long receiverId);

}
