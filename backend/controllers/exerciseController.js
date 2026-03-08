const ExerciseGenerator = require('../services/ExerciseGenerator');

exports.getAdaptiveProblem = async (req, res) => {
  try {
    // In production, these params come from the Knowledge Graph & Student Profile
    const params = {
      skill_id: "calc_product_rule",
      topic_name: "Derivative Product Rule",
      difficulty: req.body.difficulty || "Medium",
      language: req.body.language || "English",
      misconception_history: req.body.misconception || "Forgets to apply the chain rule to the inner function of g(x)"
    };

    const exerciseData = await ExerciseGenerator.generateExercise(params);
    
    res.json({
      success: true,
      data: exerciseData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
