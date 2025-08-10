package com.tiago.marketplace.service;

import com.tiago.marketplace.dto.AuthUserDTO;
import com.tiago.marketplace.model.ShoppingCart;
import com.tiago.marketplace.model.Users;
import com.tiago.marketplace.repository.ShoppingCartRepository;
import com.tiago.marketplace.repository.UsersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UsersService {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    ShoppingCartRepository shoppingCartRepository;

    public Users addUser(Users user){
        log.info("Adding new user: {}", user.toString());
        usersRepository.save(user);
        usersRepository.flush();

        Long userId = user.getId();

        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCartRepository.save(shoppingCart);

        return user;
    }

    public List<Long> getUserAds(Long userId){
        log.info("Fetching user ads, user id: {}", userId);

        Optional<Users> user = usersRepository.findById(userId);
        if (!usersRepository.existsById(userId)) {
            throw new RuntimeException("User does not exist !");
        }

        return user.get().getUserAds();
    }

    public String getUsernameFromId(Long userId){
        log.info("Getting username from user id, user id: {}", userId);

        Users user = usersRepository.findById(userId).orElseThrow();
        return user.getUsername();
    }

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

    public String getEmailFromAuthentication() {
        log.info("Getting user email from auth context");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof AuthUserDTO authUser) {
            return authUser.email();
        }

        throw new RuntimeException("Unexpected principal type: " + principal.getClass());
    }

}
