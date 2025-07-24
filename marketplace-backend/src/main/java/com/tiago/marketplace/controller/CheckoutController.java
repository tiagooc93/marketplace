package com.tiago.marketplace.controller;


import com.tiago.marketplace.dto.OrderDTO;
import com.tiago.marketplace.model.Orders;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Autowired
    private AmqpTemplate amqpTemplate;


    @PostMapping
    public ResponseEntity<String> checkout(@RequestBody OrderDTO orderData) {
        Orders order = new Orders();
        order.setValue(orderData.getValue());
        order.setUserEmail(orderData.getUserEmail());
        order.setShoppingCartId(orderData.getShoppingCartId());

        amqpTemplate.convertAndSend("paymentQueue", order);
        return ResponseEntity.ok("Payment request sent to queue!");
    }

}
