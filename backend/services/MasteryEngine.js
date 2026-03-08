const db = require('../db'); 

class MasteryEngine {
  /**
   * Processes an evidence event and recalculates the student's mastery score.
   */
  static async processExerciseResult(studentId, skillId, isCorrect, hintsUsed, timeSpent) {
    try {
      // 1. Record the Evidence Event
      await db.query(
        `INSERT INTO EvidenceEvents (student_id, skill_id, result, hints_used, time_spent)
         VALUES ($1, $2, $3, $4, $5)`,
        [studentId, skillId, isCorrect ? 'correct' : 'incorrect', hintsUsed, timeSpent]
      );

      // 2. Fetch current mastery profile
      const profile = await db.query(
        `SELECT mastery_score, attempts FROM StudentMastery WHERE student_id = $1 AND skill_id = $2`,
        [studentId, skillId]
      );

      let currentScore = 0.0;
      let attempts = 0;

      if (profile.rows.length > 0) {
        currentScore = parseFloat(profile.rows[0].mastery_score);
        attempts = parseInt(profile.rows[0].attempts);
      }

      // 3. Calculate New Score based on performance and hint penalties
      let newScore = currentScore;
      
      if (isCorrect) {
        // Base increment of 0.15, penalized by 0.05 for every hint used
        const increment = Math.max(0.02, 0.15 - (hintsUsed * 0.05));
        newScore = Math.min(1.0, currentScore + increment);
      } else {
        // Minor penalty for incorrect answers to prevent guessing
        newScore = Math.max(0.0, currentScore - 0.05);
      }

      attempts += 1;

      // 4. Determine Status based on PRD thresholds
      let status = 'unknown';
      if (newScore >= 0.8) status = 'mastered';
      else if (newScore > 0.0) status = 'in_progress';

      // 5. Upsert the StudentMastery record
      const upsertQuery = `
        INSERT INTO StudentMastery (student_id, skill_id, mastery_score, attempts, status)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (student_id, skill_id) 
        DO UPDATE SET 
          mastery_score = EXCLUDED.mastery_score,
          attempts = EXCLUDED.attempts,
          status = EXCLUDED.status,
          updated_at = CURRENT_TIMESTAMP
        RETURNING *;
      `;

      const updatedMastery = await db.query(upsertQuery, [studentId, skillId, newScore.toFixed(2), attempts, status]);
      
      return updatedMastery.rows[0];

    } catch (error) {
      console.error("🔥 Error updating mastery score:", error);
      throw new Error("Failed to process mastery update.");
    }
  }
}

module.exports = MasteryEngine;
