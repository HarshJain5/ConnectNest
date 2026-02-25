const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;

// 🔥 Colony Complaint Synonym Map
const synonymMap = {
  elevator: "lift",
  elevators: "lift",
  lifts: "lift",

  leakage: "leak",
  leaking: "leak",

  broken: "notworking",
  damaged: "notworking",
  damage: "notworking",

  lights: "light",
  electricity: "light",

  drainage: "drain",
  garbage: "trash",
  rubbish: "trash",
};

function normalizeText(text) {
  const tokens = tokenizer.tokenize(text.toLowerCase());

  return tokens
    .map(word => synonymMap[word] || word)
    .join(" ");
}

function calculateSimilarity(text1, text2) {
  const tfidf = new TfIdf();

  const normalized1 = normalizeText(text1);
  const normalized2 = normalizeText(text2);

  tfidf.addDocument(normalized1);
  tfidf.addDocument(normalized2);

  const terms = new Set([
    ...tfidf.listTerms(0).map(t => t.term),
    ...tfidf.listTerms(1).map(t => t.term)
  ]);

  const vector1 = [];
  const vector2 = [];

  terms.forEach(term => {
    vector1.push(tfidf.tfidf(term, 0));
    vector2.push(tfidf.tfidf(term, 1));
  });

  return cosineSimilarity(vector1, vector2);
}

function cosineSimilarity(vec1, vec2) {
  const dot = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));

  if (mag1 === 0 || mag2 === 0) return 0;

  return dot / (mag1 * mag2);
}

module.exports = calculateSimilarity;