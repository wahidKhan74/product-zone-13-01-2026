import { useState } from "react";

export default function Register() {

    const [user, setUser] = useState({
        email: "", password: "", role: "user",  cnfPassword: ""
    });

    const [error, setError] = useState("");
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        
        // Registration logic here
    }

    return (
     <div className="mt-30 p-6 shadow mt-6 text-gray-800 bg-white 
     rounded text-center w-96 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    name="email"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                     onChange={handleChange}
                    name="password"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full border p-2 rounded"
                     onChange={handleChange}
                    name="cnfPassword"
                    required
                />
                <input
                    type="role"
                    placeholder="Role"
                    className="w-full border p-2 rounded"
                     onChange={handleChange}
                    name="role"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Register
                </button>
            </form>

            <p>
                You have an account?
                <button onClick={() => navigate("/login")} className="text-blue-600 hover:underline">
                    Login here
                </button>
            </p>
        </div>
    );
}