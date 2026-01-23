import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedProduct, fetchProductById,  updateExistingProduct} from "../../redux/productReducer";

/* constants */
const BRANDS = ["TechNova", "Apple", "Samsung", "OnePlus"];
const CATEGORIES = {
  Electronics: ["Mobile Phones", "Laptops", "Accessories"],
  Appliances: ["Kitchen", "Home"],
};
const DELIVERY_OPTIONS = [
  "1-2 Business Days",
  "2-4 Business Days",
  "5-7 Business Days",
];

export default function UpdateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedProduct, loading } = useSelector((state) => ({
    selectedProduct: state.product.items.find((item) => item.id === id),
    loading: state.product.loading,
  }));

  const [product, setProduct] = useState(null);

  /* ---------- FETCH PRODUCT ---------- */
  useEffect(() => {
    dispatch(fetchProductById(id));
     return () => {
        dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  /* ---------- PREFILL FORM ---------- */
  useEffect(() => {
    if (selectedProduct) {
      setProduct({
        ...selectedProduct,
        highlights: selectedProduct.highlights || [""],
        specifications: selectedProduct.specifications || {},
      });
    }
  }, [selectedProduct]);

  /* ---------- HANDLERS ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleHighlightChange = (index, value) => {
    const updated = [...product.highlights];
    updated[index] = value;
    setProduct({ ...product, highlights: updated });
  };

  const addHighlight = () =>
    setProduct({ ...product, highlights: [...product.highlights, ""] });

  const handleSpecChange = (key, value) => {
    setProduct({
      ...product,
      specifications: { ...product.specifications, [key]: value },
    });
  };

  const discountedPrice =
    product?.price && product?.discountPercentage
      ? (
          product.price -
          (product.price * product.discountPercentage) / 100
        ).toFixed(2)
      : product?.price;

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...product,
      price: Number(product.price),
      discountPercentage: Number(product.discountPercentage),
      discountedPrice: Number(discountedPrice),
      stock: Number(product.stock),
      availabilityStatus:
        product.stock > 0 ? "In Stock" : "Out of Stock",
      updatedAt: new Date().toISOString(),
    };

    dispatch(updateExistingProduct( id, payload ));
    navigate("/products");
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none";

  if (loading || !product) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        Edit Product
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Product ID: <span className="font-mono">{id}</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10 space-y-10"
      >

        {/* BASIC INFO */}
        <section>
          <h3 className="text-lg font-semibold mb-6">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Product Name
              </label>
              <input
                name="name"
                value={product.name}
                className={inputClass}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <select
                name="brand"
                value={product.brand}
                className={inputClass}
                onChange={handleChange}
              >
                {BRANDS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={product.category}
                className={inputClass}
                onChange={handleChange}
              >
                {Object.keys(CATEGORIES).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Sub Category
              </label>
              <select
                name="subCategory"
                value={product.subCategory}
                className={inputClass}
                onChange={handleChange}
              >
                {CATEGORIES[product.category]?.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section>
          <h3 className="text-lg font-semibold mb-6">
            Pricing & Stock
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              name="price"
              type="number"
              value={product.price}
              className={inputClass}
              onChange={handleChange}
            />
            <input
              name="discountPercentage"
              type="number"
              value={product.discountPercentage}
              className={inputClass}
              onChange={handleChange}
            />
            <input
              name="stock"
              type="number"
              value={product.stock}
              className={inputClass}
              onChange={handleChange}
            />
          </div>

          <p className="mt-2 text-green-600 font-semibold">
            Discounted Price: ${discountedPrice}
          </p>
        </section>

        {/* DESCRIPTION */}
        <section>
          <h3 className="text-lg font-semibold mb-6">
            Description & Highlights
          </h3>

          <textarea
            name="description"
            rows="4"
            value={product.description}
            className={inputClass}
            onChange={handleChange}
          />

          <div className="mt-4 space-y-3">
            {product.highlights.map((h, i) => (
              <input
                key={i}
                value={h}
                className={inputClass}
                onChange={(e) =>
                  handleHighlightChange(i, e.target.value)
                }
              />
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="text-blue-600 text-sm font-medium"
            >
              + Add Highlight
            </button>
          </div>
        </section>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="px-6 py-2.5 rounded-lg border"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-2.5 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
