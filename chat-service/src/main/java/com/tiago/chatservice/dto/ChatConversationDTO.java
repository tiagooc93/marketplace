package com.tiago.chatservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatConversationDTO {

    private Long senderId;

    private Long receiverId;

    private String receiverName;

    private String senderName;

    private Long productId;

    private String productName;

    private String productImage;

    private String conversationId;

}
