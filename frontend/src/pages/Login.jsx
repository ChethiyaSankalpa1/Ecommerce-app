import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as jwt_decode from 'jwt-decode';


const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { setToken, navigate, backendUrl } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Handle input changes
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Login function
  const login = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        toast.success('Login successful');
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);

        setTimeout(() => {
          navigate('/');
        }, 700);
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  // Signup function
  const signup = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, formData);

      if (response.data.success) {
        toast.success('Account created successfully');
        setCurrentState('Login');
        setFormData({ name: '', email: '', password: '' });
      } else {
        toast.error(response.data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Signup failed. Please try again.');
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentState === 'Login') {
      login();
    } else {
      signup();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="w-[400px] bg-white p-8 rounded-xl shadow-lg border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-orange-600">
          {currentState}
        </h2>

        {currentState === 'Sign Up' && (
          <input
            name="name"
            onChange={changeHandler}
            value={formData.name}
            type="text"
            placeholder="Your name"
            className="w-full mb-5 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
            required
          />
        )}

        <input
          name="email"
          onChange={changeHandler}
          value={formData.email}
          type="email"
          placeholder="Your email"
          className="w-full mb-5 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
          required
        />

        <input
          name="password"
          onChange={changeHandler}
          value={formData.password}
          type="password"
          placeholder="Your password"
          className="w-full mb-2 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
          required
        />

        {currentState === 'Login' && (
          <p
            onClick={() => toast.info('Forgot password flow coming soon!')}
            className="text-sm text-right text-orange-500 cursor-pointer mb-5 hover:underline select-none"
          >
            Forgot password?
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-lg font-semibold shadow-md hover:from-orange-500 hover:to-orange-600 transition"
        >
          {currentState === 'Login' ? 'Login' : 'Sign Up'}
        </button>

        <p
          onClick={() => {
            setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login');
            setFormData({ name: '', email: '', password: '' });
          }}
          className="mt-6 text-center text-sm text-orange-500 cursor-pointer hover:underline select-none"
        >
          {currentState === 'Login'
            ? 'Create new account'
            : 'Already have an account? Login'}
        </p>
      </form>
    </div>
  );
};

export default Login;
