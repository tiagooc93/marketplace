package com.tiago.marketplace.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatConversationDTO {

    private Long userId;

    private Long sellerId;

    private String sellerName;

    private Long productId;

    private String productName;

    private String productImage;

    private String conversationId;

}
