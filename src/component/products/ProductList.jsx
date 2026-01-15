import { Link } from "react-router-dom";

const products = [
  { id: 101, name: "Laptop" },
  { id: 102, name: "Headphones" },
  { id: 103, name: "Keyboard" },
];

export default function ProductList() {
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
        </div>
      ))}
    </div>
  );
}
