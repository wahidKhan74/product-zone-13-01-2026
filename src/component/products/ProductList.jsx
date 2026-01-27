import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteExistingProduct, fetchProducts } from "../../redux/productReducer";
import { addItemToCartThunk, updateCartItemQuantityThunk } from "../../redux/cartReducer";


export default function ProductList() {
  // Redux hooks
  const dispatch = useDispatch();
  // Get products and cart state from Redux store 
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product.items);
  const navigate = useNavigate();
  // Fetch products action on load
  useEffect(() => {
    // Fetch products when component mounts
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
      const existingItem = cart.items.find(
        item => item.productId === product.id
      );

      let updatedItems;

      if (existingItem) {
        // increment quantity
        updatedItems = cart.items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // add new item
        updatedItems = [
          ...cart.items,
          { productId: product.id, quantity: 1 }
        ];
      }

      dispatch(
        updateCartItemQuantityThunk({
          cartId: cart.id,
          items: updatedItems
        })
      );
    };

  return (
     <div className="mb-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        <i className="fas fa-boxes mr-3"></i>Product Catalog
      </h3>
       <div className="flex justify-end mb-2">
        <button
            onClick={() => navigate('/products/create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
          > <i className="fas fa-plus"></i>
            Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <i className="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 text-lg">No products available. Add your first product!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl">
              <Link to={`/products/${product.id}`}>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h4>
              </Link>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="text-blue-600 font-semibold mb-4">${product.price}</p>
              <div className="flex justify-between">
                <button onClick={() => navigate(`/products/update/${product.id}`)} className="text-blue-500 hover:underline">
                  <i className="fas fa-edit mr-1"></i>Edit
                </button>
                <button onClick={() => dispatch(deleteExistingProduct(product.id))} className="text-red-500 hover:underline">
                  <i className="fas fa-trash mr-1"></i>Delete
                </button>
              </div>
              <button onClick={() => handleAddToCart(product)} className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                  <i className="fas fa-cart-plus mr-2"></i>Add to Cart
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
