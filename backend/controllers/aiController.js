const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.gradeAnswer = async (req, res) => {
  try {
    const { question, answer, correctAnswer } = req.body;

    // Check if the key exists
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'mock_key') {
      console.error("❌ CRITICAL: GEMINI_API_KEY is missing from environment variables!");
      return res.status(500).json({
        isCorrect: false,
        feedback: "Whoops! My API key is missing. Please add GEMINI_API_KEY to the Render backend environment variables."
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // We force the model to ONLY output pure, parsable JSON
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `You are an empathetic, encouraging tutor helping a 13-year-old Grade 8 student who sometimes finds academics challenging. Use basketball analogies when helpful.

    Question: ${question}
    Student's Answer: ${answer}
    Target/Correct Answer: ${correctAnswer}

    Evaluate the student's answer. 
    - If correct: Congratulate them warmly!
    - If incorrect: Gently guide them toward the right step using an encouraging tone.

    Respond ONLY using this JSON schema:
    {"isCorrect": boolean, "feedback": "string"}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Because we used responseMimeType, we know this is safe to parse
    const parsedResponse = JSON.parse(responseText);

    res.status(200).json(parsedResponse);
  } catch (error) {
    console.error("🔥 Gemini API Error:", error.message);
    res.status(500).json({ 
      isCorrect: false, 
      feedback: "Looks like my brain is updating! Check the backend Render logs to see what caused the crash." 
    });
  }
};
