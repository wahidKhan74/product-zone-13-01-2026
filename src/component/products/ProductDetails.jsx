import { NavLink, Outlet, useParams } from "react-router-dom";
import { fetchProductById } from "../../redux/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function ProductDetails() {
    // Redux hooks
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => 
    state.product.items.find((item) => item.id === id)
  );

  // Fetch products action on load
  useEffect(() => {
    // Fetch products when component mounts
    dispatch(fetchProductById(id));
  }, [dispatch]);




  return (
    <div className="max-w-5xl mx-auto px-4 mb-12">
  {/* Page Title */}
  <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center flex items-center justify-center gap-3">
    <i className="fas fa-box-open text-blue-600"></i>
    Product Details
  </h3>

  {product && (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

      {/* Header */}
      <div className="px-6 py-5 bg-gray-50 border-b">
        <h4 className="text-2xl font-semibold text-gray-800">
          {product.name}
        </h4>
        <p className="text-sm text-gray-500 mt-1">
          {product.brand} • {product.category}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-yellow-500">
            <i className="fas fa-star"></i>
          </span>
          <span className="font-medium text-gray-700">
            {product.rating}
          </span>
          <span className="text-sm text-gray-500">
            ({product.reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Description & Highlights */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h5 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              Description
            </h5>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              Highlights
            </h5>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {product.highlights?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <h5 className="text-sm font-semibold text-gray-500 uppercase mb-3">
              Specifications
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {Object.entries(product.specifications || {}).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between bg-gray-50 px-3 py-2 rounded-md"
                  >
                    <span className="text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span className="font-medium text-gray-800">
                      {Array.isArray(value) ? value.join(", ") : value}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right: Price & Meta */}
        <div className="space-y-5">

          {/* Price Card */}
          <div className="border rounded-xl p-5 bg-gray-50">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-blue-600">
                ${product.discountedPrice ?? product.price}
              </span>

              {product.discountPercentage && (
                <span className="text-sm line-through text-gray-400">
                  ${product.price}
                </span>
              )}
            </div>

            {product.discountPercentage && (
              <p className="text-green-600 text-sm mt-1">
                {product.discountPercentage}% OFF
              </p>
            )}

            <p
              className={`mt-3 font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0
                ? `${product.stock} in stock`
                : "Out of stock"}
            </p>
          </div>

          {/* Seller & Delivery */}
          <div className="border rounded-xl p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Seller</span>
              <span className="font-medium text-gray-800">
                {product.seller?.name}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Warranty</span>
              <span className="text-gray-700">{product.warranty}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery</span>
              <span className="text-gray-700">
                {product.deliveryEstimate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
        <NavLink
          to={`/edit-product/${product.id}`}
          className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
        >
          <i className="fas fa-edit"></i>
          Edit Product
        </NavLink>

        <NavLink
          to="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <i className="fas fa-arrow-left"></i>
          Back to Products
        </NavLink>
      </div>
    </div>
  )}
</div>

  );
}
