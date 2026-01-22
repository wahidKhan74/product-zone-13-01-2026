import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleGuard({ allowedRoles, children }) {
    const { role } = useAuth();

    // If the user is not logged in, redirect to the login page
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // If the user is logged in, render the child routes/components
    return children;
}
