const PDFDocument = require('pdfkit');
const { summarizeComments, analyzeSentiment } = require('./textAnalysis');

function generateReport(idea) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Title
    doc.fontSize(18).text('Idea Report', { align: 'center' });
    doc.moveDown();

    // Idea Details
    doc.fontSize(14).text('Idea Details', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Title: ${idea.title}`);
    doc.fontSize(10).text(`Description: ${idea.description}`);
    doc.text(`Target Audience: ${idea.targetAudience}`);
    doc.text(`Industry: ${idea.industry}`);
    doc.moveDown();

    // Voting Statistics
    doc.fontSize(14).text('Voting Statistics', { underline: true });
    doc.moveDown();
    
    const overallAverage = idea.votes.reduce((sum, vote) => sum + vote.score, 0) / idea.votes.length;
    doc.fontSize(12).text(`Overall Average Score: ${overallAverage.toFixed(2)}`);
    doc.moveDown();

    const voterTypes = ['General Enthusiast', 'Industry Expert', 'Experienced Entrepreneur', 'Potential Customer/User'];
    doc.fontSize(12).text('Average Score by Voter Type:');
    voterTypes.forEach(type => {
      const typeVotes = idea.votes.filter(vote => vote.voterType === type);
      const typeAverage = typeVotes.length > 0 ? typeVotes.reduce((sum, vote) => sum + vote.score, 0) / typeVotes.length : 0;
      doc.fontSize(10).text(`  ${type}: ${typeAverage.toFixed(2)}`);
    });
    doc.moveDown();

    doc.fontSize(12).text('Votes by Voter Type:');
    voterTypes.forEach(type => {
      const typeVotes = idea.votes.filter(vote => vote.voterType === type);
      doc.fontSize(10).text(`  ${type}: ${typeVotes.length}`);
    });
    doc.moveDown();

    // Comments analysis
    const comments = idea.votes.filter(vote => vote.comment && vote.comment.trim() !== '').map(vote => vote.comment);
    
    doc.fontSize(14).text('Comments Analysis', { underline: true });
    doc.moveDown();

    // Summary
    doc.fontSize(12).text('Summary:', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(10).text(comments.length > 0 ? summarizeComments(comments) : "No comments available.");
    doc.moveDown();

    // Sentiment
    doc.fontSize(12).text('Overall Sentiment:', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(10).text(comments.length > 0 ? analyzeSentiment(comments) : "Not applicable (no comments)");
    doc.moveDown();

    // Individual Comments
    doc.fontSize(12).text('Individual Comments:', { underline: true });
    doc.moveDown(0.5);
    if (comments.length > 0) {
      idea.votes.forEach(vote => {
        if (vote.comment && vote.comment.trim() !== '') {
          doc.fontSize(10).text(`${vote.user.name || 'Anonymous'} (${vote.voterType}): ${vote.comment}`);
          doc.moveDown(0.5);
        }
      });
    } else {
      doc.fontSize(10).text("No comments available.");
    }

    doc.end();
  });
}

module.exports = generateReport;