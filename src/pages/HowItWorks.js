import React from 'react';

function HowItWorks() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12">How It Works</h1>

        {/* Step-by-Step Guide */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Step 1: Register or Log In */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Step 1: Register or Log In</h2>
            <p className="text-lg">
              To get started, simply register a new account or log in if you already have an account. You need to be logged in to use all features of Gauge Your Idea, including submitting ideas and voting on others' ideas.
            </p>
          </div>

          {/* Step 2: Submit a New Idea */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Step 2: Submit a New Idea</h2>
            <p className="text-lg">
              Once logged in, you can submit a new idea. Provide a brief title and description, and indicate the target audience and the industry your idea falls into. This will help others understand and provide valuable feedback on your idea.
            </p>
          </div>

          {/* Step 3: Vote on Existing Ideas */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Step 3: Vote on Existing Ideas</h2>
            <p className="text-lg">
              You can also participate by voting on other users' ideas. Each vote helps idea creators understand how the community perceives their concept. You can rate the idea, provide feedback, and indicate your level of interest in the idea.
            </p>
          </div>

          {/* Step 4: Receive Feedback */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Step 4: Receive Feedback</h2>
            <p className="text-lg">
              After submitting an idea, you will receive feedback and votes from the community. Use these insights to improve and refine your idea based on the community's input and professional analysis.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-xl mb-8">Ready to validate your idea? Get started today and bring your vision to life!</p>
          <a href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-700">
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
