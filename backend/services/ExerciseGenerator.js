const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini (Ensure you have GEMINI_API_KEY in your .env file)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class ExerciseGenerator {
  /**
   * Generates a dynamic exercise based on the Knowledge Graph parameters.
   */
  static async generateExercise(params) {
    const { 
      skill_id, 
      topic_name, 
      difficulty, 
      language, 
      misconception_history 
    } = params;

    // Use Gemini 3.1 Pro (or Flash for speed during practice)
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash" });

    // The System Prompt: Forces strict JSON and Socratic methodology
    const systemInstruction = `
      You are an expert Grade 12 tutor building adaptive exercises for a Knowledge Graph platform.
      Your goal is to generate a single math problem based on the provided parameters.
      
      RULES:
      1. Use Socratic methodology: Provide 3 progressive hints that guide the student to the answer without giving it away immediately.
      2. Format all math equations using strict LaTeX. Use $ for inline math and $$ for display math. Do NOT put spaces between the $ and the math.
      3. The response MUST be a valid JSON object. Do not include markdown code blocks (like \`\`\`json) in the final output, just the raw JSON string.
      
      JSON SCHEMA:
      {
        "problem_statement": "The question text with LaTeX",
        "correct_answer_latex": "The exact simplified mathematical answer in LaTeX for our parser",
        "hints": [
          "Hint 1: Conceptual nudge",
          "Hint 2: Identify the pieces",
          "Hint 3: Almost there, apply the rule"
        ],
        "full_solution": "Step-by-step breakdown shown only after mastery or failure"
      }
    `;

    // The User Prompt: Injects the specific student context
    const userPrompt = `
      Generate a ${difficulty} difficulty exercise for the skill: ${topic_name} (${skill_id}).
      Language: ${language}.
      Student Misconception History: ${misconception_history ? misconception_history : "None. Standard progression."}.
      
      Specifics for this skill: The student must apply the product rule $\\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$.
      If their misconception history shows they struggle with negative exponents, include a negative exponent in $f(x)$ or $g(x)$.
    `;

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        systemInstruction: { role: "system", parts: [{ text: systemInstruction }] },
        generationConfig: {
            temperature: 0.7, // Slight creativity for varied problems
            responseMimeType: "application/json", // Forces Gemini to output parseable JSON
        }
      });

      const responseText = result.response.text();
      return JSON.parse(responseText);

    } catch (error) {
      console.error("🔥 Error generating adaptive exercise:", error);
      throw new Error("Failed to generate exercise from Gemini.");
    }
  }
}

module.exports = ExerciseGenerator;
