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

    private Long senderId;

    private Long receiverId;

    private String ReceiverName;

    private String senderName;

    private Long productId;

    private String productName;

    private String productImage;

    private String conversationId;

    public ChatConversation(
            Long senderId,
            Long receiverId,
            String receiverName,
            String senderName,
            Long productId,
            String productName,
            String productImage,
            String conversationId
    ){
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.ReceiverName = receiverName;
        this.senderName = senderName;
        this.productId = productId;
        this.productName = productName;
        this.productImage = productImage;
        this.conversationId = conversationId;
    }

}