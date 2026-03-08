const db = require('../db');

exports.seedCalculusGraph = async (req, res) => {
  try {
    console.log("🌱 Starting Grade 12 Calculus Database Seed...");

    // 1. The Grade 12 Calculus Skills (Nodes)
    const skills = [
      { id: 'calc_alg_foundations', subj: 'Mathematics', dom: 'Calculus', top: 'Algebra Foundations', en: 'Algebra Foundations', fr: 'Fondements de l\'algèbre', diff: 1, grade: 12 },
      { id: 'calc_limits', subj: 'Mathematics', dom: 'Calculus', top: 'Limits', en: 'Limits', fr: 'Limites', diff: 2, grade: 12 },
      { id: 'calc_continuity', subj: 'Mathematics', dom: 'Calculus', top: 'Limits', en: 'Continuity', fr: 'Continuité', diff: 2, grade: 12 },
      { id: 'calc_deriv_def', subj: 'Mathematics', dom: 'Calculus', top: 'Derivatives', en: 'Derivative Definition', fr: 'Définition de la dérivée', diff: 3, grade: 12 },
      { id: 'calc_deriv_rules', subj: 'Mathematics', dom: 'Calculus', top: 'Derivatives', en: 'Derivative Rules (Power, Sum)', fr: 'Règles de dérivation', diff: 3, grade: 12 },
      { id: 'calc_product_rule', subj: 'Mathematics', dom: 'Calculus', top: 'Derivatives', en: 'Product Rule', fr: 'Règle du produit', diff: 4, grade: 12 },
      { id: 'calc_chain_rule', subj: 'Mathematics', dom: 'Calculus', top: 'Derivatives', en: 'Chain Rule', fr: 'Règle de la chaîne', diff: 4, grade: 12 },
      { id: 'calc_optimization', subj: 'Mathematics', dom: 'Calculus', top: 'Applications', en: 'Optimization', fr: 'Optimisation', diff: 5, grade: 12 }
    ];

    // Insert Skills using ON CONFLICT DO NOTHING so we can run this multiple times safely
    for (const skill of skills) {
      await db.query(`
        INSERT INTO Skills (skill_id, subject, domain, topic, name_en, name_fr, difficulty, grade)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (skill_id) DO NOTHING;
      `, [skill.id, skill.subj, skill.dom, skill.top, skill.en, skill.fr, skill.diff, skill.grade]);
    }

    // 2. The Dependency Relationships (Edges)
    const edges = [
      { src: 'calc_alg_foundations', tgt: 'calc_limits', type: 'PREREQUISITE_OF' },
      { src: 'calc_limits', tgt: 'calc_continuity', type: 'PREREQUISITE_OF' },
      { src: 'calc_continuity', tgt: 'calc_deriv_def', type: 'PREREQUISITE_OF' },
      { src: 'calc_deriv_def', tgt: 'calc_deriv_rules', type: 'PREREQUISITE_OF' },
      { src: 'calc_deriv_rules', tgt: 'calc_product_rule', type: 'PREREQUISITE_OF' },
      { src: 'calc_product_rule', tgt: 'calc_chain_rule', type: 'PREREQUISITE_OF' },
      { src: 'calc_chain_rule', tgt: 'calc_optimization', type: 'PREREQUISITE_OF' }
    ];

    // Insert Edges
    for (const edge of edges) {
      await db.query(`
        INSERT INTO SkillEdges (source_id, target_id, relation_type)
        VALUES ($1, $2, $3)
        ON CONFLICT (source_id, target_id, relation_type) DO NOTHING;
      `, [edge.src, edge.tgt, edge.type]);
    }

    res.json({ 
      success: true, 
      message: '✅ Grade 12 Calculus Knowledge Graph successfully seeded!',
      nodes_inserted: skills.length,
      edges_inserted: edges.length
    });

  } catch (error) {
    console.error('🔥 Seeding failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
