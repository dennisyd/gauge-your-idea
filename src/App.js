// File: src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitIdea from './pages/SubmitIdea';
import IdeaDetails from './pages/IdeaDetails';
import PersonalIdeas from './pages/PersonalIdeas';
import Reports from './pages/Reports';
import AppPage from './pages/AppPage';
import Navbar from './components/Navbar'; // Import Navbar component

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const location = useLocation();

  // List of routes where the top black navbar should not be visible
  const hideNavbarRoutes = ['/app', '/submit-idea', '/my-ideas', '/reports'];

  return (
    <>
      {/* Only show the Navbar if the current route is NOT in the hideNavbarRoutes list */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/submit-idea" element={<SubmitIdea />} />
        <Route path="/idea/:id" element={<IdeaDetails />} />
        <Route path="/my-ideas" element={<PersonalIdeas />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </>
  );
}

export default App;
