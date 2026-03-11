const Student = require('../models/Student');

// Initial seed data for a brand new student profile
const initialCurriculum = {
  'Mathematics': {
    domains: [
      { id: 'algebra', name: 'Algebra & Equations', progress: 0, recommended: true },
      { id: 'geometry', name: 'Geometry', progress: 0 },
      { id: 'data', name: 'Data Analysis', progress: 0 }
    ],
    skills: {
      'algebra': [
        { id: 'linear', name: 'Linear Equations', mastery: 0 },
        { id: 'deriv', name: 'Product Rule (Calculus)', mastery: 0 }
      ],
      'geometry': [
        { id: 'pythagoras', name: 'Pythagorean Theorem', mastery: 0 },
        { id: 'area', name: 'Area & Perimeter', mastery: 0 }
      ]
    }
  },
  'Sciences': {
    domains: [{ id: 'chem', name: 'Chemistry', progress: 0, recommended: true }],
    skills: { 'chem': [{ id: 'gas_laws', name: "Boyle's Law", mastery: 0 }] }
  },
  'Geography': {
    domains: [{ id: 'physical', name: 'Physical Geography', progress: 0, recommended: true }],
    skills: { 'physical': [{ id: 'tectonics', name: 'Plate Tectonics', mastery: 0 }] }
  }
};

const initialSubjects = [
  { id: 'math', name: 'Mathematics', iconName: 'Calculator', color: 'bg-indigo-600', progress: 0 },
  { id: 'science', name: 'Sciences', iconName: 'FlaskConical', color: 'bg-teal-500', progress: 0 },
  { id: 'geo', name: 'Geography', iconName: 'Globe', color: 'bg-blue-500', progress: 0 }
];

exports.getCurriculum = async (req, res) => {
  try {
    // 1. Look for David in the Database
    let student = await Student.findOne({ name: 'David' });

    // 2. If David doesn't exist, create him with 0% progress!
    if (!student) {
      student = new Student({
        name: 'David',
        grade: 'Grade 8',
        overallMastery: 0,
        subjects: initialSubjects,
        curriculum: initialCurriculum
      });
      await student.save();
    }

    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { subjectName, domainId, skillId } = req.body;
    
    let student = await Student.findOne({ name: 'David' });
    if (!student) return res.status(404).json({ success: false, error: "Student not found" });

    // --- PROGRESS RECALCULATION ENGINE ---
    
    // 1. Find the specific skill and increase it by 25% (so the user sees the ring move quickly!)
    let targetSkill = student.curriculum[subjectName].skills[domainId].find(s => s.id === skillId);
    if (targetSkill) {
      targetSkill.mastery = Math.min(100, targetSkill.mastery + 25);
    }

    // 2. Recalculate the Domain Average
    const allSkillsInDomain = student.curriculum[subjectName].skills[domainId];
    const domainAverage = allSkillsInDomain.reduce((sum, s) => sum + s.mastery, 0) / allSkillsInDomain.length;
    
    let targetDomain = student.curriculum[subjectName].domains.find(d => d.id === domainId);
    if (targetDomain) targetDomain.progress = Math.round(domainAverage);

    // 3. Recalculate the Subject Average
    const allDomainsInSubject = student.curriculum[subjectName].domains;
    const subjectAverage = allDomainsInSubject.reduce((sum, d) => sum + d.progress, 0) / allDomainsInSubject.length;
    
    let targetSubject = student.subjects.find(s => s.name === subjectName);
    if (targetSubject) targetSubject.progress = Math.round(subjectAverage);

    // 4. Recalculate Overall Mastery
    const overallAverage = student.subjects.reduce((sum, s) => sum + s.progress, 0) / student.subjects.length;
    student.overallMastery = Math.round(overallAverage);

    // Tell Mongoose we changed deep objects, then save to DB
    student.markModified('curriculum');
    student.markModified('subjects');
    await student.save();

    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
