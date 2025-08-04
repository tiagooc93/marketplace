package com.tiago.marketplace.service;

import com.tiago.marketplace.model.Orders;
import com.tiago.marketplace.repository.OrderRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckoutService {

    @Autowired
    OrderRepository orderRepository;

    @RabbitListener(queues = "paymentQueue")
    public void processPayment(Orders order) {
        System.out.println("Processing payment for order: " + order);
        // Add your payment logic here
    }
}
