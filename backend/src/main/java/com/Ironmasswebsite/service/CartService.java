package com.Ironmasswebsite.service;

import com.Ironmasswebsite.dto.*;
import com.Ironmasswebsite.dto.AddToCartRequest;
import com.Ironmasswebsite.dto.CartDTO;
import com.Ironmasswebsite.dto.CartItemDTO;
import com.Ironmasswebsite.entity.Cart;
import com.Ironmasswebsite.entity.Cart;
import com.Ironmasswebsite.entity.CartItem;
import com.Ironmasswebsite.entity.Product;
import com.Ironmasswebsite.entity.Product;
import com.Ironmasswebsite.repository.CartRepository;
import com.Ironmasswebsite.repository.CartRepository;
import com.Ironmasswebsite.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {


    private final CartRepository cartRepository;

    private final ProductRepository productRepository;



    public CartDTO addToCart(AddToCartRequest request) {


        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Product not found"));



        Cart cart = cartRepository.findByCustomerId(request.getCustomerId())
                .orElseGet(() -> {

                    Cart newCart = Cart.builder()
                            .customerId(request.getCustomerId())
                            .items(new ArrayList<>())
                            .totalAmount(BigDecimal.ZERO)
                            .build();

                    return cartRepository.save(newCart);
                });



        Optional<CartItem> existingItem =
                cart.getItems()
                        .stream()
                        .filter(item ->
                                item.getProduct()
                                        .getId()
                                        .equals(product.getId()))
                        .findFirst();



        if(existingItem.isPresent()) {


            CartItem item = existingItem.get();


            item.setQuantity(
                    item.getQuantity() + request.getQuantity()
            );


            item.setSubtotal(
                    product.getPrice()
                            .multiply(
                                    BigDecimal.valueOf(item.getQuantity())
                            )
            );



        } else {


            CartItem item = CartItem.builder()

                    .cart(cart)

                    .product(product)

                    .quantity(request.getQuantity())

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



        calculateTotal(cart);


        cartRepository.save(cart);



        return convertToDTO(cart);

    }




    public CartDTO getCart(String customerId) {


        Cart cart = cartRepository.findByCustomerId(customerId)

                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Cart not found"
                        ));


        return convertToDTO(cart);

    }





    public CartDTO removeFromCart(
            String customerId,
            Long productId) {



        Cart cart = cartRepository.findByCustomerId(customerId)

                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Cart not found"
                        ));



        cart.getItems()
                .removeIf(item ->
                        item.getProduct()
                                .getId()
                                .equals(productId));



        calculateTotal(cart);


        cartRepository.save(cart);



        return convertToDTO(cart);

    }





    public CartDTO updateQuantity(
            String customerId,
            Long productId,
            Integer quantity) {



        Cart cart = cartRepository.findByCustomerId(customerId)

                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Cart not found"
                        ));



        CartItem item = cart.getItems()

                .stream()

                .filter(i ->
                        i.getProduct()
                                .getId()
                                .equals(productId))

                .findFirst()

                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Product not found in cart"
                        ));




        item.setQuantity(quantity);



        item.setSubtotal(

                item.getProduct()
                        .getPrice()
                        .multiply(
                                BigDecimal.valueOf(quantity)
                        )

        );



        calculateTotal(cart);



        cartRepository.save(cart);



        return convertToDTO(cart);

    }





    private void calculateTotal(Cart cart) {


        BigDecimal total = BigDecimal.ZERO;



        for(CartItem item : cart.getItems()) {


            total = total.add(
                    item.getSubtotal()
            );

        }



        cart.setTotalAmount(total);

    }





    private CartDTO convertToDTO(Cart cart) {


        return CartDTO.builder()

                .id(cart.getId())

                .customerId(cart.getCustomerId())

                .totalAmount(cart.getTotalAmount())


                .items(

                        cart.getItems()

                                .stream()

                                .map(item ->


                                        CartItemDTO.builder()

                                                .productId(
                                                        item.getProduct().getId()
                                                )


                                                .productName(
                                                        item.getProduct().getName()
                                                )


                                                .price(
                                                        item.getProduct().getPrice()
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
