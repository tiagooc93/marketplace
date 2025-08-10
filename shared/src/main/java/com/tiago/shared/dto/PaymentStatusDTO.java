package com.tiago.shared.dto;

import lombok.Data;

@Data
public class PaymentStatusDTO {

    Long orderId;

    String status;

    Long shoppingCartId;

}