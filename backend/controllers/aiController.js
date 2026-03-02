const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini with your API Key from Render Environment Variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateProblem = async (req, res) => {
  try {
    const { subject, grade, topic } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are the world's most patient AI Tutor. 
    Generate a ${subject} problem for a ${grade} student on the topic of ${topic}.
    Return the response in strictly valid JSON format:
    {
      "problem": "The text of the question",
      "solution": "The final numerical or short-text answer",
      "initialHint": "A soft, encouraging hint to get them started without giving the answer"
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean potential markdown code blocks from Gemini's response
    const cleanedJson = text.replace(/```json|```/g, "");
    res.json(JSON.parse(cleanedJson));
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate AI problem" });
  }
};
