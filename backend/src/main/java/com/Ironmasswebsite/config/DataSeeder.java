
package com.Ironmasswebsite.config;

import com.Ironmasswebsite.entity.Product;

import com.Ironmasswebsite.repository.ProductRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
@Slf4j
public class DataSeeder {

    @Bean
    CommandLineRunner seedProducts(ProductRepository repo) {

        return args -> {

            if (repo.count() > 0) {
                log.info("Products already exist. Skipping seeding.");
                return;
            }

            List<Product> products = List.of(

                    Product.builder()
                            .name("Blood Rush Pre-Workout")
                            .price(new BigDecimal("1000"))
                            .description("Blood Rush Pre-Workout is crafted to deliver explosive energy, intense focus, and long-lasting endurance for every workout.")
                            .category("Pre-Workout")
                            .badge("BEST SELLER")
                            .featured(true)
                            .inStock(true)
                            .build(),

                    Product.builder()
                            .name("Burn Syndicate Pre-Workout + Fat Burner")
                            .price(new BigDecimal("1000"))
                            .description("Push beyond your limits with Ghost Strength Pre-Workout + Fat Burner. Engineered to ignite explosive energy while supporting fat loss.")
                            .category("Pre-Workout")
                            .badge("HOT")
                            .featured(true)
                            .inStock(true)
                            .build(),

                    Product.builder()
                            .name("Devils Pump Non-Stim Pre-Workout")
                            .price(new BigDecimal("1000"))
                            .description("Ghost Strength Non-Stim Pre-Workout delivers clean performance without relying on stimulants.")
                            .category("Pre-Workout")
                            .badge("NEW")
                            .featured(true)
                            .inStock(true)
                            .build(),

                    Product.builder()
                            .name("EAA Electrolyte")
                            .price(new BigDecimal("1000"))
                            .description("Essential amino acids with electrolytes to improve hydration, endurance, and muscle recovery.")
                            .category("Recovery")
                            .badge("POPULAR")
                            .featured(true)
                            .inStock(true)
                            .build(),

                    Product.builder()
                            .name("Ghost Whey Protein")
                            .price(new BigDecimal("1000"))
                            .description("Premium whey protein with superior absorption to maximize muscle recovery and growth.")
                            .category("Protein")
                            .badge("BEST SELLER")
                            .featured(true)
                            .inStock(true)
                            .build(),

                    Product.builder()
                            .name("Protein Coffee")
                            .price(new BigDecimal("1000"))
                            .description("High-protein coffee that combines rich coffee flavor with premium whey protein.")
                            .category("Protein")
                            .badge("NEW")
                            .featured(true)
                            .inStock(true)
                            .build(),

                    Product.builder()
                            .name("Mass Gainer")
                            .price(new BigDecimal("1000"))
                            .description("High-calorie lean mass gainer designed for maximum muscle size and strength.")
                            .category("Mass Gainer")
                            .badge("POPULAR")
                            .featured(true)
                            .inStock(true)
                            .build(),

                    Product.builder()
                            .name("Protein Coffee 2KG")
                            .price(new BigDecimal("1000"))
                            .description("2KG value pack of Protein Coffee for long-term muscle recovery and energy.")
                            .category("Protein")
                            .badge("VALUE PACK")
                            .featured(true)
                            .inStock(true)
                            .build(),

                    Product.builder()
                            .name("Ghost Whey Protein 2KG")
                            .price(new BigDecimal("1000"))
                            .description("2KG premium whey protein for serious athletes looking for maximum performance.")
                            .category("Protein")
                            .badge("VALUE PACK")
                            .featured(true)
                            .inStock(true)
                            .build()

            );

            repo.saveAll(products);

            log.info("Successfully seeded {} Ghost Strength products.", products.size());
        };
    }
}

