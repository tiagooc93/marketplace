package com.tiago.orderservice.service;

import com.tiago.orderservice.model.Orders;
import com.tiago.orderservice.repository.OrderRepository;
import com.tiago.shared.dto.ClearCartMessageDTO;
import com.tiago.shared.dto.OrderQueueMessageDTO;
import com.tiago.shared.dto.PaymentStatusDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    private AmqpTemplate amqpTemplate;

    public Orders saveOrder(OrderQueueMessageDTO orderData){
        log.info("Saving order: {}", orderData.toString());

        Orders order = new Orders();
        order.setUserEmail(orderData.getUserEmail());
        order.setValue(orderData.getValue());
        order.setShoppingCartId(orderData.getShoppingCartId());
        return orderRepository.save(order);
    }

    public void sendOrderForPayment(OrderQueueMessageDTO orderMessage){
        log.info("Sending order for payment: {}", orderMessage.toString());

        amqpTemplate.convertAndSend("paymentQueue", orderMessage);
    }

    @RabbitListener(queues = "payment-status")
    public void receivePaymentStatus(PaymentStatusDTO paymentStatus) {
        log.info("Received message on queue payment-status: {}", paymentStatus.toString());

        if(paymentStatus.getOrderId() == null){
            log.info("Received payment status with null id : {}", paymentStatus.toString());
            return;
        }
        Orders order = orderRepository.findById(
                paymentStatus.getOrderId()
        ).orElseThrow(
                () -> new RuntimeException(("Order not found"))
        );

        order.setStatus(paymentStatus.getStatus());
        orderRepository.save(order);

        log.info("Order {} status updated to {}", order.getId(), paymentStatus.getStatus());

        ClearCartMessageDTO clearCartMessage = new ClearCartMessageDTO();
        clearCartMessage.setShoppingCartId(paymentStatus.getShoppingCartId());
        amqpTemplate.convertAndSend("clear-cart", clearCartMessage);
    }
}
