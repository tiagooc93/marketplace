package com.tiago.shared.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderQueueMessageDTO {

    private Long orderId;

    private BigDecimal value;

    private Long shoppingCartId;

    private String userEmail;
}