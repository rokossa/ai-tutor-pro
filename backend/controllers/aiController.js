const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock_key');

exports.gradeAnswer = async (req, res) => {
  try {
    const { question, answer, correctAnswer } = req.body;

    // We use the fast and efficient Gemini 1.5 Flash model for real-time tutoring
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // The Secret Sauce: The System Prompt
    const prompt = `You are an empathetic, encouraging tutor helping a 13-year-old Grade 8 student who sometimes finds academics challenging. You love using basketball analogies to make math concepts intuitive and fun.

    Question: ${question}
    Student's Answer: ${answer}
    Target/Correct Answer: ${correctAnswer}

    Evaluate the student's answer. 
    - If they are correct: Congratulate them warmly!
    - If they are incorrect: Gently guide them toward the right step. Do NOT just say "wrong". Help them see the next move, perhaps using a quick basketball analogy (like missing a free throw but adjusting the stance).

    Respond ONLY with a valid JSON object in this exact format, with no markdown formatting or backticks:
    {
      "isCorrect": true or false,
      "feedback": "Your encouraging message here"
    }`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim().replace(/```json/g, '').replace(/```/g, '');
    
    const parsedResponse = JSON.parse(responseText);

    res.status(200).json(parsedResponse);
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      isCorrect: false, 
      feedback: "Looks like my brain is updating! Let's try submitting that answer one more time." 
    });
  }
};
