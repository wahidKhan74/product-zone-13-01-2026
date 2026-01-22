import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthGuard({ children }) {
    const { isLoggedIn } = useAuth();

    // If the user is not logged in, redirect to the login page
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // If the user is logged in, render the child routes/components
    return children;
}
