import { NavLink, Outlet, useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();

  const tabClass = ({ isActive }) =>
    isActive
      ? "bg-blue-600 text-white px-4 py-2 rounded"
      : "bg-gray-200 px-4 py-2 rounded hover:bg-gray-300";

  return (
    <div className="border rounded p-6 shadow">
      <h2 className="text-xl font-bold mb-2">
        Product ID: {id}
      </h2>

      {/* Sub navigation */}
      <div className="flex gap-4 my-4">
        <NavLink to="reviews" className={tabClass}>
          Reviews
        </NavLink>
        <NavLink to="specs" className={tabClass}>
          Specs
        </NavLink>
      </div>

      {/* Nested product content (reviews or specs) */}
      <Outlet />
    </div>
  );
}
