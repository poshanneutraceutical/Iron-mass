package com.Ironmasswebsite.repository;

import com.Ironmasswebsite.entity.OrderItem;
import com.Ironmasswebsite.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrderId(Long orderId);

}