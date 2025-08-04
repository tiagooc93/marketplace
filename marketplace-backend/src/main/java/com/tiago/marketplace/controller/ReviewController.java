package com.tiago.marketplace.controller;

import com.tiago.marketplace.model.Review;
import com.tiago.marketplace.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @GetMapping("/{productId}")
    public List<Review> getReviews(@PathVariable Long productId){
        return reviewService.getReviews(productId);
    }

    public ResponseEntity<Void> saveReview(Review review){
        reviewService.saveReview(review);
        return ResponseEntity.noContent().build();
    }
}
