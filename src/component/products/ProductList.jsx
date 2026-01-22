import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../../redux/cartReducer";

const products = [
  { id: 101, name: "Laptop" },
  { id: 102, name: "Headphones" },
  { id: 103, name: "Keyboard" },
];

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="border p-4 rounded shadow hover:shadow-lg"
        >
          <h2 className="font-semibold text-lg mb-2">{p.name}</h2>

          <Link
            to={`${p.id}`}
            className="text-blue-600 hover:underline"
          >
            View Details →
          </Link>
          <button onClick={() => dispatch(addItem(p))} 
            className="mt-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
