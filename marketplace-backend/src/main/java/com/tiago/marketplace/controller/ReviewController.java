package com.tiago.marketplace.controller;

import com.tiago.marketplace.model.Review;
import com.tiago.marketplace.service.ReviewService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
@Slf4j
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @GetMapping("/{productId}")
    public List<Review> getReviews(@PathVariable Long productId){
        log.info("GET /api/review");
        return reviewService.getReviews(productId);
    }

    @PostMapping
    public ResponseEntity<Void> saveReview(Review review){
        log.info("POST /api/review");
        reviewService.saveReview(review);
        return ResponseEntity.noContent().build();
    }
}
