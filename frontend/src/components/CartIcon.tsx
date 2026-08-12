import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartIcon() {

  const { cartCount } = useCart();

  const navigate = useNavigate();

  return (

    <button
      onClick={() => navigate("/cart")}
      className="
        relative
        p-2
        text-white
        transition-all
        duration-200
        hover:text-[#d4af37]
        hover:scale-110
      "
      aria-label="Shopping Cart"
    >

      <ShoppingCart size={28} strokeWidth={2} />

      {cartCount > 0 && (

        <span
          className="
            absolute
            -top-2
            -right-2
            min-w-[20px]
            h-5
            px-1
            rounded-full
            bg-[#d4af37]
            text-black
            text-[11px]
            font-bold
            flex
            items-center
            justify-center
            shadow-lg
            border
            border-black
          "
        >
          {cartCount}
        </span>

      )}

    </button>

  );

}