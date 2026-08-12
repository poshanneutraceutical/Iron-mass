package com.Ironmasswebsite.controller;

import com.Ironmasswebsite.dto.CheckoutRequestDTO;
import com.Ironmasswebsite.dto.OrderDTO;
import com.Ironmasswebsite.service.OrderService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    /**
     * Checkout and Place Order
     */
    @PostMapping("/checkout")
    public OrderDTO checkout(
            @Valid @RequestBody CheckoutRequestDTO request) {

        return orderService.checkout(request);
    }

}
