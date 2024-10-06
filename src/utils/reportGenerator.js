const PDFDocument = require('pdfkit');
const { summarizeComments, analyzeSentiment } = require('./textAnalysis');

function generateReport(idea) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const chunks = [];

    // Collect PDF data chunks
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Title
    doc.fontSize(18).text('Idea Report', { align: 'center' });
    doc.moveDown();

    // Idea Details
    doc.fontSize(14).text('Idea Details', { underline: true });
    doc.moveDown();

    // Handle missing fields safely
    const title = idea.title || 'N/A';
    const description = idea.description || 'N/A';
    const targetAudience = idea.targetAudience || 'N/A';
    const industry = idea.industry || 'N/A';

    doc.fontSize(12).text(`Title: ${title}`);
    doc.fontSize(10).text(`Description: ${description}`);
    doc.text(`Target Audience: ${targetAudience}`);
    doc.text(`Industry: ${industry}`);
    doc.moveDown();

    // Voting Statistics
    doc.fontSize(14).text('Voting Statistics', { underline: true });
    doc.moveDown();

    // Handle empty or missing votes array
    const votes = Array.isArray(idea.votes) ? idea.votes : [];
    const overallAverage = votes.length > 0
      ? votes.reduce((sum, vote) => sum + vote.score, 0) / votes.length
      : 0;
    doc.fontSize(12).text(`Overall Average Score: ${overallAverage.toFixed(2)}`);
    doc.moveDown();

    // Average Score by Voter Type
    const voterTypes = ['General Enthusiast', 'Industry Expert', 'Experienced Entrepreneur', 'Potential Customer/User'];
    doc.fontSize(12).text('Average Score by Voter Type:');
    voterTypes.forEach(type => {
      const typeVotes = votes.filter(vote => vote.voterType === type);
      const typeAverage = typeVotes.length > 0 ? typeVotes.reduce((sum, vote) => sum + vote.score, 0) / typeVotes.length : 0;
      doc.fontSize(10).text(`  ${type}: ${typeAverage.toFixed(2)}`);
    });
    doc.moveDown();

    // Votes by Voter Type
    doc.fontSize(12).text('Votes by Voter Type:');
    voterTypes.forEach(type => {
      const typeVotes = votes.filter(vote => vote.voterType === type);
      doc.fontSize(10).text(`  ${type}: ${typeVotes.length}`);
    });
    doc.moveDown();

    // Comments Analysis
    const comments = votes
      .filter(vote => vote.comment && vote.comment.trim() !== '')
      .map(vote => vote.comment);

    doc.fontSize(14).text('Comments Analysis', { underline: true });
    doc.moveDown();

    // Summary
    doc.fontSize(12).text('Summary:', { underline: true });
    doc.moveDown(0.5);
    try {
      const summary = comments.length > 0 ? summarizeComments(comments) : "No comments available.";
      doc.fontSize(10).text(summary);
    } catch (error) {
      console.error('Error summarizing comments:', error);
      doc.fontSize(10).text("Error summarizing comments.");
    }
    doc.moveDown();

    // Sentiment
    doc.fontSize(12).text('Overall Sentiment:', { underline: true });
    doc.moveDown(0.5);
    try {
      const sentiment = comments.length > 0 ? analyzeSentiment(comments) : "Not applicable (no comments)";
      doc.fontSize(10).text(sentiment);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      doc.fontSize(10).text("Error analyzing sentiment.");
    }
    doc.moveDown();

    // Individual Comments
    doc.fontSize(12).text('Individual Comments:', { underline: true });
    doc.moveDown(0.5);
    if (comments.length > 0) {
      votes.forEach(vote => {
        if (vote.comment && vote.comment.trim() !== '') {
          const userName = vote.user?.name || 'Anonymous';
          const voterType = vote.voterType || 'N/A';
          doc.fontSize(10).text(`${userName} (${voterType}): ${vote.comment}`);
          doc.moveDown(0.5);
        }
      });
    } else {
      doc.fontSize(10).text("No comments available.");
    }

    // End the document
    doc.end();
  });
}

module.exports = generateReport;
