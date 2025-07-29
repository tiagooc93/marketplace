package com.tiago.marketplace.service;

import com.tiago.marketplace.model.Product;
import com.tiago.marketplace.model.Review;
import com.tiago.marketplace.repository.ProductRepository;
import com.tiago.marketplace.repository.ReviewRepository;
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

    ReviewService reviewService;

    public ResponseEntity<Product> createProduct(@RequestBody Product product){
        if (productRepository.existsByNameAndSellerId(product.getName(), product.getSellerId())) {
            throw new IllegalArgumentException("Product with this name and seller already exists.");
        }
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
