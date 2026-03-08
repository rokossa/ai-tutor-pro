const db = require('../db'); // Assuming a PostgreSQL connection

class KnowledgeGraphEngine {
  // Define a new skill in the graph
  static async createSkill(skillData) {
    const { skill_id, subject, domain, topic, name_en, name_fr, difficulty, grade, mastery_threshold } = skillData;
    const query = `
      INSERT INTO Skills (skill_id, subject, domain, topic, name_en, name_fr, difficulty, grade, mastery_threshold)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
    `;
    return db.query(query, [skill_id, subject, domain, topic, name_en, name_fr, difficulty, grade, mastery_threshold]);
  }

  // Create dependencies (e.g., PREREQUISITE_OF, UNLOCKS)
  static async createEdge(sourceSkill, targetSkill, relationType) {
    const query = `
      INSERT INTO SkillEdges (source_id, target_id, relation_type)
      VALUES ($1, $2, $3);
    `;
    return db.query(query, [sourceSkill, targetSkill, relationType]);
  }

  // The Recommendation Engine: Check if a student is ready
  static async checkReadiness(studentId, targetSkillId) {
    const prereqQuery = `
      SELECT source_id FROM SkillEdges 
      WHERE target_id = $1 AND relation_type = 'PREREQUISITE_OF';
    `;
    const prereqs = await db.query(prereqQuery, [targetSkillId]);

    const masteryQuery = `
      SELECT skill_id, mastery_score FROM StudentMastery 
      WHERE student_id = $1 AND skill_id = ANY($2);
    `;
    const prereqIds = prereqs.rows.map(r => r.source_id);
    const mastery = await db.query(masteryQuery, [studentId, prereqIds]);

    const missingPrereqs = prereqIds.filter(id => {
      const studentSkill = mastery.rows.find(m => m.skill_id === id);
      return !studentSkill || studentSkill.mastery_score < 0.8;
    });

    if (missingPrereqs.length > 0) {
      return { ready: false, missing: missingPrereqs, recommendation: "prerequisite_remediation" };
    }
    return { ready: true, recommendation: "challenge_exercise" };
  }
}

module.exports = KnowledgeGraphEngine;
