package com.tiago.paymentservice.service;

import com.tiago.paymentservice.dto.AuthUserDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UsersService {

    public Long getUserIdFromAuthentication() {
        log.info("Getting user id from auth context");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof AuthUserDTO) {
            return ((AuthUserDTO) principal).userId();
        }

        throw new RuntimeException("Unexpected principal type: " + principal.getClass());
    }

    public String getUsernameFromAuthentication() {
        log.info("Getting username from auth context");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof AuthUserDTO authUser) {
            return authUser.username();
        }

        throw new RuntimeException("Unexpected principal type: " + principal.getClass());
    }

}
