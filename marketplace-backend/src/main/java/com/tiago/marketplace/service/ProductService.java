package com.tiago.marketplace.service;

import com.tiago.marketplace.model.Product;
import com.tiago.marketplace.model.Review;
import com.tiago.marketplace.model.Users;
import com.tiago.marketplace.repository.ProductRepository;
import com.tiago.marketplace.repository.ReviewRepository;
import com.tiago.marketplace.repository.UsersRepository;
import jakarta.persistence.EntityNotFoundException;
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

    @Autowired
    UsersRepository usersRepository;

    ReviewService reviewService;

    public ResponseEntity<Product> createProduct(@RequestBody Product product){
        if (productRepository.existsByNameAndSellerId(product.getName(), product.getSellerId())) {
            throw new IllegalArgumentException("Product with this name and seller already exists.");
        }

        Product savedProduct = productRepository.save(product);

        try {
            Users user = usersRepository.findById(product.getSellerId())
                    .orElseThrow(() -> new RuntimeException("Invalid seller ID: " + product.getSellerId()));
            user.getUserAds().add(savedProduct.getId());
            usersRepository.save(user);
        } catch (Exception e) {
            System.err.println("Error inserting product: " + product.getName());
            e.printStackTrace();
            throw e;
        }

        return ResponseEntity.ok(savedProduct);
    }

    public void deleteProduct(Long productId){
        Product product = productRepository.findById(productId).orElseThrow();
        Long userId = product.getSellerId();
        Users user = usersRepository.findById(userId).orElseThrow();
        user.getUserAds().remove(product.getId()); // Or remove(productId)
        usersRepository.save(user);

        if (productRepository.existsById(productId)) {
            productRepository.deleteById(productId);
        } else {
            throw new RuntimeException("Product not found with ID: " + productId);
        }
    }

    public ResponseEntity<List<Product>> listAllProducts(){
        return ResponseEntity.ok(productRepository.findAll());
    }
    public Optional<Product> getProduct(Long productId) {

        return productRepository.findById(productId);
    }

    public void updateRating(Long productId){
        List<Review> listOfReviews = reviewService.getReviews(productId);

        Float total = 0.0F;
        for(int i=0; i<listOfReviews.size(); i++){
            total += listOfReviews.get(i).getRating();
        }

        Float rating = total / listOfReviews.size();

        Product product = productRepository.findById(productId)
                        .orElseThrow(() -> new EntityNotFoundException("Product not found when updating Rating"));

        product.setRating(rating);
    }
}
