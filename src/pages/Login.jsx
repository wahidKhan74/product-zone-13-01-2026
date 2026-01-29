import { useNavigate } from "react-router-dom";
import { useFormik} from 'formik';
import * as Yup from 'yup';
import { loginUser } from "../api/auth";
import { useAuth } from "../component/context/AuthContext";

export default function Login() {

    const navigate = useNavigate();
    const {login} = useAuth();
    // React Form hook for managing form state and validation
    const LoginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
        }),
        onSubmit: values => {
            // Handle form submission
            console.log('Form data', values);
            loginUser(values)
                .then(data => {
                    console.log('Login successful:', data);
                    login(data[0]);  // Update auth context with logged-in user data
                    // Redirect to dashboard or home page after successful login
                    navigate("/dashboard");
                })
                .catch(error => {
                    console.error('Login error:', error.message);
                    alert('Login failed. Please check your credentials and try again.');
                });
        }
    });

    return (
        <div className="mt-30 p-6 shadow mt-6 text-gray-800 bg-white rounded text-center w-96 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={LoginForm.handleSubmit} className="space-y-4">
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    className="w-full border p-2 rounded"
                    onChange={LoginForm.handleChange}
                    onBlur={LoginForm.handleBlur}
                    value={LoginForm.values.email}
                />
                {LoginForm.touched.email && LoginForm.errors.email && (
                    <p className="text-red-500 text-xs text-left">
                        {LoginForm.errors.email}
                    </p>
                )}
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    className="w-full border p-2 rounded"
                     onChange={LoginForm.handleChange}
                    onBlur={LoginForm.handleBlur}
                    value={LoginForm.values.password}
                    required
                />
                {LoginForm.touched.password && LoginForm.errors.password && (
                    <p className="text-red-500 text-xs text-left">
                        {LoginForm.errors.password}
                    </p>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>

            <p>
                Don't have an account?
                <button onClick={() => navigate("/register")} className="text-blue-600 hover:underline">
                    Register here
                </button>
            </p>
        </div>
    );
}