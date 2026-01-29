import { render, screen, fireEvent } from '@testing-library/react';
import Footer from './Footer';

describe("Footer Component", () => {
    // Add your test cases here
    test("should render Footer component", () => {
        render(<Footer />);
        const footerElement = screen.getByRole("contentinfo");
        // Assertions start here
        expect(footerElement).toBeInTheDocument();
        expect(screen.getByText(`© ${new Date().getFullYear()} Product Zone. All rights reserved.`)).toBeInTheDocument();
    });

    test("should match snapshot", () => {
        const { asFragment } = render(<Footer />);
        expect(asFragment()).toMatchSnapshot();
    });

});


