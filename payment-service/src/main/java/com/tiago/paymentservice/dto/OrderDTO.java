package com.tiago.paymentservice.dto;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderDTO {

    private BigDecimal value;

    private Long shoppingCartId;

    private String userEmail;
}
