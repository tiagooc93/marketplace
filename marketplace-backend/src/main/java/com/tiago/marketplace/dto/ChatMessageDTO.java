package com.tiago.marketplace.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
public class ChatMessageDTO {

    private Long sender;

    private String content;

    private String timestamp;

    private String conversationId;
}
