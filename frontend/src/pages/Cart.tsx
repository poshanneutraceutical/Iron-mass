import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


const getProductImage = (productId: number) => {

  const images: Record<number, string> = {

    1: "/products/pre-workout/1.png",

    2: "/products/Fat-burner/7.png",

    3: "/products/Non-stim preworkout/13.png",

    4: "/products/EAA electrolyte/19.png",

    5: "/products/protein/25.png",

    6: "/products/protein coffee/28.png",

    7: "/products/protein balgain/31.png",

    8: "/products/protein 2kg coffee/34.png",

    9: "/products/protein 2kg/37.png",

  };


  return images[productId] || "/products/default.png";

};



export default function Cart() {


  const {
    cart,
    loading,
    updateQuantity,
    removeItem,
  } = useCart();


  const navigate = useNavigate();



  if (loading) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">

        Loading Cart...

      </div>

    );

  }



  if (!cart || !cart.items || cart.items.length === 0) {


    return (

      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6">


        <h1 className="text-4xl font-bold mb-4">

          Your Cart is Empty

        </h1>


        <p className="text-white/60 mb-8">

          Add some Ghost Strength products.

        </p>



        <button

          onClick={() => navigate("/")}

          className="btn-primary flex items-center gap-2"

        >

          <ArrowLeft size={18}/>

          Continue Shopping

        </button>


      </div>

    );

  }





  return (

    <div className="min-h-screen bg-black text-white">


      <div className="max-w-7xl mx-auto py-16 px-6">



        <h1 className="text-5xl font-bold mb-12">

          Shopping Cart

        </h1>





        <div className="grid lg:grid-cols-3 gap-10">





          <div className="lg:col-span-2 space-y-6">



            {cart.items.map((item) => (



              <div

                key={item.productId}

                className="bg-[#111111] border border-white/10 rounded-xl p-5 flex gap-5"

              >



                <img

                  src={getProductImage(item.productId)}

                  alt={item.productName}

                  className="w-28 h-28 rounded-lg object-cover"

                />





                <div className="flex-1">



                  <h2 className="text-2xl font-semibold mb-2">

                    {item.productName}

                  </h2>



                  <p className="text-red-500 text-xl mb-3">

                    ₹{item.price.toLocaleString("en-IN")}

                  </p>





                  <div className="flex items-center gap-4">



                    <button

                      className="bg-[#1b1b1b] p-2 rounded"

                      onClick={() => {

                        if(item.quantity > 1){

                          updateQuantity(

                            item.productId,

                            item.quantity - 1

                          );

                        }

                      }}

                    >

                      <Minus size={18}/>

                    </button>





                    <span className="text-xl">

                      {item.quantity}

                    </span>





                    <button

                      className="bg-[#1b1b1b] p-2 rounded"

                      onClick={() =>

                        updateQuantity(

                          item.productId,

                          item.quantity + 1

                        )

                      }

                    >

                      <Plus size={18}/>

                    </button>





                    <button

                      className="ml-auto text-red-500 hover:text-red-600"

                      onClick={() =>

                        removeItem(item.productId)

                      }

                    >

                      <Trash2 size={22}/>

                    </button>



                  </div>



                </div>





                <div className="text-right">


                  <p className="text-2xl font-bold">

                    ₹{item.subtotal.toLocaleString("en-IN")}

                  </p>


                </div>



              </div>



            ))}



          </div>






         <div className="bg-[#111111] border border-white/10 rounded-xl p-6 h-fit sticky top-24">

           <h2 className="text-3xl font-bold mb-6">
             Order Summary
           </h2>

           <div className="flex justify-between mb-4">
             <span>Items</span>
             <span>{cart.items.length}</span>
           </div>

           <div className="flex justify-between text-2xl font-bold border-t border-white/10 pt-5">
             <span>Total</span>
             <span>
               ₹{cart.totalAmount.toLocaleString("en-IN")}
             </span>
           </div>

           <button
             onClick={() => navigate("/checkout")}
             className="btn-primary w-full mt-8 justify-center"
           >
             Proceed to Checkout
           </button>

           <button
             onClick={() => navigate("/")}
             className="btn-outline w-full mt-4 justify-center"
           >
             Continue Shopping
           </button>


          </div>



        </div>



      </div>



    </div>

  );

}