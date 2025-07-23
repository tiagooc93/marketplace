package com.tiago.marketplace.service;

import com.tiago.marketplace.model.ShoppingCart;
import com.tiago.marketplace.model.Users;
import com.tiago.marketplace.repository.ShoppingCartRepository;
import com.tiago.marketplace.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
