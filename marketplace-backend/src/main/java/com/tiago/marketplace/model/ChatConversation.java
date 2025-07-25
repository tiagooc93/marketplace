package com.tiago.marketplace.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatConversation{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long sellerId;

    private String sellerName;

    private Long productId;

    private String productName;

    private String productImage;

    private String conversationId;

    public ChatConversation(
            Long userId,
            Long sellerId,
            String sellerName,
            Long productId,
            String productName,
            String productImage,
            String conversationId
    ){
        this.userId = userId;
        this.sellerId = sellerId;
        this.sellerName = sellerName;
        this.productId = productId;
        this.productName = productName;
        this.productImage = productImage;
        this.conversationId = conversationId;
    }

}