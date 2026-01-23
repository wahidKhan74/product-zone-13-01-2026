import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../redux/productReducer";
import { useDispatch } from "react-redux";

// product creation related constants and component
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

export default function CreateProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        name: "",
        brand: "",
        category: "",
        subCategory: "",
        price: "",
        discountPercentage: "",
        stock: "",
        description: "",
        highlights: [""],
        specifications: {},
        warranty: "",
        deliveryEstimate: "",
        tags: [],
    });
    const [errors, setErrors] = useState({});

    // handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // handle highlights change
    const handleHighlightChange = (index, value) => {
        const updated = [...product.highlights];
        updated[index] = value;
        setProduct({ ...product, highlights: updated });
    };
    const addHighlight = () => setProduct({ ...product, highlights: [...product.highlights, ""] });

    // handle specifications change
    const handleSpecChange = (key, value) => {
        setProduct({
            ...product,
            specifications: { ...product.specifications, [key]: value },
        });
    };

    // calculate discounted price
    const discountedPrice = product.price && product.discountPercentage
        ? (
            product.price -
            (product.price * product.discountPercentage) / 100
        ).toFixed(2)
        : product.price;

    // form submission handler
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
            rating: 0,
            reviewCount: 0,
            createdAt: new Date().toISOString(),
        };

        // call API to create product (to be implemented)
        dispatch(createNewProduct(payload));

        console.log("CREATE PRODUCT PAYLOAD", payload);
        navigate("/products");
    };
    const inputClass = "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none";

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                Create Product
            </h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10 space-y-10"
            >

                {/* BASIC INFO */}
                <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Basic Information
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                        Core details used to identify the product
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium mb-1">Product Name</label>
                            <input
                                name="name"
                                placeholder="Apple Mini Smart Watch"
                                className={inputClass}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Brand</label>
                            <select
                                name="brand"
                                className={inputClass}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Brand</option>
                                {BRANDS.map((b) => (
                                    <option key={b}>{b}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select
                                name="category"
                                className={inputClass}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                {Object.keys(CATEGORIES).map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Sub Category</label>
                            <select
                                name="subCategory"
                                className={inputClass}
                                disabled={!product.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Sub-Category</option>
                                {CATEGORIES[product.category]?.map((s) => (
                                    <option key={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                {/* PRICING */}
                <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Pricing & Stock
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                        Control product pricing and availability
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Price ($)</label>
                            <input
                                name="price"
                                type="number"
                                placeholder="399.99"
                                className={inputClass}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Discount (%)
                            </label>
                            <input
                                name="discountPercentage"
                                type="number"
                                placeholder="8"
                                className={inputClass}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Stock Quantity
                            </label>
                            <input
                                name="stock"
                                type="number"
                                placeholder="42"
                                className={inputClass}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-3">
                        <span className="text-sm text-gray-500">
                            Discounted Price:
                        </span>{" "}
                        <span className="text-green-600 font-semibold text-lg">
                            ${discountedPrice || 0}
                        </span>
                    </div>
                </section>

                {/* DESCRIPTION */}
                <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Description & Highlights
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                        Shown on the product details page
                    </p>

                    <label className="block text-sm font-medium mb-1">
                        Product Description
                    </label>
                    <textarea
                        name="description"
                        rows="4"
                        placeholder="Compact smartwatch with advanced health tracking..."
                        className={inputClass}
                        onChange={handleChange}
                        required
                    />

                    <div className="mt-5 space-y-3">
                        <label className="block text-sm font-medium">
                            Key Highlights
                        </label>

                        {product.highlights.map((h, i) => (
                            <input
                                key={i}
                                placeholder={`Highlight ${i + 1}`}
                                className={inputClass}
                                value={h}
                                onChange={(e) =>
                                    handleHighlightChange(i, e.target.value)
                                }
                            />
                        ))}

                        <button
                            type="button"
                            onClick={addHighlight}
                            className="text-blue-600 text-sm font-medium hover:underline"
                        >
                            + Add another highlight
                        </button>
                    </div>
                </section>

                {/* SPECIFICATIONS */}
                <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Specifications
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                        Technical details for comparison
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {["processor", "ram", "storage", "battery", "os"].map((spec) => (
                            <input
                                key={spec}
                                placeholder={spec.toUpperCase()}
                                className={inputClass}
                                onChange={(e) =>
                                    handleSpecChange(spec, e.target.value)
                                }
                            />
                        ))}
                    </div>
                </section>

                {/* LOGISTICS */}
                <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Logistics & Warranty
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                        Shipping and post-purchase information
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            name="warranty"
                            placeholder="1 Year Apple Warranty"
                            className={inputClass}
                            onChange={handleChange}
                        />

                        <select
                            name="deliveryEstimate"
                            className={inputClass}
                            onChange={handleChange}
                        >
                            <option value="">Delivery Estimate</option>
                            {DELIVERY_OPTIONS.map((d) => (
                                <option key={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                </section>

                {/* ACTIONS */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="px-6 py-2.5 rounded-lg border text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-8 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                    >
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
}