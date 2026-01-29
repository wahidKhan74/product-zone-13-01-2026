import { render, screen, fireEvent } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';

describe("AdminDashboard Component", () => {
    // Add your test cases here
    test("should render AdminDashboard component", () => {
        render(<AdminDashboard />);
        const adminDashboardElement = screen.getByText("Admin Dashboard page");
        // Assertions start here
        expect(adminDashboardElement).toBeInTheDocument();
        expect(screen.getByText("Only logged-in users should see this.")).toBeInTheDocument();
    });

    // test("should match snapshot", () => {
    //     const { asFragment } = render(<AdminDashboard />);
    //     expect(asFragment()).toMatchSnapshot();
    // });

    test("should have correct heading level", () => {
        render(<AdminDashboard />);
        const headingElement = screen.getByRole("heading", { level: 1 });
        expect(headingElement).toBeInTheDocument();
        expect(headingElement).toHaveTextContent("Admin Dashboard page");
    });
});