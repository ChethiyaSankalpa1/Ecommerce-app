import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token); // store token
        toast.success("Login successful! Welcome Admin 🎉");

        // ⏳ Delay to let toast show before redirect or setToken call
        setTimeout(() => {
          setToken(token);
        }, 1000);
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6 text-center">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
