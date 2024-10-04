// File: src/pages/Register.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const agreementRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreementAccepted) {
      setError('You must agree to the terms and conditions to register.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        setError('Registration successful, but no token received. Please try logging in.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleScroll = () => {
    const element = agreementRef.current;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
      setScrolledToBottom(true);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">User Agreement</h2>
          <div
            ref={agreementRef}
            className="mb-4 p-4 border rounded overflow-y-scroll h-40 bg-gray-100"
            onScroll={handleScroll}
          >
            <p className="text-sm mb-2">
              By registering on "Gauge Your Idea Platform" and accessing its content, you agree to the following terms regarding intellectual property and idea ownership:
            </p>
            <ol className="list-decimal list-inside text-sm mb-4 space-y-2">
              <li>
                <strong>Confidentiality and Respect for Ideas:</strong> You acknowledge that the ideas shared on this platform by other users are the result of their creativity and hard work. You agree to treat all ideas shared on this platform as confidential and to act in good faith when accessing them. You agree not to copy, steal, poach, or otherwise use any ideas shared by other users for your own benefit or for the benefit of any third party without express written consent from the original idea owner.
              </li>
              <li>
                <strong>Non-Disclosure:</strong> You understand that all ideas posted on the platform are the intellectual property of their respective creators. You agree that you will not disclose any details of these ideas to anyone outside of the platform without permission from the idea owner. You agree to not use the ideas for personal, commercial, or competitive purposes unless you have obtained explicit authorization from the idea creator.
              </li>
              <li>
                <strong>Good Faith Participation:</strong> By using this platform, you agree to participate in the community in good faith, meaning you will provide honest and constructive feedback when appropriate, and you will not engage in any activity that undermines the community's trust. Any misuse of the information available on this platform, including attempting to exploit or monetize ideas without proper authorization, is strictly prohibited and will result in removal from the platform.
              </li>
              <li>
                <strong>Non-Compete:</strong> You agree that you will not develop, launch, or assist in developing or launching any product, service, or business that is based on or closely resembles the ideas you encounter on this platform unless you have direct permission from the idea owner.
              </li>
              <li>
                <strong>Legal Limitations:</strong> While this agreement is not legally binding in a court of law, it serves to foster trust and mutual respect within our community. We reserve the right to terminate access to any user found to be violating the spirit of this agreement.
              </li>
            </ol>
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              id="agreement"
              checked={agreementAccepted && scrolledToBottom}
              onChange={(e) => setAgreementAccepted(e.target.checked)}
              disabled={!scrolledToBottom}
            />
            <label htmlFor="agreement" className="ml-2 text-sm">
              I agree to the terms and conditions.
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={!agreementAccepted}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
