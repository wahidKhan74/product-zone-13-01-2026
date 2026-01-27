// cart list to display items in the cart
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItemsThunk, removeItem, removeItemFromCartThunk, updateCartItemQuantityThunk } from "../../redux/cartReducer";
import { useEffect } from "react";

export default function CartList() {

    // Redux hooks
    const dispatch = useDispatch();
    // Get cart and products state from Redux store
    const cart = useSelector((state) => state.cart);
    const products = useSelector((state) => state.product.items);

    // Fetch cart items on load
    useEffect(() => {
        dispatch(fetchCartItemsThunk());
    }, [dispatch]);

    // JOIN cart items with product details
    const cartItemsDetailed = cart.items.map((cartItem) => {
        const product = products.find(
            (p) => p.id == cartItem.productId
        );
        return {
            ...cartItem,
            product,
            total: product ? product.price * cartItem.quantity: 0,
        };
    });

    const increaseQty = (item) => {
        const updatedItems = cart.items.map(cartItem =>
            cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        dispatch(
            updateCartItemQuantityThunk({
                cartId: cart.id,
                items: updatedItems
           })
        );
    };

    const decreaseQty = (item) => {
        let updatedItems;
        if (item.quantity > 1) {
            updatedItems = cart.items.map(cartItem =>
            cartItem.productId === item.productId
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            );
        } else {
            // optional: remove item when quantity = 1
            updatedItems = cart.items.filter(
            cartItem => cartItem.productId !== item.productId
);
        }

        dispatch(
            updateCartItemQuantityThunk({
            cartId: cart.id,
            items: updatedItems
            })
        );
    };

    const removeItem = (productId) => {
        dispatch(removeItemFromCartThunk(productId));
    };

    const totalAmount = cartItemsDetailed.reduce(
        (sum, item) => sum + item.total, 0
    );

    if (!cartItemsDetailed.length) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <h2 className="text-2xl font-bold mb-2">Your cart is empty 🛒</h2>
                <p className="text-gray-500">
                    Add products to see them here.
                </p>
            </div>
        );
    }
    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

            <div className="space-y-4">
                {cartItemsDetailed.map((item) => (
                    <div
                        key={item.productId}
                        className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
                    >
                        {/* PRODUCT INFO */}
                        <div>
                            <h4 className="font-semibold text-lg">
                                {item.product?.name || "Product not found"}
                            </h4>
                            <p className="text-sm text-gray-500">
                                ${item.product?.price} × {item.quantity}
                            </p>
                        </div>

                        {/* QUANTITY */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => decreaseQty(item)}
                                className="px-3 py-1 bg-gray-200 rounded"
                            >
                                −
                            </button>

                            <span className="font-medium">{item.quantity}</span>

                            <button
                                onClick={() => increaseQty(item)}
                                className="px-3 py-1 bg-gray-200 rounded"
                            >
                                +
                            </button>
                        </div>

                        {/* TOTAL */}
                        <div className="text-right">
                            <p className="font-semibold">
                                ${item.total.toFixed(2)}
                            </p>

                            <button
                                onClick={() => removeItem(item.productId)}
                                className="text-red-500 text-sm hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* CART TOTAL */}
            <div className="mt-6 flex justify-between border-t pt-4">
                <h3 className="text-xl font-bold">Total</h3>
                <h3 className="text-xl font-bold text-green-600">
                    ${totalAmount.toFixed(2)}
                </h3>
            </div>

            {/* CHECKOUT */}
            <div className="mt-6 text-right">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};