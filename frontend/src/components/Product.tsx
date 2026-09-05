import { useState, useRef } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { type Product } from "../lib/api";
import { useCart } from "../context/CartContext";
import ProductCarousel from "./ProductCarousel";
import ProductBackground from "./ProductBackground";
import ProductQuickView from "./ProductQuickView";

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Bulk Mass Gainer",
    price: 4200,
    description:
      "Bulk Mass Gainer in Double Chocolate flavour. Net weight 3 KG.",
    category: "Mass Gainer",
    images: ["/products/ironmass massgainer.png"],
    badge: "NEW",
    featured: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Nitro Surge Pre-Workout",
    price: 1899,
    description:
      "Nitro Surge Pre-Workout in Candy Orange flavour. Net weight 180 GM with 30 servings.",
    category: "Pre-Workout",
    images: ["/products/iron mass pre workout.png"],
    badge: "NEW",
    featured: true,
    inStock: true,
  },
  {
    id: 3,
    name: "Mech-Warrior",
    price: 2199,
    description:
      "Mech-Warrior pre-workout in Candy Orange flavour. Net weight 300 GM with 30 servings.",
    category: "Pre-Workout",
    images: ["/products/ironmass pre.png"],
    badge: "NEW",
    featured: true,
    inStock: true,
  },
];

export default function Products() {
  const { addToCart } = useCart();

  const [products] = useState<Product[]>(fallbackProducts);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const [addingProductId, setAddingProductId] =
    useState<number | null>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      closeQuickView();
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    } finally {
      setAddingProductId(null);
    }
  };

  const handleAddToCart = async (product: Product) => {
    try {
      setAddingProductId(product.id);

      await addToCart(product.id, 1);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    } finally {
      setAddingProductId(null);
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const card = cardRefs.current[index];

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-4px)
    `;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];

    if (!card) return;

    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
    `;
  };

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-black py-20 lg:py-28"
    >
      <ProductBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="mb-14 text-center">

          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.3em] text-yellow-400">
            IRON MASS NUTRITION
          </span>

          <h2 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
            OUR{" "}
            <span className="text-yellow-400">
              PRODUCTS
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
            Premium sports nutrition products designed for your
            training, performance and goals.
          </p>
        </div>

        {/* ================= PRODUCTS GRID ================= */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              onMouseMove={(event) =>
                handleMouseMove(event, index)
              }
              onMouseLeave={() =>
                handleMouseLeave(index)
              }
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-950/90
                transition-all
                duration-300
                hover:border-yellow-500/50
              "
            >

              {/* ================= PRODUCT IMAGE ================= */}
              <div
                className="relative cursor-pointer"
                onClick={() =>
                  openQuickView(product)
                }
              >

                <ProductCarousel
                  images={product.images}
                  productName={product.name}
                />

                {/* ================= NEW BADGE ================= */}
                {product.badge && (
                  <div
                    className="
                      absolute
                      left-4
                      top-4
                      z-20
                      rounded-full
                      bg-yellow-500
                      px-3
                      py-1
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-black
                    "
                  >
                    {product.badge}
                  </div>
                )}
              </div>

              {/* ================= PRODUCT INFORMATION ================= */}
              <div className="p-6">

                {/* CATEGORY */}
                <div
                  className="
                    mb-2
                    text-xs
                    font-semibold
                    uppercase
                    tracking-widest
                    text-yellow-400
                  "
                >
                  {product.category}
                </div>

                {/* PRODUCT NAME */}
                <h3
                  onClick={() =>
                    openQuickView(product)
                  }
                  className="
                    cursor-pointer
                    text-2xl
                    font-black
                    uppercase
                    tracking-tight
                    text-white
                    transition-colors
                    group-hover:text-yellow-400
                  "
                >
                  {product.name}
                </h3>

                {/* DESCRIPTION */}
                <p
                  className="
                    mt-3
                    min-h-[48px]
                    text-sm
                    leading-relaxed
                    text-zinc-400
                  "
                >
                  {product.description}
                </p>

                {/* PRICE + CART */}
                <div
                  className="
                    mt-6
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >

                  {/* PRICE */}
                  <div>
                    <span
                      className="
                        text-2xl
                        font-black
                        text-white
                      "
                    >
                      ₹
                      {Number(product.price).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  {/* ADD TO CART */}
                  <button
                    type="button"
                    disabled={
                      !product.inStock ||
                      addingProductId === product.id
                    }
                    onClick={() =>
                      handleAddToCart(product)
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      bg-yellow-500
                      px-4
                      py-3
                      text-sm
                      font-bold
                      uppercase
                      tracking-wide
                      text-black
                      transition-all
                      hover:bg-yellow-400
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <ShoppingBag size={18} />

                    {addingProductId === product.id
                      ? "ADDING..."
                      : "ADD TO CART"}
                  </button>
                </div>

                {/* VIEW DETAILS */}
                <button
                  type="button"
                  onClick={() =>
                    openQuickView(product)
                  }
                  className="
                    mt-4
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    border-t
                    border-zinc-800
                    pt-4
                    text-xs
                    font-bold
                    uppercase
                    tracking-widest
                    text-zinc-400
                    transition-colors
                    hover:text-yellow-400
                  "
                >
                  View Details

                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= QUICK VIEW ================= */}
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