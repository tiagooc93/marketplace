package com.tiago.marketplace.repository;

import com.tiago.marketplace.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Orders, Long> {
}
