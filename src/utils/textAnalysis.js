const natural = require('natural');
const { TfIdf, PorterStemmer, SentimentAnalyzer, WordTokenizer } = natural;

function summarizeComments(comments, numSentences = 3) {
  if (comments.length === 0) return "No comments available.";

  const tfidf = new TfIdf();
  const tokenizer = new WordTokenizer();
  const stemmer = PorterStemmer;

  // Add each comment to TF-IDF
  comments.forEach(comment => tfidf.addDocument(comment));

  // Get the most important words
  const importantWords = tfidf.listTerms(0 /*document index*/).slice(0, 10).map(item => item.term);

  // Score sentences based on important words
  const sentences = comments.flatMap(comment => comment.split(/[.!?]+/)).filter(s => s.trim().length > 0);
  const scoredSentences = sentences.map(sentence => {
    const words = tokenizer.tokenize(sentence.toLowerCase());
    const score = words.reduce((sum, word) => {
      return sum + (importantWords.includes(stemmer.stem(word)) ? 1 : 0);
    }, 0);
    return { sentence, score };
  });

  // Sort sentences by score and get top N
  const topSentences = scoredSentences
    .sort((a, b) => b.score - a.score)
    .slice(0, numSentences)
    .map(item => item.sentence);

  return topSentences.join('. ');
}

function analyzeSentiment(comments) {
  const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
  const tokenizer = new WordTokenizer();

  const scores = comments.map(comment => {
    const tokens = tokenizer.tokenize(comment);
    return analyzer.getSentiment(tokens);
  });

  const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

  if (averageScore > 0.05) return "Positive";
  if (averageScore < -0.05) return "Negative";
  return "Neutral";
}

module.exports = { summarizeComments, analyzeSentiment };