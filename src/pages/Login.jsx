import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/auth/AuthContext";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // fake auth logic
    const isSuccess = true;
    login();

    if (isSuccess) {
      localStorage.setItem("isLoggedIn", "true");

      // programmatic routing
      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid credentials");
    }
  };

    return (
        <div className="mt-30 p-6 shadow mt-6 text-gray-800 bg-white rounded text-center w-96 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>

            <p>
                Don't have an account? 
                <button onClick={()=> navigate("/register")} className="text-blue-600 hover:underline">
                    Register here
                </button>
            </p>
        </div>
    );
}