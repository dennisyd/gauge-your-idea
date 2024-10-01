// File: src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitIdea from './pages/SubmitIdea';
import IdeaDetails from './pages/IdeaDetails';
import Reports from './pages/Reports'; // Import the Reports component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/submit-idea" element={<SubmitIdea />} />
            <Route path="/idea/:id" element={<IdeaDetails />} />
            <Route path="/reports" element={<Reports />} /> {/* Add this line */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;