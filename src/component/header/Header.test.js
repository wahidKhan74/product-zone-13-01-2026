import Header from "./Header";
import { render, screen, fireEvent } from '@testing-library/react';

// mock the useLanguage hook
jest.mock("../context/LanguageContext", () => ({
    useLanguage: () => ({
        t: {
            description: "New update is live. Check it out! Your online store for everything"
        }
    })
}));

//describe is used to group related tests together
describe("Header Component", () => {
    // Add your test cases here
    test("should render Header component", () => {
        render(<Header />);
        const headerElement = screen.getByRole("banner");
        // Assertions start here
        expect(headerElement).toBeInTheDocument();
        expect(screen.getByText("New update is live. Check it out! Your online store for everything")).toBeInTheDocument();
    });

    test("should hide Header component on close button click", () => {
        render(<Header />);
        const closeButton = screen.getByRole("button", { name: "✕" });
        fireEvent.click(closeButton);
        expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    });

    test("should match snapshot", () => {
        const { asFragment } = render(<Header />);
        expect(asFragment()).toMatchSnapshot();
    });

    test("should have accessible close button", () => {
        render(<Header />);
        const closeButton = screen.getByRole("button", { name: "✕" });
        expect(closeButton).toBeInTheDocument();
    });
});