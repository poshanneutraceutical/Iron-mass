package com.Ironmasswebsite.repository;

import com.Ironmasswebsite.entity.Cart;
import com.Ironmasswebsite.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByCustomerId(String customerId);

}