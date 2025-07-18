package com.tiago.marketplace.controller;

import com.tiago.marketplace.dto.AddToCartDTO;
import com.tiago.marketplace.model.Product;
import com.tiago.marketplace.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shopping")
@CrossOrigin
public class NewController {

    @Autowired
    ShoppingCartService shoppingCartService;


    @PostMapping("/add")
    public ResponseEntity<Void> addToShoppingCart(@RequestBody AddToCartDTO addToCartDTO){
        Long productId = addToCartDTO.productId();
        Long userId = addToCartDTO.userId();
        shoppingCartService.addProductToCart(productId, userId);

        return ResponseEntity.noContent().build();
    }
    @PostMapping("/remove")
    public ResponseEntity<Void> removeFromShoppingCart(@RequestBody AddToCartDTO addToCartDTO){
        Long productId = addToCartDTO.productId();
        Long userId = addToCartDTO.userId();
        shoppingCartService.removeProductFromCart(productId, userId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<List<Product>> addToShoppingCart(@PathVariable Long userId){
        return ResponseEntity.ok(shoppingCartService.getCurrentCart(userId));
    }
}
