import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold">Gauge Your Idea</div>
        <nav className="hidden md:flex space-x-4">
          <Link to="/how-it-works" className="hover:text-blue-600">How It Works</Link>
          <Link to="/sample-report" className="hover:text-blue-600">Sample Report</Link>
        </nav>
        <Link to="/register" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">Get started</Link>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Validate your ideas with real feedback</h1>
        <p className="text-xl mb-8">Your all-in-one platform for idea validation, expert insights, and market potential analysis</p>
        <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-700">Try Gauge Your Idea now</Link>
        
        <div className="mt-16 text-gray-600">Trusted by 10,000+ innovators and entrepreneurs</div>

        {/* Placeholder for logos */}
        <div className="mt-8 flex justify-center space-x-8">
          <div className="w-16 h-8 bg-gray-300 rounded"></div>
          <div className="w-16 h-8 bg-gray-300 rounded"></div>
          <div className="w-16 h-8 bg-gray-300 rounded"></div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">Expert Feedback</h3>
              <p>Get insights from industry professionals</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Market Analysis</h3>
              <p>Understand your idea's market potential</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-2">Idea Refinement</h3>
              <p>Refine and improve your concept</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
