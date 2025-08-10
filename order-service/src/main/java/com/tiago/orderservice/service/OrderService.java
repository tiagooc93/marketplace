package com.tiago.orderservice.service;

import com.tiago.orderservice.model.Orders;
import com.tiago.orderservice.repository.OrderRepository;
import com.tiago.shared.dto.ClearCartMessageDTO;
import com.tiago.shared.dto.OrderQueueMessageDTO;
import com.tiago.shared.dto.PaymentStatusDTO;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    private AmqpTemplate amqpTemplate;

    public Orders saveOrder(OrderQueueMessageDTO orderData){
        Orders order = new Orders();
        order.setUserEmail(orderData.getUserEmail());
        order.setValue(orderData.getValue());
        order.setShoppingCartId(orderData.getShoppingCartId());
        return orderRepository.save(order);
    }

    public void sendOrderForPayment(OrderQueueMessageDTO orderMessage){
        System.out.println(("Sending order for payment queue"));
        System.out.println("Order: " + orderMessage.getOrderId() + " " + orderMessage.getUserEmail());
        amqpTemplate.convertAndSend("paymentQueue", orderMessage);
        System.out.println(("Order was sent"));

    }

    @RabbitListener(queues = "payment-status")
    public void receivePaymentStatus(PaymentStatusDTO paymentStatus) {
        if(paymentStatus.getOrderId() == null){
            System.out.println("Received payment status with null id");
            System.out.println("Payment Status: "+ paymentStatus.getOrderId());
            return;
        }
        Orders order = orderRepository.findById(
                paymentStatus.getOrderId()
        ).orElseThrow(
                () -> new RuntimeException(("Order not found"))
        );

        order.setStatus(paymentStatus.getStatus());
        orderRepository.save(order);

        System.out.println("Order " + order.getId() + " status updated to " + paymentStatus.getStatus());

        ClearCartMessageDTO clearCartMessage = new ClearCartMessageDTO();
        clearCartMessage.setShoppingCartId(paymentStatus.getShoppingCartId());
        amqpTemplate.convertAndSend("clear-cart", clearCartMessage);
    }
}
