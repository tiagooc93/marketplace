package com.tiago.chatservice.configuration;

import jakarta.annotation.PostConstruct;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitTemplateConfig {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private Jackson2JsonMessageConverter messageConverter;

    @PostConstruct
    public void init() {
        rabbitTemplate.setMessageConverter(messageConverter);
    }
}
