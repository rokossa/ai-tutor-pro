exports.generateExercise = async (req, res) => {
  try {
    const { subject } = req.body;
    let pool = [];

    // Smart Fallback Pool: This guarantees the frontend ALWAYS gets a perfectly formatted 
    // problem regardless of API keys or AI latency.
    if (subject === 'Algebra') {
      pool = [
        { problem_statement: "Expand the expression: $(x+3)(x-2)$", correct_answer_latex: "x^2+x-6", full_solution: "x^2 - 2x + 3x - 6 = x^2 + x - 6" },
        { problem_statement: "Expand the expression: $(2x+1)(x-4)$", correct_answer_latex: "2x^2-7x-4", full_solution: "2x^2 - 8x + x - 4 = 2x^2 - 7x - 4" }
      ];
    } else if (subject === 'Chemistry') {
      pool = [
        { problem_statement: "Using Boyle's Law ($P_1V_1 = P_2V_2$), if $P_1=2$ atm, $V_1=4$ L, and $P_2=4$ atm, what is $V_2$?", correct_answer_latex: "2", full_solution: "V_2 = (P_1 * V_1) / P_2 = (2 * 4) / 4 = 2" },
        { problem_statement: "Using Boyle's Law ($P_1V_1 = P_2V_2$), if $P_1=3$ atm, $V_1=6$ L, and $P_2=2$ atm, what is $V_2$?", correct_answer_latex: "9", full_solution: "V_2 = (P_1 * V_1) / P_2 = (3 * 6) / 2 = 9" }
      ];
    } else {
      // Default to Calculus
      pool = [
        { problem_statement: "Find the derivative of $f(x) = 3x^2 e^{-2x}$.", correct_answer_latex: "6xe^{-2x}-6x^2e^{-2x}", full_solution: "f'(x) = 6xe^{-2x} - 6x^2e^{-2x}" },
        { problem_statement: "Find the derivative of $f(x) = 4x^3 e^{-x}$.", correct_answer_latex: "12x^2e^{-x}-4x^3e^{-x}", full_solution: "f'(x) = 12x^2e^{-x} - 4x^3e^{-x}" }
      ];
    }

    // Pick a random problem from the selected subject
    const randomExercise = pool[Math.floor(Math.random() * pool.length)];

    res.json({ success: true, exercise: randomExercise });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
