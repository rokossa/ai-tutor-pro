-- ==========================================
-- AI Tutor Pro: Knowledge Graph Schema v2.0
-- ==========================================

-- Clean slate (Drop existing tables to prevent conflicts during init)
DROP TABLE IF EXISTS EvidenceEvents CASCADE;
DROP TABLE IF EXISTS StudentMastery CASCADE;
DROP TABLE IF EXISTS SkillEdges CASCADE;
DROP TABLE IF EXISTS Skills CASCADE;
DROP TABLE IF EXISTS Students CASCADE;

-- 1. Students Table (Base entity for foreign keys)
CREATE TABLE Students (
    student_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    grade INT NOT NULL,
    region VARCHAR(100) DEFAULT 'Ontario',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Skills Table (The Knowledge Graph Nodes)
-- Stores the normalized atomic learning skills from the curriculum
CREATE TABLE Skills (
    skill_id VARCHAR(255) PRIMARY KEY,
    subject VARCHAR(100) NOT NULL,
    domain VARCHAR(100) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_fr VARCHAR(255) NOT NULL,
    difficulty INT DEFAULT 1,
    grade INT NOT NULL,
    mastery_threshold DECIMAL(3,2) DEFAULT 0.80,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. SkillEdges Table (The Knowledge Graph Relationships)
-- Defines how skills connect (e.g., Limits -> PREREQUISITE_OF -> Continuity)
CREATE TABLE SkillEdges (
    source_id VARCHAR(255) REFERENCES Skills(skill_id) ON DELETE CASCADE,
    target_id VARCHAR(255) REFERENCES Skills(skill_id) ON DELETE CASCADE,
    relation_type VARCHAR(50) NOT NULL, -- e.g., 'PREREQUISITE_OF', 'MISCONCEPTION_OF'
    PRIMARY KEY (source_id, target_id, relation_type)
);

-- 4. StudentMastery Table (The Active Progress Profile)
-- Stores the dynamically calculated scores (0.0 to 1.0)
CREATE TABLE StudentMastery (
    student_id VARCHAR(255) REFERENCES Students(student_id) ON DELETE CASCADE,
    skill_id VARCHAR(255) REFERENCES Skills(skill_id) ON DELETE CASCADE,
    mastery_score DECIMAL(3,2) DEFAULT 0.00,
    attempts INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'unknown', -- 'unknown', 'in_progress', 'mastered'
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, skill_id)
);

-- 5. EvidenceEvents Table (The Raw Data Ledger)
-- Logs every single practice attempt to recalculate mastery accurately
CREATE TABLE EvidenceEvents (
    event_id SERIAL PRIMARY KEY,
    student_id VARCHAR(255) REFERENCES Students(student_id) ON DELETE CASCADE,
    skill_id VARCHAR(255) REFERENCES Skills(skill_id) ON DELETE CASCADE,
    result VARCHAR(50) NOT NULL, -- 'correct' or 'incorrect'
    hints_used INT DEFAULT 0,
    time_spent INT DEFAULT 0, -- Time in seconds
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Grade 12 Calculus Seed Data for Testing
INSERT INTO Skills (skill_id, subject, domain, topic, name_en, name_fr, grade) VALUES
('calc_limits', 'Mathematics', 'Calculus', 'Limits', 'Limits of Rational Functions', 'Limites', 12),
('calc_continuity', 'Mathematics', 'Calculus', 'Limits', 'Continuity', 'Continuité', 12),
('calc_product_rule', 'Mathematics', 'Calculus', 'Derivatives', 'Product Rule', 'Règle du produit', 12);

INSERT INTO SkillEdges (source_id, target_id, relation_type) VALUES
('calc_limits', 'calc_continuity', 'PREREQUISITE_OF'),
('calc_continuity', 'calc_product_rule', 'PREREQUISITE_OF');

