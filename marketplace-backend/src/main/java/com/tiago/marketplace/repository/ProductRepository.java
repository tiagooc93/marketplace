package com.tiago.marketplace.repository;


import com.tiago.marketplace.model.Product;
import com.tiago.marketplace.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByShoppingCart(ShoppingCart cart);

    boolean existsByNameAndSellerId(String name, Long sellerId);

}
