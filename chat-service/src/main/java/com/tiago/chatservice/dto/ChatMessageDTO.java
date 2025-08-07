package com.tiago.chatservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatMessageDTO {

    private Long sender;

    private String content;

    private String timestamp;

    private String conversationId;
}
