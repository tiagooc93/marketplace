package com.tiago.paymentservice.service;

import com.tiago.shared.dto.OrderQueueMessageDTO;
import com.tiago.shared.dto.PaymentStatusDTO;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private RabbitTemplate rabbitTemplate;
/*
    @RabbitListener(queues = "paymentQueue")
    public void processPayment(Message message) {
        try {
            String body = new String(message.getBody(), "UTF-8");
            System.out.println("Received raw message: " + body);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

*/
    @RabbitListener(queues = "paymentQueue")
    public void processPayment(OrderQueueMessageDTO orderMessage) {
        System.out.println("Processing payment for order: " + orderMessage);

        // Simulate payment
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        PaymentStatusDTO status = new PaymentStatusDTO();
        status.setOrderId(orderMessage.getOrderId());
        status.setStatus("APPROVED");
        status.setShoppingCartId(orderMessage.getShoppingCartId());
        rabbitTemplate.convertAndSend("payment-status", status);
        System.out.println("Payment processed for order id: " + orderMessage.getOrderId());
    }
}
