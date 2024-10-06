// File: src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitIdea from './pages/SubmitIdea';
import IdeaDetails from './pages/IdeaDetails';
import PersonalIdeas from './pages/PersonalIdeas';
import Reports from './pages/Reports';
import AppPage from './pages/AppPage';
import HowItWorks from './pages/HowItWorks'; // Import HowItWorks page
import SampleReport from './pages/SampleReport'; // Import the Sample Report component
import Navbar from './components/Navbar'; // Import Navbar component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Render Navbar at the top of all pages */}
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/app" element={<AppPage />} />
      <Route path="/submit-idea" element={<SubmitIdea />} />
      <Route path="/idea/:id" element={<IdeaDetails />} />
      <Route path="/my-ideas" element={<PersonalIdeas />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/sample-report" element={<SampleReport />} /> {/* Add this route */}
    </Routes>
  );
}

export default App;
