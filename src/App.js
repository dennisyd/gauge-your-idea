import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';  // Import the new HomePage
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitIdea from './pages/SubmitIdea';
import IdeaDetails from './pages/IdeaDetails';
import PersonalIdeas from './pages/PersonalIdeas';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/submit-idea" element={<SubmitIdea />} />
                    <Route path="/idea/:id" element={<IdeaDetails />} />
                    <Route path="/my-ideas" element={<PersonalIdeas />} />
                    <Route path="/reports" element={<Reports />} />
                  </Routes>
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;