package com.tiago.paymentservice.service;

import com.tiago.shared.dto.OrderQueueMessageDTO;
import com.tiago.shared.dto.PaymentStatusDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PaymentService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @RabbitListener(queues = "paymentQueue")
    public void processPayment(OrderQueueMessageDTO orderMessage) {
        log.info("Received message on queue paymentQueue: {}", orderMessage.toString());

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

        log.info("Sending payment status message: {}", status.toString());
        rabbitTemplate.convertAndSend("payment-status", status);
    }
}
