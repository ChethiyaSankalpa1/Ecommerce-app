import React, { useState } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const isLogin = currentState === 'Login';

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`${currentState} submitted`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6 border"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <div className="flex justify-end text-sm text-gray-500">
          <span className="hover:underline cursor-pointer">Forgot password?</span>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-base font-medium rounded-md transition"
        >
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>

        <div className="text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <span
                onClick={() => setCurrentState('Sign Up')}
                className="text-orange-500 hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already a member?{' '}
              <span
                onClick={() => setCurrentState('Login')}
                className="text-orange-500 hover:underline cursor-pointer"
              >
                Login
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
