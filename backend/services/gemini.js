const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

const questionSchema = {
  type: SchemaType.OBJECT,
  properties: {
    exerciseType: { type: SchemaType.STRING },
    questionText: { type: SchemaType.STRING },
    context: { type: SchemaType.STRING }
  },
  required: ["exerciseType", "questionText"]
};

const gradingSchema = {
  type: SchemaType.OBJECT,
  properties: {
    isCorrect: { type: SchemaType.BOOLEAN },
    score: { type: SchemaType.INTEGER },
    feedbackEn: { type: SchemaType.STRING },
    feedbackFr: { type: SchemaType.STRING }
  },
  required: ["isCorrect", "score", "feedbackEn", "feedbackFr"]
};

module.exports = { model, questionSchema, gradingSchema };
