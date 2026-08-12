package com.Ironmasswebsite.repository;

import com.Ironmasswebsite.entity.ProductAuth;
import com.Ironmasswebsite.entity.ProductAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductAuthRepository extends JpaRepository<ProductAuth, String> {
    Optional<ProductAuth> findBySecretCode(String secretCode);
}