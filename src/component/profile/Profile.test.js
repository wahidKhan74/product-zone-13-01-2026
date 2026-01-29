import { render, screen, fireEvent } from '@testing-library/react';
import Profile from './Profile';

describe("Profile Component", () => {
    // Add your test cases here
    test("should render Profile component", () => {
        render(<Profile />);
        const profileElement = screen.getByText("User Profile page");
        // Assertions start here
        expect(profileElement).toBeInTheDocument();
        expect(screen.getByText("Only logged-in users should see this.")).toBeInTheDocument();
    });

    // test("should match snapshot", () => {
    //     const { asFragment } = render(<Profile />);
    //     expect(asFragment()).toMatchSnapshot();
    // });

});