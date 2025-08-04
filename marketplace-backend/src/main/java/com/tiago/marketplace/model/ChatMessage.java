package com.tiago.marketplace.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sender;

    private String content;

    private String timestamp;

    private String conversationId;

    public ChatMessage(Long sender, String content, String timestamp, String conversationId){
        this.sender = sender;
        this.content =  content;
        this.timestamp = timestamp;
        this.conversationId = conversationId;
    }
}
