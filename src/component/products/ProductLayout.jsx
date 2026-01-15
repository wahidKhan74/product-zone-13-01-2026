import { NavLink, Outlet } from "react-router-dom";

export default function ProductsLayout() {

    const tabClass = ({isActive}) => isActive
      ? "border-b-2 border-blue-600 text-blue-600 pb-1"
      : "text-gray-600 hover:text-blue-500";

      return (
        <div className="p-6 shadow mt-6 text-gray-800 bg-white rounded text-center">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            {/* product main navigation  */}
            <nav className="flex gap-6 mb-6">
                <NavLink to="/products" end className={tabClass}>
                    All Products
                </NavLink>
            </nav>

            {/* chils routes render here (product list) */}
            <Outlet />

        </div>
      )
}