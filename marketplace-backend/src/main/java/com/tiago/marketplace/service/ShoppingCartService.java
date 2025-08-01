package com.tiago.marketplace.service;

import com.tiago.marketplace.model.Product;
import com.tiago.marketplace.model.ShoppingCart;
import com.tiago.marketplace.repository.ProductRepository;
import com.tiago.marketplace.repository.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingCartService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ShoppingCartRepository shoppingCartRepository;



    public void addProductToCart(Long productId, Long userId){

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ShoppingCart shoppingCart = shoppingCartRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        product.setShoppingCart(shoppingCart);
        shoppingCart.getProducts().add(product);

        shoppingCartRepository.save(shoppingCart);
    }

    public void removeProductFromCart(Long productId, Long userId){

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ShoppingCart shoppingCart = shoppingCartRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        product.setShoppingCart(null);
        shoppingCart.getProducts().removeIf(p -> p.getId().equals(product.getId()));

        shoppingCartRepository.save(shoppingCart);
    }


    public List<Product> getCurrentCart(Long userId){
        ShoppingCart shoppingCart = shoppingCartRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return shoppingCart.getProducts();

    }


    public void clearCart(){

    }

    public void finishOperation(){

    }

}
