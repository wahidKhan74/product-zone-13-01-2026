import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import ProductList from "./ProductList";
import { fetchProducts } from "../../../redux/productReducer";


// Mocks
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock Redux actions
jest.mock("../../../redux/productReducer", () => ({
  fetchProducts: jest.fn(() => ({ type: "product/fetchProducts" })),
  deleteExistingProduct: jest.fn((id) => ({
    type: "product/delete",
    payload: id,
  })),
}));

jest.mock("../../../redux/cartReducer", () => ({
  updateCartItemQuantityThunk: jest.fn(() => jest.fn()),
}));

// dummy reducers
const productReducer = (state = { items: [] }, action) => state;
const cartReducer = (state = { id: "cart1", items: [] }, action) => state;

// Render helper
const renderWithProviders = (component, initialState = {}) => {
  const store = configureStore({
    reducer: {
      product: productReducer,
      cart: cartReducer,
    },
    preloadedState: initialState,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};


describe("ProductList Component", () => {

    const productsMock = [{
            id: 1,
            name: "iPhone 15",
            description: "Latest Apple phone",
            price: 999,
        },
    ];
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should dispatches fetchProducts on mount", () => {
        renderWithProviders(<ProductList />, {
            product: { items: [] },
            cart: { id: "cart1", items: [] },
        });

        expect(fetchProducts).toHaveBeenCalledTimes(1);
    });

    test("should shows empty state when no products exist", () => {
        renderWithProviders(<ProductList />, {
            product: { items: [] },
            cart: { id: "cart1", items: [] },
        });

        expect(
            screen.getByText(/no products available/i)
        ).toBeInTheDocument();
    });

    test("should renders product cards based on mock data", () => {
        renderWithProviders(<ProductList />,{
            product: { items: productsMock },
            cart: { id: "cart1", items: [] },
        });

        expect(screen.getByText("iPhone 15")).toBeInTheDocument();
        expect(screen.getByText("$999")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /add to cart/i })
        ).toBeInTheDocument();
    });
});
