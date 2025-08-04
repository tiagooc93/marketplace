package com.tiago.marketplace.service;

import com.tiago.marketplace.model.Review;
import com.tiago.marketplace.repository.ProductRepository;
import com.tiago.marketplace.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    ProductService productService;

    public void saveReview(Review review){
        if (reviewRepository.existsByProductIdAndUsername(review.getProductId(), review.getUsername())) {
            throw new IllegalArgumentException("User of this username already inserted a review.");
        }
        reviewRepository.save(review);
        productService.updateRating(review.getProductId());
    }

    public List<Review> getReviews(Long productId){
        return reviewRepository.findByProductId(productId);
    }



}
