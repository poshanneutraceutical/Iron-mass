import { useEffect, useState, useRef } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";

import { type Product } from "../lib/api";
import { useCart } from "../context/CartContext";

import ProductCarousel from "./ProductCarousel";
import ProductBackground from "./ProductBackground";
import ProductQuickView from "./ProductQuickView";

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Blood Rush Pre-Workout",
    price: 1000,
    description:
      "Blood Rush Pre-Workout is crafted to deliver explosive energy, intense focus, and long-lasting endurance for athletes who refuse to settle. Powered by premium performance ingredients, it helps maximize strength, improve training intensity, and support peak performance—so every workout brings you one step closer to your goals.",
    category: "pre-workout",
    images: [
      "/products/pre-workout/1.png",
      "/products/pre-workout/2.png",
      "/products/pre-workout/3.png",
      "/products/pre-workout/4.png",
      "/products/pre-workout/5.png",
      "/products/pre-workout/6.png",
    ],
    badge: "BEST SELLER",
    featured: true,
    inStock: true,
  },

  {
    id: 2,
    name: "Burn Syndicate Pre-workout + Fat burner",
    price: 1000,
    description:
      "Push beyond your limits with Ghost Strength Pre-Workout + Fat Burner. Engineered to ignite explosive energy, razor-sharp focus, and relentless endurance, this formula is built for those who refuse to quit. Train harder, move faster, and dominate every session with confidence.",
    category: "pre-workout",
    images: [
      "/products/Fat-burner/7.png",
      "/products/Fat-burner/8.png",
      "/products/Fat-burner/9.png",
      "/products/Fat-burner/10.png",
      "/products/Fat-burner/11.png",
      "/products/Fat-burner/12.png",
    ],
    badge: "BEST SELLER",
    featured: true,
    inStock: true,
  },

  {
    id: 3,
    name: "Devils Pump Non-Stim Pre-Workout",
    price: 1000,
    description:
      "Ghost Strength Non-Stim Pre-Workout delivers clean performance without relying on stimulants. Engineered to support endurance, focus, and workout intensity, it helps you stay consistent and perform at your peak—day or night.",
    category: "pre-workout",
    images: [
      "/products/Non-stim preworkout/13.png",
      "/products/Non-stim preworkout/14.png",
      "/products/Non-stim preworkout/15.png",
      "/products/Non-stim preworkout/16.png",
      "/products/Non-stim preworkout/17.png",
      "/products/Non-stim preworkout/18.png",
    ],
    badge: "BEST SELLER",
    featured: true,
    inStock: true,
  },

  {
    id: 4,
    name: "EAA + Electrolytes",
    price: 1000,
    description:
      "Ghost Strength EAA + Electrolytes is crafted to support hydration, endurance, and muscle recovery with a premium blend of essential amino acids and electrolytes. Designed for athletes and fitness enthusiasts, it helps you stay hydrated, maintain performance, and recover efficiently throughout every training session.",
    category: "pre-workout",
    images: [
      "/products/EAA electrolyte/19.png",
      "/products/EAA electrolyte/20.png",
      "/products/EAA electrolyte/21.png",
      "/products/EAA electrolyte/22.png",
      "/products/EAA electrolyte/23.png",
      "/products/EAA electrolyte/24.png",
    ],
    badge: "BEST SELLER",
    featured: true,
    inStock: true,
  },

  {
    id: 5,
    name: "Protein Matrix-150",
    price: 1000,
    description:
      "Ghost Strength Protein Matrix 150 is a premium high-protein formula designed to support muscle growth, recovery, and daily performance. Crafted with a balanced protein blend, it provides sustained nourishment to help athletes and fitness enthusiasts build lean muscle, recover efficiently, and stay fueled throughout the day.",
    category: "protein",
    images: [
      "/products/protein/25.png",
      "/products/protein/26.png",
      "/products/protein/27.png",
    ],
    badge: "BEST SELLER",
    featured: true,
    inStock: true,
  },

  {
    id: 6,
    name: "Protein Matrix-150 Coffee",
    price: 1000,
    description:
      "Ghost Strength Protein Matrix 150 is a premium high-protein formula designed to support muscle growth, recovery, and daily performance. Crafted with a balanced protein blend, it provides sustained nourishment to help athletes and fitness enthusiasts build lean muscle, recover efficiently, and stay fueled throughout the day.",
    category: "protein",
    images: [
      "/products/protein coffee/28.png",
      "/products/protein coffee/29.png",
      "/products/protein coffee/30.png",
    ],
    badge: "BEST SELLER",
    featured: true,
    inStock: true,
  },

  {
    id: 7,
    name: "Protein Matrix-150 Balgain",
    price: 1000,
    description:
      "Ghost Strength Protein Matrix 150 is a premium high-protein formula designed to support muscle growth, recovery, and daily performance. Crafted with a balanced protein blend, it provides sustained nourishment to help athletes and fitness enthusiasts build lean muscle, recover efficiently, and stay fueled throughout the day.",
    category: "protein",
    images: [
      "/public/1logo.png.jpeg",
      "/products/protein balgain/32.png",
      "/products/protein balgain/33.png",
    ],
    badge: "BEST SELLER",
    featured: true,
    inStock: true,
  },

  {
    id: 8,
    name: "Protein 2kg Matrix-150 Coffee",
    price: 1000,
    description:
      "Ghost Strength Protein Matrix 150 is a premium high-protein formula designed to support muscle growth, recovery, and daily performance. Crafted with a balanced protein blend, it provides sustained nourishment to help athletes and fitness enthusiasts build lean muscle, recover efficiently, and stay fueled throughout the day.",
    category: "protein",
    images: [
      "/products/protein 2kg coffee/34.png",
      "/products/protein 2kg coffee/35.png",
      "/products/protein 2kg coffee/36.png",
    ],
    badge: "BEST SELLER",
    featured: true,
    inStock: true,
  },

  {
    id: 9,
    name: "Protein 2kg Matrix-150 Mango",
    price: 1000,
    description:
      "Ghost Strength Protein Matrix 150 is a premium high-protein formula designed to support muscle growth, recovery, and daily performance. Crafted with a balanced protein blend, it provides sustained nourishment to help athletes and fitness enthusiasts build lean muscle, recover efficiently, and stay fueled throughout the day.",
    category: "protein",
    images: [
      "/products/protein 2kg/37.png",
      "/products/protein 2kg/38.png",
      "/products/protein 2kg/39.png",
    ],
    badge: "BEST SELLER",
    featured: true,
    inStock: true,
  },
];

export default function Products() {
  const [products] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const [addingProductId, setAddingProductId] =
    useState<number | null>(null);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [quickViewOpen, setQuickViewOpen] =
    useState(false);

  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setQuickViewOpen(false);
    setSelectedProduct(null);
  };

  const handleAddFromModal = async (productId: number) => {
    try {
      setAddingProductId(productId);

      await addToCart(productId, 1);

      const product = products.find((p) => p.id === productId);

      if (product) {
        alert(`${product.name} added to cart`);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to add product to cart.");
    } finally {
      setAddingProductId(null);
    }
  };
  const handleCardMove = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    const card = cardRefs.current[index];

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = -((y / rect.height) - 0.5) * 10;

    card.style.transform = `
      perspective(1400px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
    `;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  };

  const resetCard = (index: number) => {
    const card = cardRefs.current[index];

    if (!card) return;

    card.style.transform =
      "perspective(1400px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <section
      id="arsenal"
      className="relative py-28 bg-[#0b0b0b] overflow-hidden"
    >
      {/* Premium Animated Background */}
      <div className="absolute inset-0 z-0">
        <ProductBackground />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        data-reveal
        <div className="text-center mb-20 reveal reveal-up">
          <span className="inline-block uppercase tracking-[0.45em] text-[#d4af37] text-sm font-semibold mb-5">
            Premium Sports Nutrition
          </span>

          <h2 className="text-5xl md:text-7xl xl:text-8xl font-black uppercase leading-none">
            <span className="text-white">Iron</span>{" "}
            <span className="text-[#d4af37]">Mass</span>
          </h2>

          <div className="w-32 h-[3px] bg-[#d4af37] mx-auto my-8 rounded-full" />

          <p className="max-w-3xl mx-auto text-lg text-gray-400 leading-8">
            Discover scientifically engineered supplements created to maximize
            muscle growth, explosive strength, endurance, recovery and peak
            athletic performance. Every IronMass formula is manufactured using
            premium ingredients and rigorous quality standards.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {products.map((p, i) => (
            <article
             data-reveal
              key={p.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onMouseMove={(e) => handleCardMove(e, i)}
              onMouseLeave={() => resetCard(i)}
              className="
                product-card
                reveal
                reveal-up
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-[#d4af37]/20
                bg-[#111111]/90
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#d4af37]
              "
              style={{
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Gold Badge */}
              {p.badge && (
                <div className="absolute top-5 left-5 z-30">
                  <span className="px-3 py-1 rounded-full bg-[#d4af37] text-[#111] text-xs font-bold uppercase tracking-wider shadow-lg">
                    {p.badge}
                  </span>
                </div>
              )}

              {/* Product Image */}
              <div className="relative overflow-hidden bg-gradient-to-b from-[#181818] to-[#0d0d0d]">
                {/* Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,.18),transparent_70%)]" />

                {!p.inStock && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30">
                    <span className="text-white font-bold tracking-[0.3em] uppercase">
                      Sold Out
                    </span>
                  </div>
                )}

                <div
                  onClick={() => openQuickView(p)}
                  className="
                    cursor-pointer
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                >
                  <ProductCarousel
                    images={p.images}
                    productName={p.name}
                  />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7">
                <div className="text-xs uppercase tracking-[0.35em] text-[#d4af37] mb-3">
                  {p.category}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#d4af37] transition-colors duration-200">
                  {p.name}
                </h3>

                <p className="text-gray-400 text-sm leading-7 h-[78px] overflow-hidden">
                  {p.description}
                </p>

                <div className="flex items-center justify-between mt-8">
                  <div>
                    <p className="text-sm uppercase tracking-wider text-gray-500">
                      Starting From
                    </p>

                    <h4 className="text-3xl font-black text-[#d4af37]">
                      ₹{Number(p.price).toLocaleString("en-IN")}
                    </h4>
                  </div>
                                    <button
                                      disabled={!p.inStock || addingProductId === p.id}
                                      onClick={async () => {
                                        try {
                                          setAddingProductId(p.id);

                                          await addToCart(p.id, 1);

                                          alert(`${p.name} added to cart`);
                                        } catch (error) {
                                          console.error(error);

                                          alert("Unable to add product to cart.");
                                        } finally {
                                          setAddingProductId(null);
                                        }
                                      }}
                                      className="
                                        shimmer-btn
                                        px-6
                                        py-3
                                        rounded-xl
                                        bg-[#d4af37]
                                        text-black
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        transition-all
                                        duration-300
                                        hover:scale-105
                                        hover:bg-[#f4c542]
                                        hover:shadow-[0_0_35px_rgba(212,175,55,.35)]
                                        disabled:opacity-50
                                        disabled:cursor-not-allowed
                                        flex
                                        items-center
                                        gap-2
                                      "
                                    >
                                      <ShoppingBag size={18} />

                                      {addingProductId === p.id ? "Adding..." : "Add"}

                                    </button>

                                  </div>

                                </div>

                              </article>

                            ))}

                          </div>

                          {/* Bottom CTA */}

                          <div
                           data-reveal
                          className="mt-24 reveal reveal-scale">

                            <div className="rounded-3xl border border-[#d4af37]/20 bg-gradient-to-r from-[#111111] via-[#171717] to-[#111111] p-10 md:p-16 text-center">

                              <span className="uppercase tracking-[0.4em] text-[#d4af37] text-sm font-semibold">

                                Built For Champions

                              </span>

                              <h2 className="text-4xl md:text-6xl font-black uppercase text-white mt-5 mb-6">

                                Fuel Your

                                <span className="text-[#d4af37]">

                                  {" "}Next Workout

                                </span>

                              </h2>

                              <p className="max-w-3xl mx-auto text-gray-400 leading-8">

                                IronMass supplements are engineered to help athletes unlock
                                maximum strength, muscle growth, endurance and recovery.
                                Experience premium performance with every serving.

                              </p>
                                          <button
                                            className="
                                              shimmer-btn
                                              mt-10
                                              px-10
                                              py-4
                                              rounded-xl
                                              bg-[#d4af37]
                                              text-black
                                              font-bold
                                              uppercase
                                              tracking-widest
                                              transition-all
                                              duration-200
                                              hover:bg-[#f2c94c]
                                              hover:scale-105
                                              flex
                                              items-center
                                              justify-center
                                              gap-3
                                              mx-auto
                                            "
                                          >
                                            Explore Collection
                                            <ArrowRight size={18} />
                                          </button>

                                        </div>

                                      </div>

                                    </div>

                                    {/* Quick View */}

                                    <ProductQuickView
                                      product={selectedProduct}
                                      isOpen={quickViewOpen}
                                      onClose={closeQuickView}
                                      addingProductId={addingProductId}
                                      onAddToCart={handleAddFromModal}
                                    />

                                  </section>
                                );
                              }