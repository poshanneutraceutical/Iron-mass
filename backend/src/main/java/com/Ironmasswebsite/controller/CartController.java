package com.Ironmasswebsite.controller;

import com.Ironmasswebsite.dto.AddToCartRequest;

import com.Ironmasswebsite.dto.CartDTO;

import com.Ironmasswebsite.service.CartService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;


    /**
     * Add product to cart
     *
     * Request:
     * {
     *   "customerId": "123",
     *   "productId": 1,
     *   "quantity": 2
     * }
     */
    @PostMapping("/add")
    public CartDTO addToCart(
            @Valid @RequestBody AddToCartRequest request) {

        return cartService.addToCart(request);
    }



    /**
     * Get customer cart
     *
     * Response includes:
     * - Product id
     * - Product name
     * - Product price
     * - Quantity
     * - Subtotal
     *
     * Images are loaded from frontend product.ts
     */
    @GetMapping("/{customerId}")
    public CartDTO getCart(
            @PathVariable String customerId) {

        return cartService.getCart(customerId);
    }



    /**
     * Update product quantity
     */
    @PutMapping("/{customerId}/{productId}")
    public CartDTO updateQuantity(
            @PathVariable String customerId,
            @PathVariable Long productId,
            @RequestParam Integer quantity) {

        return cartService.updateQuantity(
                customerId,
                productId,
                quantity
        );
    }



    /**
     * Remove product from cart
     */
    @DeleteMapping("/{customerId}/{productId}")
    public CartDTO removeFromCart(
            @PathVariable String customerId,
            @PathVariable Long productId) {

        return cartService.removeFromCart(
                customerId,
                productId
        );
    }
}