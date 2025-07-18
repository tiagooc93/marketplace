package com.tiago.marketplace.service;

import com.tiago.marketplace.model.Review;
import com.tiago.marketplace.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    public void saveReview(Review review){
        reviewRepository.save(review);
    }

    public ResponseEntity<List<Review>> getReviews(Long productId){
        return ResponseEntity.ok(reviewRepository.findByProductId(productId));
    }


}
