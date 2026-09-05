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

    /*
     * Add product to cart
     */
    @PostMapping("/add")
    public CartDTO addToCart(
            @Valid @RequestBody AddToCartRequest request
    ) {
        return cartService.addToCart(request);
    }

    /*
     * Get customer cart
     */
    @GetMapping("/{customerId}")
    public CartDTO getCart(
            @PathVariable String customerId
    ) {
        return cartService.getCart(customerId);
    }

    /*
     * Update quantity
     */
    @PutMapping("/{customerId}/{productId}")
    public CartDTO updateQuantity(
            @PathVariable String customerId,
            @PathVariable Long productId,
            @RequestParam Integer quantity
    ) {
        return cartService.updateQuantity(
                customerId,
                productId,
                quantity
        );
    }

    /*
     * Remove product
     */
    @DeleteMapping("/{customerId}/{productId}")
    public CartDTO removeFromCart(
            @PathVariable String customerId,
            @PathVariable Long productId
    ) {
        return cartService.removeFromCart(
                customerId,
                productId
        );
    }

    /*
     * Clear entire cart
     */
    @DeleteMapping("/{customerId}/clear")
    public void clearCart(
            @PathVariable String customerId
    ) {
        cartService.clearCart(customerId);
    }
}