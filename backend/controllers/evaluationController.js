const SympyService = require('../services/SympyService');
const MasteryEngine = require('../services/MasteryEngine');

exports.checkAnswer = async (req, res) => {
  try {
    const { student_id, skill_id, student_answer, correct_answer, hints_used, time_spent } = req.body;
    
    // Pass the raw LaTeX to our SymPy engine
    const evaluation = await SympyService.evaluateMath(student_answer, correct_answer);
    
    if (evaluation.success) {
      // Trigger the Mastery Engine to update the database
      const updatedMastery = await MasteryEngine.processExerciseResult(
        student_id, 
        skill_id, 
        evaluation.is_equivalent, 
        hints_used || 0,
        time_spent || 0
      );

      res.json({ 
        success: true, 
        is_correct: evaluation.is_equivalent,
        new_mastery: updatedMastery
      });
    } else {
      res.json({ success: false, is_correct: false, message: "Invalid mathematical syntax." });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
