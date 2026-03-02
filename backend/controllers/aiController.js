const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateProblem = async (req, res) => {
  try {
    const { subject, grade, topic, chapter } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // The refined prompt includes regional context (Ontario) and persona depth
    const prompt = `
      Persona: You are "The World's Most Patient AI Tutor" for a platform called Didakt.
      Target Student: Alexandre, a 13-year-old in Grade 8, living in Ontario, Canada.
      
      Task: Generate ONE specific exercise for the subject "${subject}" specifically for the chapter "${chapter}".
      
      Curriculum Context: Align the difficulty strictly with the Ontario Grade 8 curriculum standards.
      
      Requirements:
      1. Tone: Encouraging, clear, and age-appropriate.
      2. Difficulty: Moderate (ensure it challenges but doesn't discourage).
      3. Hint Strategy: Use a Socratic approach. Do NOT give the answer. Ask a leading question that helps the student realize the next step.
      
      Return the response in strictly valid JSON format:
      {
        "problem": "The text of the question (use LaTeX for math if needed)",
        "solution": "The final numerical or short-text answer",
        "initialHint": "An encouraging opening sentence followed by a Socratic question",
        "topicFocus": "The specific sub-skill being tested (e.g., 'Distributive Property')"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean potential markdown and parse
    const cleanedJson = text.replace(/```json|```/g, "").trim();
    res.json(JSON.parse(cleanedJson));
  } catch (error) {
    console.error("🔥 Gemini Refined Prompt Error:", error);
    res.status(500).json({ error: "AI failed to generate a localized problem." });
  }
};
