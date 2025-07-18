package com.tiago.marketplace.service;

import com.tiago.marketplace.model.Product;
import com.tiago.marketplace.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public ResponseEntity<Product> createProduct(@RequestBody Product product){
        return ResponseEntity.ok(productRepository.save(product));

    }

    public void deleteProduct(Product product){
         productRepository.delete(product);
    }

    public ResponseEntity<List<Product>> listAllProducts(){
        return ResponseEntity.ok(productRepository.findAll());
    }

    public ResponseEntity<Optional<Product>> getProduct(Long productId) {
        return ResponseEntity.ok(productRepository.findById(productId));

    }
}
