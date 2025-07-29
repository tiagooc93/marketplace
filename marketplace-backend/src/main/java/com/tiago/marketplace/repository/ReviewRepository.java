package com.tiago.marketplace.repository;

import com.tiago.marketplace.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Long> {

    List<Review> findByProductId(Long productId);

    Boolean existsByProductIdAndUsername(Long productId, String username);
}
