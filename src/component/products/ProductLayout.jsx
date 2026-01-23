import { NavLink, Outlet } from "react-router-dom";

export default function ProductsLayout() {

    const tabClass = ({isActive}) => isActive
      ? "border-b-2 border-blue-600 text-blue-600 pb-1"
      : "text-gray-600 hover:text-blue-500";

      return (
        <div className="p-6 shadow mt-6 text-gray-800 bg-white rounded">
            {/* chils routes render here (product list) */}
            <Outlet />

        </div>
      )
}