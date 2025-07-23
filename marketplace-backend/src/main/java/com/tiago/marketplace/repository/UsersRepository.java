package com.tiago.marketplace.repository;

import com.tiago.marketplace.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
}
