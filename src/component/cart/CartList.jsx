// cart list to display items in the cart
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../../redux/cartReducer";

export default function CartList() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

    return (
        <div className="mx-auto max-w-2xl px-5 py-8">
            <h2 className="text-xl font-bold mb-4 ml-6">Shopping Cart</h2>
            {items.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <ul className="space-y-3">
                    {items.map((item) => (
                        <li key={item.id} className="flex justify-between items-center border-b pb-2 mb-2 ">
                            <span className="mr-4">{item.name}</span>
                            <button
                                onClick={() => dispatch(removeItem(item))}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}