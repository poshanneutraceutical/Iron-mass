import { getCustomerId } from "../utils/customer";
import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


interface CartContextType {

    cart: Cart | null;

    loading: boolean;

    addToCart: (
        productId: number,
        quantity?: number
    ) => Promise<void>;

    removeItem: (
        productId: number
    ) => Promise<void>;

    updateQuantity: (
        productId: number,
        quantity: number
    ) => Promise<void>;

    refreshCart: () => Promise<void>;

    cartCount: number;

    clearCart: () => Promise<void>;
}



const CartContext = createContext<CartContextType | undefined>(undefined);


const CUSTOMER_ID = getCustomerId();



export const CartProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {


    const [cart, setCart] = useState<Cart | null>(null);

    const [loading, setLoading] = useState(false);



    // Load Cart
    const refreshCart = async () => {

        try {

            setLoading(true);

            const data =
                await cartService.getCart(CUSTOMER_ID);

            setCart(data);


        } catch {

            setCart(null);


        } finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        refreshCart();

    }, []);





    // Add Product
    const addToCart = async (
        productId: number,
        quantity: number = 1
    ) => {


        setLoading(true);


        try {


            const data =
                await cartService.addToCart({

                    customerId: CUSTOMER_ID,

                    productId,

                    quantity,

                });


            setCart(data);



        } finally {


            setLoading(false);


        }

    };






    // Remove Product
    const removeItem = async (
        productId: number
    ) => {


        setLoading(true);


        try {


            const data =
                await cartService.removeItem(
                    CUSTOMER_ID,
                    productId
                );


            setCart(data);



        } finally {


            setLoading(false);


        }

    };






    // Update Quantity
    const updateQuantity = async (
        productId: number,
        quantity: number
    ) => {


        setLoading(true);


        try {


            const data =
                await cartService.updateQuantity(
                    CUSTOMER_ID,
                    productId,
                    quantity
                );


            setCart(data);



        } finally {


            setLoading(false);


        }

    };






    // Clear Cart
    const clearCart = async () => {


        try {


            if (cartService.clearCart) {

                await cartService.clearCart(
                    CUSTOMER_ID
                );

            }


        } catch (err) {


            console.log(
                "Backend clearCart unavailable",
                err
            );


        }


        setCart(null);


        localStorage.removeItem("cart");

    };






    // Cart Quantity Count
    const cartCount =
        cart?.items?.reduce(
            (
                sum: number,
                item: CartItem
            ) =>
                sum + item.quantity,

            0

        ) || 0;






    return (

        <CartContext.Provider

            value={{

                cart,

                loading,

                addToCart,

                removeItem,

                updateQuantity,

                refreshCart,

                cartCount,

                clearCart,

            }}

        >

            {children}

        </CartContext.Provider>

    );

};





export const useCart = () => {


    const context =
        useContext(CartContext);



    if (!context) {

        throw new Error(
            "useCart must be used inside CartProvider"
        );

    }



    return context;

};