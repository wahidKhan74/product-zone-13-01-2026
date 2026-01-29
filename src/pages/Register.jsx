import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';

export default function Register() {

    const [user, setUser] = useState({
        email: "", password: "", role: "user",  cnfPassword: ""
    });

    const RegisterForm = useFormik({
        initialValues: {
            email: '',
            password: '',
            cnfPassword: '',
            role: 'user'
        },
        onSubmit: values => {
            console.log('Form data', values);
        },
        validationSchema : Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            cnfPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
            role: Yup.string().required('Role is required'),
        }),
    })

    return (
     <div className="mt-30 p-6 shadow mt-6 text-gray-800 bg-white 
     rounded text-center w-96 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

            <form onSubmit={RegisterForm.handleSubmit} className="space-y-4">
                <input
                    type="email" id="email" name="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    onChange={RegisterForm.handleChange}
                     onBlur={RegisterForm.handleBlur}
                     value={RegisterForm.values.email}
                />
                 {RegisterForm.touched.email && RegisterForm.errors.email && (
                    <p className="text-red-500 text-xs text-left">
                        {RegisterForm.errors.email}
                    </p>
                )}
                <input
                    type="password" id="password" name="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                     onChange={RegisterForm.handleChange}
                      onBlur={RegisterForm.handleBlur}
                      value={RegisterForm.values.password}
                />
                {RegisterForm.touched.password && RegisterForm.errors.password && (
                    <p className="text-red-500 text-xs text-left">
                        {RegisterForm.errors.password}
                    </p>
                )}
                <input
                    type="password" id="cnfPassword" name="cnfPassword"
                    placeholder="Confirm Password"
                    className="w-full border p-2 rounded"
                     onChange={RegisterForm.handleChange}
                      onBlur={RegisterForm.handleBlur}
                      value={RegisterForm.values.cnfPassword}
                />
                 {RegisterForm.touched.cnfPassword && RegisterForm.errors.cnfPassword && (
                    <p className="text-red-500 text-xs text-left">
                        {RegisterForm.errors.cnfPassword}
                    </p>
                )}
                <input
                    type="role" id="role" name="role"
                    placeholder="Role"
                    className="w-full border p-2 rounded"
                    onChange={RegisterForm.handleChange}
                     onBlur={RegisterForm.handleBlur}
                    value={RegisterForm.values.role}
                />
                  {RegisterForm.touched.role && RegisterForm.errors.role && (
                    <p className="text-red-500 text-xs text-left">
                        {RegisterForm.errors.role}
                    </p>
                )}

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