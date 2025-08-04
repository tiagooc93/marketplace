package com.tiago.marketplace.service;

import com.tiago.marketplace.model.ShoppingCart;
import com.tiago.marketplace.model.Users;
import com.tiago.marketplace.repository.ShoppingCartRepository;
import com.tiago.marketplace.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    ShoppingCartRepository shoppingCartRepository;

    public Users addUser(Users user){
        usersRepository.save(user);
        usersRepository.flush();

        Long userId = user.getId();

        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setUserId(userId);
        shoppingCartRepository.save(shoppingCart);

        return user;
    }

    public List<Long> getUserAds(Long userId){
        Optional<Users> user = usersRepository.findById(userId);

        if (!usersRepository.existsById(userId)) {
            throw new RuntimeException("User does not exist !");
        }

        return user.get().getUserAds();
    }

    public String getUsernameFromId(Long userId){
        Users user = usersRepository.findById(userId).orElseThrow();
        return user.getUsername();
    }

    public Long getUserIdFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof Users) {
            return ((Users) principal).getId();
        } else if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername();
            Users user = usersRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
            return user.getId();
        } else if (principal instanceof String) {
            String email = (String) principal;
            Users user = usersRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
            return user.getId();
        }

        throw new RuntimeException("Unexpected principal type: " + principal.getClass());
    }
}
