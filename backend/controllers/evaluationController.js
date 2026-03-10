const SympyService = require('../services/SympyService');
const MasteryEngine = require('../services/MasteryEngine');

exports.checkAnswer = async (req, res) => {
  try {
    const { student_id, skill_id, student_answer, correct_answer, hints_used, time_spent } = req.body;
    
    const evaluation = await SympyService.evaluateMath(student_answer, correct_answer);
    
    // If the engine crashed entirely, send the error directly to the UI
    if (!evaluation.success) {
        return res.json({ 
            success: false, 
            is_correct: false, 
            error: evaluation.error || "Unknown Python Engine Failure" 
        });
    }

    if (evaluation.is_equivalent && student_id && skill_id) {
      const updatedMastery = await MasteryEngine.processExerciseResult(
        student_id, skill_id, true, hints_used || 0, time_spent || 0
      );
      return res.json({ success: true, is_correct: true, new_mastery: updatedMastery });
    } 

    res.json({ 
        success: true, 
        is_correct: evaluation.is_equivalent, 
        debug: evaluation.debug_clean_latex 
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
