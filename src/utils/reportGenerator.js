const PDFDocument = require('pdfkit');
const { summarizeComments, analyzeSentiment } = require('./textAnalysis');

function generateReport(idea) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

    // Collect PDF data chunks
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Title
    doc
      .fillColor('#003366')
      .fontSize(24)
      .text('Idea Report', { align: 'center' })
      .moveDown(1.5);

    // Idea Details Section
    doc
      .fillColor('#000000')
      .fontSize(18)
      .text('Idea Details', { underline: true, align: 'left' })
      .moveDown(0.5);

    const title = idea.title || 'N/A';
    const description = idea.description || 'N/A';
    const industry = idea.industry || 'N/A';

    // Display Idea Details
    doc
      .fillColor('#003366')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Title: ', { continued: true })
      .fillColor('#000000')
      .font('Helvetica')
      .text(`${title}`)
      .moveDown(0.3);

    doc
      .fillColor('#003366')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Description: ', { continued: true })
      .fillColor('#000000')
      .font('Helvetica')
      .text(`${description}`)
      .moveDown(0.3);

    doc
      .fillColor('#003366')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Industry: ', { continued: true })
      .fillColor('#000000')
      .font('Helvetica')
      .text(`${industry}`)
      .moveDown(1);

    // Voting Statistics Section
    doc
      .fillColor('#003366')
      .fontSize(18)
      .text('Voting Statistics', { underline: true })
      .moveDown(0.5);

    const votes = Array.isArray(idea.votes) ? idea.votes : [];
    const overallAverage =
      votes.length > 0 ? votes.reduce((sum, vote) => sum + vote.score, 0) / votes.length : 0;

    doc
      .fillColor('#003366')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Overall Average Score: ', { continued: true })
      .fillColor('#000000')
      .font('Helvetica')
      .text(`${overallAverage.toFixed(2)}`)
      .moveDown(1);

    // Average Score and Votes by Voter Type (Table Format)
    const voterTypes = [
      'General Enthusiast',
      'Industry Expert',
      'Experienced Entrepreneur',
      'Potential Customer/User',
    ];

    const tableTop = doc.y;
    const startX = 50;
    const colWidths = [200, 100, 100]; // Column widths

    // Draw table headers
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .fillColor('#003366')
      .text('Voter Type', startX, tableTop)
      .text('Average Score', startX + colWidths[0], tableTop)
      .text('Votes', startX + colWidths[0] + colWidths[1], tableTop);

    doc.moveDown(0.5);
    doc.lineWidth(1).moveTo(startX, tableTop + 15).lineTo(startX + colWidths[0] + colWidths[1] + colWidths[2], tableTop + 15).stroke();

    let rowY = tableTop + 25;

    voterTypes.forEach((type) => {
      const typeVotes = votes.filter((vote) => vote.voterType === type);
      const typeAverage =
        typeVotes.length > 0
          ? typeVotes.reduce((sum, vote) => sum + vote.score, 0) / typeVotes.length
          : 0;
      const votesCount = typeVotes.length;

      // Draw row data
      doc
        .fontSize(12)
        .font('Helvetica')
        .fillColor('#000000')
        .text(type, startX, rowY)
        .text(typeAverage.toFixed(2), startX + colWidths[0], rowY)
        .text(votesCount, startX + colWidths[0] + colWidths[1], rowY);

      rowY += 20; // Adjust row height
    });

    // Explicitly move to the left margin and create space after the table
    doc.moveTo(startX, rowY + 30).moveDown(2);

    const comments = votes.filter((vote) => vote.comment && vote.comment.trim() !== '').map((vote) => vote.comment);

    // Define indentation for content under Comments Analysis
    const contentIndent = 50;

    // Summary
    doc
      .fillColor('#003366')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Summary:', contentIndent)
      .moveDown(0.5);

    try {
      const summary = comments.length > 0 ? summarizeComments(comments) : 'No comments available.';
      doc
        .fontSize(12)
        .fillColor('#666666')
        .text(summary, contentIndent);
    } catch (error) {
      console.error('Error summarizing comments:', error);
      doc
        .fontSize(12)
        .fillColor('#ff0000')
        .text('Error summarizing comments.', contentIndent);
    }
    doc.moveDown(1);

    // Overall Sentiment
    doc
      .fillColor('#003366')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Overall Sentiment:', contentIndent)
      .moveDown(0.5);

    try {
      const sentiment =
        comments.length > 0 ? analyzeSentiment(comments) : 'Not applicable (no comments)';
      doc
        .fontSize(12)
        .fillColor('#666666')
        .text(sentiment, contentIndent);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      doc
        .fontSize(12)
        .fillColor('#ff0000')
        .text('Error analyzing sentiment.', contentIndent);
    }
    doc.moveDown(1);

    // Individual Comments
    doc
      .fillColor('#003366')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Individual Comments:', contentIndent)
      .moveDown(0.5);

    if (comments.length > 0) {
      votes.forEach((vote) => {
        if (vote.comment && vote.comment.trim() !== '') {
          const userName = vote.user?.name || 'Anonymous';
          const voterType = vote.voterType || 'N/A';
          doc
            .fontSize(12)
            .fillColor('#003366')
            .font('Helvetica-Bold')
            .text(`${userName} (${voterType}): `, contentIndent, doc.y, { continued: true })
            .fillColor('#666666')
            .font('Helvetica')
            .text(`${vote.comment}`);
          doc.moveDown(0.5);
        }
      });
    } else {
      doc
        .fontSize(12)
        .fillColor('#666666')
        .text('No comments available.', contentIndent);
    }

    // End the document
    doc.end();
  });
}

module.exports = generateReport;
