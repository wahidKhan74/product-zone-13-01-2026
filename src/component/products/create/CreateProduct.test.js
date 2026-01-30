// imports
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { createNewProduct } from "../../../redux/productReducer";
import CreateProduct from "./CreateProduct";
import * as reactRedux from "react-redux";

// mocks
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn()
}));

jest.mock("../../../redux/productReducer", () => ({
    createNewProduct: jest.fn(() => ({
        type: "products/createNewProduct",
    })),
}));

const renderComponent = () => render(
 <BrowserRouter>
    <CreateProduct />
 </BrowserRouter>
 );


describe('CreateProduct Component', () => {

    const mockDispatch = jest.fn();

     beforeEach(() => {
         jest.clearAllMocks();
        jest.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch);
       
    });


    test('should render CreateProduct component', () => {
        renderComponent();
        const headingElement = screen.getByRole("heading", {
            name: /create product/i,
        });
        expect(headingElement).toBeInTheDocument();

    });

    test('should render basic form fields', () => {
        renderComponent();
        expect(screen.getByPlaceholderText("Apple Mini Smart Watch")).toBeInTheDocument();
        expect(screen.getByText("Select Brand")).toBeInTheDocument();
        expect(screen.getByText("Select Category")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("399.99")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("42")).toBeInTheDocument();
    });


     test("should allows user to add another highlight input", () => {
            renderComponent();

            const addButton = screen.getByText("+ Add another highlight");
            fireEvent.click(addButton);

            const highlights = screen.getAllByPlaceholderText(/highlight/i);
            expect(highlights.length).toBe(2);
    });

      test("should enables sub-category only after category is selected", () => {
            renderComponent();

            const subCategory = screen.getByLabelText(/sub category/i);
            expect(subCategory).toBeDisabled();

            const categorySelect = screen.getByRole("combobox", {
                name: /^category$/i,
            });

            fireEvent.change(categorySelect, {
                target: { value: "Electronics" },
            });
            expect(subCategory).toBeEnabled();
    });


    test("should shows correct discounted price", () => {
        renderComponent();

        fireEvent.change(screen.getByPlaceholderText("399.99"), {
            target: { value: "1000" },
        });

        fireEvent.change(screen.getByPlaceholderText("8"), {
            target: { value: "10" },
        });

        expect(screen.getByText("$900.00")).toBeInTheDocument();
    });

    test("should dispatch createNewProduct action on form submission", () => {
        renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Apple Mini Smart Watch"), {
        target: { value: "Apple Watch SE" },
    });

    fireEvent.change(screen.getByLabelText(/brand/i), {
      target: { value: "Apple" },
    });

     const categorySelect = screen.getByRole("combobox", {
                name: /^category$/i,
    });

            fireEvent.change(categorySelect, {
                target: { value: "Electronics" },
            });

    fireEvent.change(screen.getByLabelText(/sub category/i), {
      target: { value: "Accessories" },
    });

    fireEvent.change(screen.getByPlaceholderText("399.99"), {
      target: { value: "500" },
    });

    fireEvent.change(screen.getByPlaceholderText("42"), {
      target: { value: "10" },
    });

    fireEvent.change(
      screen.getByPlaceholderText(/compact smartwatch/i),
      {
        target: { value: "Best Apple smartwatch" },
      });

      fireEvent.click(screen.getByRole("button", { name: /create product/i }));

    expect(createNewProduct).toHaveBeenCalledTimes(1);
     expect(mockNavigate).toHaveBeenCalledWith("/products");

    });
});