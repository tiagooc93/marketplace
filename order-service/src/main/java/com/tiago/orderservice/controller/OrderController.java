package com.tiago.orderservice.controller;


import com.tiago.orderservice.dto.OrderDTO;
import com.tiago.orderservice.model.Orders;
import com.tiago.orderservice.service.OrderService;
import com.tiago.shared.dto.OrderQueueMessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<String> checkout(@RequestBody OrderDTO orderData) {
        System.out.println("Received order:" + orderData.toString());
        OrderQueueMessageDTO orderMessage = new OrderQueueMessageDTO();
        orderMessage.setValue(orderData.getValue());
        orderMessage.setUserEmail(orderData.getUserEmail());
        orderMessage.setShoppingCartId(orderData.getShoppingCartId());
        Orders orderSaved = orderService.saveOrder(orderMessage);

        orderMessage.setOrderId(orderSaved.getId());

        orderService.sendOrderForPayment(orderMessage);

        return ResponseEntity.ok("Payment request sent to queue!");
    }

}
