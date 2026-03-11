const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.generateExercise = async (req, res) => {
  try {
    const { subject, topic } = req.body;
    
    // Safety check for API key
    if (!process.env.GEMINI_API_KEY) {
       throw new Error("GEMINI_API_KEY is missing in Render environment variables.");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 💡 THE PROMPT: Forcing Gemini to act as the tutor and return strict JSON
    const prompt = `You are an expert AI tutor for Grade 8 students. 
    Generate a unique practice problem for the subject "${subject}" and topic "${topic}".
    Return ONLY a valid, raw JSON object. Do not include markdown formatting, backticks, or extra text.
    The JSON must have these exact keys:
    "problem_statement": "The question text, using LaTeX for math enclosed in $",
    "correct_answer_latex": "The exact mathematical answer in clean LaTeX (no spaces, no equations like x=, just the value)",
    "full_solution": "A brief step-by-step explanation using LaTeX enclosed in $"`;

    console.log(`🧠 Asking Gemini to generate a ${subject} - ${topic} problem...`);
    
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    
    // Clean up markdown if Gemini accidentally includes it
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const exercise = JSON.parse(text);

    res.json({ success: true, exercise });
  } catch (error) {
    console.error("🔥 Gemini Error:", error.message);
    res.status(500).json({ success: false, error: "Failed to connect to Gemini AI." });
  }
};
