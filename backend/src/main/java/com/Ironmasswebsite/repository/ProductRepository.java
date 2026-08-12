package com.Ironmasswebsite.repository;

import com.Ironmasswebsite.entity.Product;
import com.Ironmasswebsite.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p ORDER BY p.featured DESC, p.createdAt DESC")
    List<Product> findAllOrdered();
}