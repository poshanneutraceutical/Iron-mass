import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { orderService } from "../services/orderService";
import { getCustomerId } from "../utils/customer";

const CUSTOMER_ID = getCustomerId();

export default function Checkout() {
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  // Prevent crash while redirecting
  if (!cart) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    if (
      !form.customerName ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setLoading(true);

      const order = await orderService.checkout({
        customerId: CUSTOMER_ID,
        ...form,
      });

      await clearCart();

      localStorage.removeItem("cart");

      navigate("/order-success", {
        state: { order },
      });
    } catch (error) {
      console.error(error);
      alert("Unable to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto py-16 px-6">

        <h1 className="text-5xl font-bold mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Customer Details */}

          <div className="space-y-5">

            <input
              className="w-full bg-[#111] border border-white/10 rounded-lg p-4 focus:border-red-500 outline-none"
              placeholder="Full Name"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
            />

            <input
              type="email"
              className="w-full bg-[#111] border border-white/10 rounded-lg p-4 focus:border-red-500 outline-none"
              placeholder="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              className="w-full bg-[#111] border border-white/10 rounded-lg p-4 focus:border-red-500 outline-none"
              placeholder="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              className="w-full bg-[#111] border border-white/10 rounded-lg p-4 focus:border-red-500 outline-none"
              placeholder="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />

            <input
              className="w-full bg-[#111] border border-white/10 rounded-lg p-4 focus:border-red-500 outline-none"
              placeholder="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />

            <input
              className="w-full bg-[#111] border border-white/10 rounded-lg p-4 focus:border-red-500 outline-none"
              placeholder="State"
              name="state"
              value={form.state}
              onChange={handleChange}
            />

            <input
              className="w-full bg-[#111] border border-white/10 rounded-lg p-4 focus:border-red-500 outline-none"
              placeholder="Pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />

          </div>

          {/* Order Summary */}

          <div className="bg-[#111111] rounded-xl border border-white/10 p-6 h-fit sticky top-24">

            <h2 className="text-3xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-5">

              {cart.items.map((item) => (

                <div
                  key={item.productId}
                  className="flex justify-between items-center border-b border-white/10 pb-4"
                >

                  <div>

                    <p className="font-medium">
                      {item.productName}
                    </p>

                    <p className="text-sm text-white/50">
                      Qty : {item.quantity}
                    </p>

                  </div>

                  <p className="font-semibold">
                    ₹{item.subtotal.toLocaleString("en-IN")}
                  </p>

                </div>

              ))}

            </div>

            <div className="border-t border-white/10 mt-6 pt-6">

              <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span>
                  ₹{cart.totalAmount.toLocaleString("en-IN")}
                </span>

              </div>

            </div>

            <button
              disabled={loading}
              onClick={placeOrder}
              className="btn-primary w-full mt-8 justify-center disabled:opacity-60"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}