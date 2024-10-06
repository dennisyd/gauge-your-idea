import React from 'react';

function SampleReport() {
    return (
        <div className="max-w-5xl mx-auto p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Sample Idea Report</h1>

            {/* Idea Details */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-3xl font-semibold mb-4">Title: "SkillBridge: Connecting Students to Real-World Projects"</h2>
                <p className="text-lg mb-4">
                    <strong>Description:</strong> SkillBridge is a platform designed to connect students with real-world projects from local businesses, non-profits, and startups. The idea is to create a space where students can apply their academic learning to practical projects while gaining valuable experience. Companies can post projects that align with student skill sets, providing them with the opportunity to work on real challenges while receiving guidance from industry professionals. The platform aims to make experiential learning a standard part of education, enhancing student employability while helping businesses solve real problems with a fresh perspective.
                </p>
                <p className="text-lg">
                    <strong>Industry:</strong> Education
                </p>
            </div>

            {/* Voting Statistics */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-3xl font-bold mb-4">Voting Statistics</h2>
                <p className="text-lg mb-4">
                    <strong>Overall Average Score:</strong> 8.24
                </p>
                <h3 className="text-2xl font-semibold mb-2">Average Score by Voter Type:</h3>
                <ul className="list-disc pl-5">
                    <li className="text-lg ">General Enthusiast: 8.25</li>
                    <li className="text-lg">Industry Expert: 7.75</li>
                    <li className="text-lg">Experienced Entrepreneur: 7.13</li>
                    <li className="text-lg">Potential Customer/User: 8.75</li>
                </ul>
                <h3 className="text-2xl font-semibold mt-6 mb-2">Votes by Voter Type:</h3>
                <ul className="list-disc pl-5">
                    <li className="text-lg">General Enthusiast: 22</li>
                    <li className="text-lg">Industry Expert: 6</li>
                    <li className="text-lg">Experienced Entrepreneur: 12</li>
                    <li className="text-lg">Potential Customer/User: 31</li>
                </ul>
            </div>

            {/* Comments Analysis */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-3xl font-bold mb-4">Comments Analysis</h2>
                <h3 className="text-2xl font-semibold mb-2">Summary:</h3>
                <p className="text-lg mb-4">
                    The majority of voters believe that SkillBridge is a valuable and timely idea for bridging the gap between theoretical learning and practical application. Many are excited about the potential for students to gain real-world experience while helping businesses address their challenges. The overall sentiment is positive, with many respondents highlighting the win-win nature of the platform.
                </p>
                <h3 className="text-2xl font-semibold mb-2">Overall Sentiment:</h3>
                <p className="text-lg mb-4">Positive</p>
            </div>

            {/* Individual Comments (Sample) */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-4">Individual Comments</h2>
                <ul className="space-y-4">
                    <li>
                        <strong>Michael Ford (General Enthusiast):</strong> "This platform is a fantastic way for students to gain experience beyond the classroom. It's exactly what education needs!"
                    </li>
                    <li>
                        <strong>Josh Anderson (Industry Expert):</strong> "Bridging the gap between theoretical learning and real-world application is crucial. SkillBridge seems like an effective way to make that happen."
                    </li>
                    <li>
                        <strong>Michael Musconi (Experienced Entrepreneur):</strong> "I would have loved something like this in my student days. Great idea, and very timely given the current emphasis on skills-based learning."
                    </li>
                    <li>
                        <strong>Susan Bowler (Potential Customer/User):</strong> "This could be an amazing opportunity for smaller businesses that need fresh ideas but can't afford full-time interns."
                    </li>
                    <li>
                        <strong>Lacey Rankin (General Enthusiast):</strong> "Students will gain so much confidence from working on real-world projects. I think SkillBridge has the potential to revolutionize the way we view education."
                    </li>
                    <li>
                        <strong>Robert Green (General Enthusiast):</strong> "I love the idea of students being able to take on projects and solve real problems. It gives them exposure to the workplace at an early stage."
                    </li>
                    <li>
                        <strong>Xavier Marshall (General Enthusiast):</strong> "This platform is a fantastic way for students to gain experience beyond the classroom. It's exactly what education needs!"
                    </li>
                    <li>
                        <strong>Becky Davis (Industry Expert):</strong> "Bridging the gap between theoretical learning and real-world application is crucial. SkillBridge seems like an effective way to make that happen."
                    </li>
                    <li>
                        <strong>Michael Johnson (Experienced Entrepreneur):</strong> "I would have loved something like this in my student days. Great idea, and very timely given the current emphasis on skills-based learning."
                    </li>
                    <li>
                        <strong>Susan Brown (Potential Customer/User):</strong> "This could be an amazing opportunity for smaller businesses that need fresh ideas but can't afford full-time interns."
                    </li>
                    <li>
                        <strong>Sylvia Zachary (General Enthusiast):</strong> "Students will gain so much confidence from working on real-world projects. I think SkillBridge has the potential to revolutionize the way we view education."
                    </li>
                    <li>
                        <strong>Robert Green (General Enthusiast):</strong> "I love the idea of students being able to take on projects and solve real problems. It gives them exposure to the workplace at an early stage."
                    </li>
                    <li>
                        <strong>Emma Jackson (General Enthusiast):</strong> "This is exactly the type of innovation we need in education! Giving students the chance to work on real projects while still in school is such a great idea."
                    </li>
                    <li>
                        <strong>Liam Wilson (Industry Expert):</strong> "Companies need fresh perspectives, and students need experience. SkillBridge seems to effectively address both of these needs in a practical manner."
                    </li>
                    <li>
                        <strong>Ava Martinez (Potential Customer/User):</strong> "This is a win-win for both students and businesses. Students get experience, and companies get new ideas from talented individuals."
                    </li>
                    <li>
                        <strong>Noah Thompson (Experienced Entrepreneur):</strong> "The biggest challenge for students is finding ways to prove their skills. SkillBridge provides that proof by offering real project experience."
                    </li>
                    <li>
                        <strong>Olivia Garcia (General Enthusiast):</strong> "I'm really excited to see this become mainstream. Students can gain practical skills, and employers benefit from creative problem-solving."
                    </li>
                    <li>
                        <strong>William Davis (Industry Expert):</strong> "The experiential learning component is invaluable. SkillBridge not only helps students but also fills the skills gap that businesses often face."
                    </li>
                    <li>
                        <strong>Sophia Walker (Potential Customer/User):</strong> "This could be a fantastic way for small startups like mine to get help without having to hire full-time interns. I’d definitely use this."
                    </li>
                    <li>
                        <strong>James Clark (General Enthusiast):</strong> "SkillBridge is a great solution for students who want more than just theory. It's about time education evolved in this direction."
                    </li>
                    <li>
                        <strong>Isabella Lewis (Industry Expert):</strong> "I think this is an excellent way to integrate students into the workforce early. Companies will benefit from fresh ideas and creative thinking."
                    </li>
                    <li>
                        <strong>Benjamin Scott (Experienced Entrepreneur):</strong> "When I started my company, finding talent was difficult. SkillBridge could make that easier by connecting startups with talented students."
                    </li>
                    <li>
                        <strong>Mia Adams (General Enthusiast):</strong> "The best part about SkillBridge is that it aligns student learning with practical applications. This will make education more engaging and relevant."
                    </li>
                    <li>
                        <strong>Lucas Miller (Potential Customer/User):</strong> "We have a few projects that could benefit from some outside-the-box thinking. I think SkillBridge is the perfect place to find students willing to take on a challenge."
                    </li>
                    <li>
                        <strong>Amelia Hernandez (Industry Expert):</strong> "What I like most about SkillBridge is that it's practical. It’s addressing a real need both in education and in business, and that's what makes it impactful."
                    </li>
                    <li>
                        <strong>Elijah Rivera (Experienced Entrepreneur):</strong> "Students with hands-on experience are more employable, and SkillBridge gives them the exposure they need before graduating. This is an excellent idea."
                    </li>
                    <li>
                        <strong>Charlotte Baker (General Enthusiast):</strong> "I believe this will help students become more confident in their skills and ready to face the workforce. Real projects are much better than case studies!"
                    </li>
                    <li>
                        <strong>Henry Perez (Potential Customer/User):</strong> "As a small business owner, I'd love to have students bring fresh perspectives to our projects. This idea is a game-changer for education and businesses alike."
                    </li>
                    <li>
                        <strong>Grace Murphy (Industry Expert):</strong> "It’s fantastic that SkillBridge encourages partnerships between students and businesses. This type of experience is what employers value the most."
                    </li>
                    <li>
                        <strong>Alexander Cook (Experienced Entrepreneur):</strong> "The platform makes it easy for students to find relevant experience, which is so valuable. It's a great idea that fills a huge gap in the education system."
                    </li>
                    <li>
                        <strong>Victoria Martinez (General Enthusiast):</strong> "I think SkillBridge will be instrumental in preparing students for the real world. It’s an initiative that should be supported in every educational institution."
                    </li>
                    {/* Additional comments go here, repeating the format to match the number of voters */}
                </ul>
            </div>
        </div>
    );
}

export default SampleReport;
