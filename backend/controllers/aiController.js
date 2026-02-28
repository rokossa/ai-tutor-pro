const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini SDK. Ensure GEMINI_API_KEY is in your Render Environment Variables.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock_key');

exports.generateCustomExercise = async (req, res) => {
  try {
    const { prompt, studentName, grade } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      console.warn("No GEMINI_API_KEY found. Returning mock data for UI testing.");
      return res.status(200).json({
        success: true,
        exercises: [
          { question: `${studentName} scores 3 three-pointers and 4 free throws (worth 1 point each). How many points did they score in total?`, answer: "13 points" },
          { question: `If ${studentName}'s team scores 85 points and the opponent scores 72, what is the point differential?`, answer: "13 points" }
        ]
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // We strictly enforce JSON output so the React frontend can easily render the cards
    const systemInstruction = `
      You are an expert ${grade} curriculum designer. 
      Generate exactly 3 custom practice exercises based on this request: "${prompt}".
      The student's name is ${studentName}. Incorporate their name and interests.
      
      Return EXACTLY a valid JSON array of objects, with no markdown formatting or backticks.
      Format: [{"question": "The scenario...", "answer": "The solution..."}]
    `;

    const result = await model.generateContent(systemInstruction);
    const responseText = result.response.text();
    
    // Clean the output just in case the model adds markdown backticks
    const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const exercises = JSON.parse(cleanedJson);

    res.status(200).json({ success: true, exercises });

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({ error: "Failed to generate custom exercises." });
  }
};
