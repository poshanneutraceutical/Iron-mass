package com.Ironmasswebsite.service;

import com.Ironmasswebsite.dto.AddToCartRequest;
import com.Ironmasswebsite.dto.CartDTO;
import com.Ironmasswebsite.dto.CartItemDTO;
import com.Ironmasswebsite.entity.Cart;
import com.Ironmasswebsite.entity.CartItem;
import com.Ironmasswebsite.entity.Product;
import com.Ironmasswebsite.repository.CartRepository;
import com.Ironmasswebsite.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final CartRepository cartRepository;

    private final ProductRepository productRepository;

    /*
     * ADD TO CART
     */
    public CartDTO addToCart(
            AddToCartRequest request
    ) {

        if (request.getQuantity() == null ||
                request.getQuantity() <= 0) {

            throw new IllegalArgumentException(
                    "Quantity must be greater than 0"
            );
        }

        /*
         * Find product
         */
        Product product =
                productRepository.findById(
                        request.getProductId()
                ).orElseThrow(() ->
                        new EntityNotFoundException(
                                "Product not found: "
                                        + request.getProductId()
                        )
                );

        /*
         * Find existing cart
         * or create a new one
         */
        Cart cart =
                cartRepository
                        .findByCustomerId(
                                request.getCustomerId()
                        )
                        .orElseGet(() -> {

                            Cart newCart =
                                    Cart.builder()
                                            .customerId(
                                                    request.getCustomerId()
                                            )
                                            .items(
                                                    new ArrayList<>()
                                            )
                                            .totalAmount(
                                                    BigDecimal.ZERO
                                            )
                                            .build();

                            return cartRepository.save(
                                    newCart
                            );
                        });

        /*
         * Check whether product
         * already exists in cart
         */
        CartItem existingItem =
                cart.getItems()
                        .stream()
                        .filter(item ->
                                item.getProduct()
                                        .getId()
                                        .equals(
                                                product.getId()
                                        )
                        )
                        .findFirst()
                        .orElse(null);

        /*
         * Product already exists
         */
        if (existingItem != null) {

            int newQuantity =
                    existingItem.getQuantity()
                            + request.getQuantity();

            existingItem.setQuantity(
                    newQuantity
            );

            existingItem.setSubtotal(
                    product.getPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            newQuantity
                                    )
                            )
            );

        } else {

            /*
             * New cart item
             */
            CartItem item =
                    CartItem.builder()
                            .cart(cart)
                            .product(product)
                            .quantity(
                                    request.getQuantity()
                            )
                            .subtotal(
                                    product.getPrice()
                                            .multiply(
                                                    BigDecimal.valueOf(
                                                            request.getQuantity()
                                                    )
                                            )
                            )
                            .build();

            cart.getItems().add(item);
        }

        /*
         * Recalculate total
         */
        calculateTotal(cart);

        /*
         * Save cart
         */
        cartRepository.save(cart);

        return convertToDTO(cart);
    }

    /*
     * GET CART
     */
    public CartDTO getCart(
            String customerId
    ) {

        /*
         * If no cart exists yet,
         * return an empty cart instead
         * of throwing an error.
         */
        Cart cart =
                cartRepository
                        .findByCustomerId(customerId)
                        .orElseGet(() ->

                                Cart.builder()
                                        .customerId(customerId)
                                        .items(
                                                new ArrayList<>()
                                        )
                                        .totalAmount(
                                                BigDecimal.ZERO
                                        )
                                        .build()
                        );

        return convertToDTO(cart);
    }

    /*
     * REMOVE PRODUCT
     */
    public CartDTO removeFromCart(
            String customerId,
            Long productId
    ) {

        Cart cart =
                cartRepository
                        .findByCustomerId(customerId)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Cart not found"
                                )
                        );

        cart.getItems().removeIf(
                item ->
                        item.getProduct()
                                .getId()
                                .equals(productId)
        );

        calculateTotal(cart);

        cartRepository.save(cart);

        return convertToDTO(cart);
    }

    /*
     * UPDATE QUANTITY
     */
    public CartDTO updateQuantity(
            String customerId,
            Long productId,
            Integer quantity
    ) {

        if (quantity == null ||
                quantity <= 0) {

            return removeFromCart(
                    customerId,
                    productId
            );
        }

        Cart cart =
                cartRepository
                        .findByCustomerId(customerId)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Cart not found"
                                )
                        );

        CartItem item =
                cart.getItems()
                        .stream()
                        .filter(
                                i ->
                                        i.getProduct()
                                                .getId()
                                                .equals(
                                                        productId
                                                )
                        )
                        .findFirst()
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Product not found in cart"
                                )
                        );

        item.setQuantity(quantity);

        item.setSubtotal(
                item.getProduct()
                        .getPrice()
                        .multiply(
                                BigDecimal.valueOf(
                                        quantity
                                )
                        )
        );

        calculateTotal(cart);

        cartRepository.save(cart);

        return convertToDTO(cart);
    }

    /*
     * CLEAR CART
     */
    public void clearCart(
            String customerId
    ) {

        Cart cart =
                cartRepository
                        .findByCustomerId(customerId)
                        .orElse(null);

        if (cart == null) {
            return;
        }

        cart.getItems().clear();

        cart.setTotalAmount(
                BigDecimal.ZERO
        );

        cartRepository.save(cart);
    }

    /*
     * CALCULATE TOTAL
     */
    private void calculateTotal(
            Cart cart
    ) {

        BigDecimal total =
                BigDecimal.ZERO;

        for (CartItem item :
                cart.getItems()) {

            if (item.getSubtotal() != null) {

                total =
                        total.add(
                                item.getSubtotal()
                        );
            }
        }

        cart.setTotalAmount(total);
    }

    /*
     * CONVERT ENTITY → DTO
     */
    private CartDTO convertToDTO(
            Cart cart
    ) {

        return CartDTO.builder()

                .id(cart.getId())

                .customerId(
                        cart.getCustomerId()
                )

                .totalAmount(
                        cart.getTotalAmount()
                )

                .items(
                        cart.getItems()
                                .stream()
                                .map(item ->

                                        CartItemDTO.builder()

                                                .productId(
                                                        item.getProduct()
                                                                .getId()
                                                )

                                                .productName(
                                                        item.getProduct()
                                                                .getName()
                                                )

                                                .price(
                                                        item.getProduct()
                                                                .getPrice()
                                                )

                                                .quantity(
                                                        item.getQuantity()
                                                )

                                                .subtotal(
                                                        item.getSubtotal()
                                                )

                                                .build()
                                )
                                .toList()
                )

                .build();
    }
}