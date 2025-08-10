package com.tiago.orderservice.service;

import com.tiago.orderservice.dto.AuthUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    public Long getUserIdFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof AuthUserDTO) {
            return ((AuthUserDTO) principal).userId();
        }

        throw new RuntimeException("Unexpected principal type: " + principal.getClass());
    }

    public String getUsernameFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof AuthUserDTO authUser) {
            return authUser.username();
        }

        throw new RuntimeException("Unexpected principal type: " + principal.getClass());
    }
}
