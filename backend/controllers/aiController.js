const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateProblem = async (req, res) => {
  try {
    const { subject, grade, topic, chapter, region } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // The AI now adapts to the specific educational standards of the region
    const prompt = `
      Persona: World's Most Patient AI Tutor for Didakt.
      Target: Student in ${grade} living in ${region.state}, ${region.country}.
      
      Task: Generate ONE specific ${subject} exercise for the chapter "${chapter}".
      
      Standards Alignment: 
      - If Canada: Align with ${region.state} Ministry of Education curriculum.
      - If USA: Align with ${region.state} state standards (e.g., Common Core or state-specific TEKS/BEST).
      
      Response Format (Strict JSON):
      {
        "problem": "Question text (Grade ${grade} appropriate)",
        "solution": "Final answer",
        "initialHint": "Socratic hint (No answers given)",
        "curriculumRef": "The specific standard code this fulfills (e.g. CCSS.Math.Content.8.EE.C.7)"
      }
    `;

    const result = await model.generateContent(prompt);
    const text = (await result.response).text().replace(/`json|`/g, "").trim();
    res.json(JSON.parse(text));
  } catch (error) {
    console.error("🔥 Regional AI Error:", error);
    res.status(500).json({ error: "AI failed to align with regional standards." });
  }
};
