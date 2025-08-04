package com.tiago.marketplace.controller;

import com.tiago.marketplace.dto.AddToCartDTO;
import com.tiago.marketplace.dto.ShoppingCartSizeDTO;
import com.tiago.marketplace.model.Product;
import com.tiago.marketplace.service.ShoppingCartService;
import com.tiago.marketplace.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shopping")
public class ShoppingCartController {

    @Autowired
    UsersService usersService;

    @Autowired
    ShoppingCartService shoppingCartService;

    @PostMapping("/add")
    public ResponseEntity<Void> addToShoppingCart(@RequestBody AddToCartDTO addToCartDTO){
        Long userId = usersService.getUserIdFromAuthentication();
        Long productId = addToCartDTO.productId();
        shoppingCartService.addProductToCart(productId, userId);

        return ResponseEntity.noContent().build();
    }
    @PostMapping("/remove")
    public ResponseEntity<Void> removeFromShoppingCart(@RequestBody AddToCartDTO addToCartDTO){
        Long userId = usersService.getUserIdFromAuthentication();
        Long productId = addToCartDTO.productId();
        shoppingCartService.removeProductFromCart(productId, userId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/list")
    public ResponseEntity<List<Product>> getShoppingCart(){
        Long userId = usersService.getUserIdFromAuthentication();
        return ResponseEntity.ok(shoppingCartService.getCurrentCart(userId));
    }

    @GetMapping("/size")
    public ResponseEntity<ShoppingCartSizeDTO> getShoppingCartNumberOfItems(){
        Long userId = usersService.getUserIdFromAuthentication();
        List<Product> shoppingCart = shoppingCartService.getCurrentCart(userId);

        ShoppingCartSizeDTO shoppingCartSizeDTO = new ShoppingCartSizeDTO(shoppingCart.size());
        return ResponseEntity.ok(shoppingCartSizeDTO);
    }
}
